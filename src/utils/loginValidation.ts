import { z } from "zod";

const usernameSchema = z.string().min(1, "Usuário é obrigatório").trim();

const passwordSchema = z
  .string()
  .min(1, "Senha é obrigatória")
  .min(6, "Senha deve ter no mínimo 6 caracteres");

export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export type LoginFormData = z.infer<typeof loginSchema>;
