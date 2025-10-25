import { authAPI } from "../../auth";

jest.unmock("../../axios");

describe("Auth Service Integration Tests", () => {
  const testCredentials = {
    username: "joaquim",
    password: "salame1",
  };

  const invalidCredentials = {
    username: "invalid",
    password: "wrongpass",
  };

  describe("authAPI.login", () => {
    it("should successfully login with valid credentials", async () => {
      const response = await authAPI.login(testCredentials);

      expect(response).toBeDefined();
      expect(response.token).toBeDefined();
      expect(typeof response.token).toBe("string");
      expect(response.token.length).toBeGreaterThan(0);
    }, 15000);

    it("should return a valid token format", async () => {
      const response = await authAPI.login(testCredentials);

      expect(response.token).toMatch(/^[A-Za-z0-9-_]+$/);
    }, 15000);

    it("should return error message with invalid credentials", async () => {
      const response = await authAPI.login(invalidCredentials);

      expect(response).toBeDefined();
      expect(response).toHaveProperty("return");
      expect(response.return).toContain("inválidos");
    }, 15000);

    it("should return error message with empty username", async () => {
      const invalidData = {
        username: "",
        password: "salame1",
      };

      const response = await authAPI.login(invalidData);

      expect(response).toBeDefined();
      expect(response).toHaveProperty("return");
    }, 15000);

    it("should return error message with empty password", async () => {
      const invalidData = {
        username: "joaquim",
        password: "",
      };

      const response = await authAPI.login(invalidData);

      expect(response).toBeDefined();
      expect(response).toHaveProperty("return");
    }, 15000);
  });
});
