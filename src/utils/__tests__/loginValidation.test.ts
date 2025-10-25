import { loginSchema } from "../loginValidation";

describe("Login Validation", () => {
  describe("loginSchema", () => {
    it("should validate correct login data", () => {
      const validData = {
        username: "testuser",
        password: "password123",
      };

      const result = loginSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it("should trim username whitespace", () => {
      const dataWithSpaces = {
        username: "  testuser  ",
        password: "password123",
      };

      const result = loginSchema.safeParse(dataWithSpaces);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.username).toBe("testuser");
      }
    });

    it("should reject empty username", () => {
      const invalidData = {
        username: "",
        password: "password123",
      };

      const result = loginSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        const usernameError = result.error.issues.find((issue) => issue.path[0] === "username");
        expect(usernameError?.message).toBe("Usuário é obrigatório");
      }
    });

    it("should reject empty password", () => {
      const invalidData = {
        username: "testuser",
        password: "",
      };

      const result = loginSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        const passwordError = result.error.issues.find((issue) => issue.path[0] === "password");
        expect(passwordError?.message).toBe("Senha é obrigatória");
      }
    });

    it("should reject password shorter than 6 characters", () => {
      const invalidData = {
        username: "testuser",
        password: "12345",
      };

      const result = loginSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        const passwordError = result.error.issues.find((issue) => issue.path[0] === "password");
        expect(passwordError?.message).toBe("Senha deve ter no mínimo 6 caracteres");
      }
    });

    it("should accept password with exactly 6 characters", () => {
      const validData = {
        username: "testuser",
        password: "123456",
      };

      const result = loginSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it("should reject missing username field", () => {
      const invalidData = {
        password: "password123",
      };

      const result = loginSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it("should reject missing password field", () => {
      const invalidData = {
        username: "testuser",
      };

      const result = loginSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it("should handle multiple validation errors", () => {
      const invalidData = {
        username: "",
        password: "123",
      };

      const result = loginSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThanOrEqual(2);
      }
    });
  });
});
