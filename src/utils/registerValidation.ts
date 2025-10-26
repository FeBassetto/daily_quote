import { z } from "zod";
import {
  emailSchema,
  passwordRegistrationSchema,
  usernameRegistrationSchema,
} from "./validationSchemas";

const confirmPasswordSchema = z.string().min(1, "Confirmação de senha é obrigatória");

export const registerSchema = z
  .object({
    username: usernameRegistrationSchema,
    email: emailSchema,
    password: passwordRegistrationSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
