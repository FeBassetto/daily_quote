import { z } from "zod";
import { emailSchema } from "./validationSchemas";

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
