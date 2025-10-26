import { registerSchema } from "../registerValidation";

describe("registerValidation", () => {
  it("should validate valid registration data", () => {
    const validData = {
      username: "testuser",
      email: "test@example.com",
      password: "Password123",
      confirmPassword: "Password123",
    };

    const result = registerSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject when passwords do not match", () => {
    const invalidData = {
      username: "testuser",
      email: "test@example.com",
      password: "Password123",
      confirmPassword: "DifferentPassword123",
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject invalid email", () => {
    const invalidData = {
      username: "testuser",
      email: "invalid-email",
      password: "Password123",
      confirmPassword: "Password123",
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject weak password", () => {
    const invalidData = {
      username: "testuser",
      email: "test@example.com",
      password: "weak",
      confirmPassword: "weak",
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject invalid username", () => {
    const invalidData = {
      username: "ab",
      email: "test@example.com",
      password: "Password123",
      confirmPassword: "Password123",
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
