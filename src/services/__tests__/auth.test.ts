import { authAPI } from "../auth";
import { api } from "../axios";

jest.mock("../axios", () => ({
  api: {
    post: jest.fn(),
  },
}));

describe("Auth Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("authAPI.login", () => {
    it("should call API with correct endpoint and credentials", async () => {
      const credentials = {
        username: "testuser",
        password: "password123",
      };
      const mockResponse = { token: "mock-token-123" };

      (api.post as jest.Mock).mockResolvedValue({ data: mockResponse });

      const result = await authAPI.login(credentials);

      expect(api.post).toHaveBeenCalledWith("/testeReact/autenticar", credentials);
      expect(result).toEqual(mockResponse);
    });

    it("should return token from successful login", async () => {
      const credentials = {
        username: "user",
        password: "pass123",
      };
      const expectedToken = "abc123xyz";

      (api.post as jest.Mock).mockResolvedValue({
        data: { token: expectedToken },
      });

      const result = await authAPI.login(credentials);

      expect(result.token).toBe(expectedToken);
    });

    it("should propagate API errors", async () => {
      const credentials = {
        username: "testuser",
        password: "wrongpass",
      };
      const error = new Error("Invalid credentials");

      (api.post as jest.Mock).mockRejectedValue(error);

      await expect(authAPI.login(credentials)).rejects.toThrow("Invalid credentials");
    });

    it("should handle network errors", async () => {
      const credentials = {
        username: "testuser",
        password: "password123",
      };
      const networkError = new Error("Network Error");

      (api.post as jest.Mock).mockRejectedValue(networkError);

      await expect(authAPI.login(credentials)).rejects.toThrow("Network Error");
    });

    it("should handle empty response data", async () => {
      const credentials = {
        username: "testuser",
        password: "password123",
      };

      (api.post as jest.Mock).mockResolvedValue({ data: {} });

      const result = await authAPI.login(credentials);

      expect(result).toEqual({});
    });
  });
});
