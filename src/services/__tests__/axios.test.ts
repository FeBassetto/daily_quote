import { showErrorToast } from "@utils/errorHandler";
import type { AxiosInstance } from "axios";
import axios from "axios";
import * as Keychain from "react-native-keychain";

jest.mock("axios");
jest.mock("react-native-keychain");
jest.mock("@utils/errorHandler");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Axios Configuration", () => {
  let responseInterceptor: [(response: unknown) => unknown, (error: unknown) => Promise<unknown>];

  beforeEach(() => {
    jest.clearAllMocks();

    const mockUse = jest.fn();
    const mockInstance = {
      interceptors: {
        response: {
          use: mockUse,
        },
      },
    };

    mockedAxios.create = jest.fn(() => mockInstance as unknown as AxiosInstance);

    jest.isolateModules(() => {
      require("../axios");
    });

    responseInterceptor = mockUse.mock.calls[0] as [
      (response: unknown) => unknown,
      (error: unknown) => Promise<unknown>,
    ];
  });

  describe("API instance creation", () => {
    it("should create axios instance with correct base URL", () => {
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: "https://n8n.jrmendonca.com.br/webhook",
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

    it("should set correct content type header", () => {
      const createCall = mockedAxios.create.mock.calls[0]?.[0];
      if (createCall?.headers && typeof createCall.headers === "object") {
        expect((createCall.headers as Record<string, string>)["Content-Type"]).toBe(
          "application/json",
        );
      }
    });
  });

  describe("Response interceptor", () => {
    it("should pass through successful responses", () => {
      const successHandler = responseInterceptor[0];
      const mockResponse = { data: { test: "data" }, status: 200 };

      const result = successHandler(mockResponse);

      expect(result).toBe(mockResponse);
    });

    it("should handle 403 errors and clear token", async () => {
      const errorHandler = responseInterceptor[1];
      const error = {
        response: {
          status: 403,
        },
      };

      await expect(errorHandler(error)).rejects.toEqual(error);

      expect(showErrorToast).toHaveBeenCalledWith(
        "Sua sessão foi encerrada. Por favor, faça login novamente.",
        "Sessão expirada",
      );

      expect(Keychain.resetGenericPassword).toHaveBeenCalledWith({
        service: "auth_token",
      });
    });

    it("should not clear token for non-403 errors", async () => {
      const errorHandler = responseInterceptor[1];
      const error = {
        response: {
          status: 500,
        },
      };

      await expect(errorHandler(error)).rejects.toEqual(error);

      expect(showErrorToast).not.toHaveBeenCalled();
      expect(Keychain.resetGenericPassword).not.toHaveBeenCalled();
    });

    it("should handle errors without response object", async () => {
      const errorHandler = responseInterceptor[1];
      const error = new Error("Network Error");

      await expect(errorHandler(error)).rejects.toEqual(error);

      expect(showErrorToast).not.toHaveBeenCalled();
      expect(Keychain.resetGenericPassword).not.toHaveBeenCalled();
    });

    it("should handle 404 errors without clearing token", async () => {
      const errorHandler = responseInterceptor[1];
      const error = {
        response: {
          status: 404,
        },
      };

      await expect(errorHandler(error)).rejects.toEqual(error);

      expect(Keychain.resetGenericPassword).not.toHaveBeenCalled();
    });

    it("should handle 401 errors without clearing token", async () => {
      const errorHandler = responseInterceptor[1];
      const error = {
        response: {
          status: 401,
        },
      };

      await expect(errorHandler(error)).rejects.toEqual(error);

      expect(Keychain.resetGenericPassword).not.toHaveBeenCalled();
    });
  });
});
