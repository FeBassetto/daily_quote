import { forgotPasswordSchema } from "../forgotPasswordValidation";

describe("forgotPasswordValidation", () => {
  it("should validate valid email", () => {
    const validData = {
      email: "test@example.com",
    };

    const result = forgotPasswordSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject invalid email", () => {
    const invalidData = {
      email: "invalid-email",
    };

    const result = forgotPasswordSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject empty email", () => {
    const invalidData = {
      email: "",
    };

    const result = forgotPasswordSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
