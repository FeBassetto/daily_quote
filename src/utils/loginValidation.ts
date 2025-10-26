import { z } from "zod";
import { passwordSchema, usernameSchema } from "./validationSchemas";

export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export type LoginFormData = z.infer<typeof loginSchema>;
