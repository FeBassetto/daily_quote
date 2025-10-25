import { api } from "../axios";
import { quoteAPI } from "../quote";

jest.mock("../axios", () => ({
  api: {
    get: jest.fn(),
  },
}));

describe("Quote Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("quoteAPI.getDailyQuote", () => {
    it("should call API with correct endpoint, headers and timeout", async () => {
      const token = "test-token-123";
      const mockResponse = [{ quoteoftheday: "Test quote" }];

      (api.get as jest.Mock).mockResolvedValue({ data: mockResponse });

      await quoteAPI.getDailyQuote(token);

      expect(api.get).toHaveBeenCalledWith("/18a8a172-0c9e-4dc3-9cf0-fe2c389e27eb/frasedodia", {
        headers: {
          token: token,
        },
        timeout: 15000,
      });
    });

    it("should return quote text from first array element", async () => {
      const token = "test-token";
      const expectedQuote = "This is a daily quote";
      const mockResponse = [{ quoteoftheday: expectedQuote }];

      (api.get as jest.Mock).mockResolvedValue({ data: mockResponse });

      const result = await quoteAPI.getDailyQuote(token);

      expect(result).toBe(expectedQuote);
    });

    it("should handle multiple quotes in response array", async () => {
      const token = "test-token";
      const firstQuote = "First quote";
      const mockResponse = [{ quoteoftheday: firstQuote }, { quoteoftheday: "Second quote" }];

      (api.get as jest.Mock).mockResolvedValue({ data: mockResponse });

      const result = await quoteAPI.getDailyQuote(token);

      expect(result).toBe(firstQuote);
    });

    it("should propagate API errors", async () => {
      const token = "test-token";
      const error = new Error("Failed to fetch quote");

      (api.get as jest.Mock).mockRejectedValue(error);

      await expect(quoteAPI.getDailyQuote(token)).rejects.toThrow("Failed to fetch quote");
    });

    it("should handle timeout errors", async () => {
      const token = "test-token";
      const timeoutError = new Error("timeout of 15000ms exceeded");

      (api.get as jest.Mock).mockRejectedValue(timeoutError);

      await expect(quoteAPI.getDailyQuote(token)).rejects.toThrow("timeout");
    });

    it("should handle unauthorized errors", async () => {
      const token = "invalid-token";
      const error = {
        response: {
          status: 401,
          data: { message: "Unauthorized" },
        },
      };

      (api.get as jest.Mock).mockRejectedValue(error);

      await expect(quoteAPI.getDailyQuote(token)).rejects.toMatchObject(error);
    });

    it("should use different tokens in headers", async () => {
      const token1 = "token-one";
      const token2 = "token-two";

      (api.get as jest.Mock).mockResolvedValue({
        data: [{ quoteoftheday: "Quote" }],
      });

      await quoteAPI.getDailyQuote(token1);
      await quoteAPI.getDailyQuote(token2);

      expect(api.get).toHaveBeenNthCalledWith(
        1,
        expect.any(String),
        expect.objectContaining({
          headers: { token: token1 },
        }),
      );

      expect(api.get).toHaveBeenNthCalledWith(
        2,
        expect.any(String),
        expect.objectContaining({
          headers: { token: token2 },
        }),
      );
    });
  });
});
