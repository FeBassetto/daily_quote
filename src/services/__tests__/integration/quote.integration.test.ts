import { authAPI } from "../../auth";
import { quoteAPI } from "../../quote";

jest.unmock("../../axios");

describe("Quote Service Integration Tests", () => {
  let authToken: string;

  beforeAll(async () => {
    const response = await authAPI.login({
      username: "joaquim",
      password: "salame1",
    });
    authToken = response.token;
  }, 15000);

  describe("quoteAPI.getDailyQuote", () => {
    it("should fetch quote with valid token", async () => {
      const quote = await quoteAPI.getDailyQuote(authToken);

      expect(quote).toBeDefined();
      expect(typeof quote).toBe("string");
      expect(quote.length).toBeGreaterThan(0);
    }, 20000);

    it("should return different quotes or same quote consistently", async () => {
      const quote1 = await quoteAPI.getDailyQuote(authToken);
      const quote2 = await quoteAPI.getDailyQuote(authToken);

      expect(quote1).toBeDefined();
      expect(quote2).toBeDefined();
      expect(typeof quote1).toBe("string");
      expect(typeof quote2).toBe("string");
    }, 20000);

    it("should fail with invalid token", async () => {
      const invalidToken = "invalid-token-123";

      await expect(quoteAPI.getDailyQuote(invalidToken)).rejects.toThrow();
    }, 20000);

    it("should fail with empty token", async () => {
      await expect(quoteAPI.getDailyQuote("")).rejects.toThrow();
    }, 20000);

    it("should handle multiple consecutive requests", async () => {
      const requests = [
        quoteAPI.getDailyQuote(authToken),
        quoteAPI.getDailyQuote(authToken),
        quoteAPI.getDailyQuote(authToken),
      ];

      const quotes = await Promise.all(requests);

      expect(quotes).toHaveLength(3);
      quotes.forEach((quote) => {
        expect(quote).toBeDefined();
        expect(typeof quote).toBe("string");
      });
    }, 30000);
  });
});
