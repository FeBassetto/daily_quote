import { authAPI } from "../../auth";
import { quoteAPI } from "../../quote";

jest.unmock("../../axios");

describe("Complete User Flow Integration Tests", () => {
  const validCredentials = {
    username: "joaquim",
    password: "salame1",
  };

  describe("Full authentication and quote retrieval flow", () => {
    it("should complete full user flow: login -> get quote -> get multiple quotes", async () => {
      const loginResponse = await authAPI.login(validCredentials);

      expect(loginResponse).toBeDefined();
      expect(loginResponse.token).toBeDefined();
      expect(typeof loginResponse.token).toBe("string");

      const token = loginResponse.token;

      const firstQuote = await quoteAPI.getDailyQuote(token);

      expect(firstQuote).toBeDefined();
      expect(typeof firstQuote).toBe("string");
      expect(firstQuote.length).toBeGreaterThan(0);

      const secondQuote = await quoteAPI.getDailyQuote(token);

      expect(secondQuote).toBeDefined();
      expect(typeof secondQuote).toBe("string");

      const thirdQuote = await quoteAPI.getDailyQuote(token);

      expect(thirdQuote).toBeDefined();
      expect(typeof thirdQuote).toBe("string");
    }, 30000);

    it("should handle rapid successive quote requests after login", async () => {
      const loginResponse = await authAPI.login(validCredentials);
      const token = loginResponse.token;

      const quotes = await Promise.all([
        quoteAPI.getDailyQuote(token),
        quoteAPI.getDailyQuote(token),
        quoteAPI.getDailyQuote(token),
        quoteAPI.getDailyQuote(token),
        quoteAPI.getDailyQuote(token),
      ]);

      expect(quotes).toHaveLength(5);
      quotes.forEach((quote) => {
        expect(quote).toBeDefined();
        expect(typeof quote).toBe("string");
        expect(quote.length).toBeGreaterThan(0);
      });
    }, 40000);

    it("should fail to get quote without authentication", async () => {
      const fakeToken = "fake-token-12345";

      await expect(quoteAPI.getDailyQuote(fakeToken)).rejects.toThrow();
    }, 15000);

    it("should work with fresh login for each quote request", async () => {
      const login1 = await authAPI.login(validCredentials);
      const quote1 = await quoteAPI.getDailyQuote(login1.token);
      expect(quote1).toBeDefined();

      const login2 = await authAPI.login(validCredentials);
      const quote2 = await quoteAPI.getDailyQuote(login2.token);
      expect(quote2).toBeDefined();

      const login3 = await authAPI.login(validCredentials);
      const quote3 = await quoteAPI.getDailyQuote(login3.token);
      expect(quote3).toBeDefined();
    }, 45000);

    it("should handle quote retrieval with timeout", async () => {
      const loginResponse = await authAPI.login(validCredentials);
      const token = loginResponse.token;

      const startTime = Date.now();
      const quote = await quoteAPI.getDailyQuote(token);
      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(quote).toBeDefined();
      expect(duration).toBeLessThan(15000);
    }, 20000);
  });

  describe("Error scenarios", () => {
    it("should return error message for invalid credentials", async () => {
      const invalidCredentials = {
        username: "nonexistent",
        password: "wrongpass",
      };

      const response = await authAPI.login(invalidCredentials);

      expect(response).toBeDefined();
      expect(response).toHaveProperty("return");
    }, 15000);

    it("should fail quote request with malformed token", async () => {
      const malformedTokens = ["", "   ", "null", "undefined", "12345"];

      for (const token of malformedTokens) {
        await expect(quoteAPI.getDailyQuote(token)).rejects.toBeDefined();
      }
    }, 30000);
  });
});
