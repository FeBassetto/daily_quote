import { z } from "zod";

export const usernameSchema = z.string().min(1, "Usuário é obrigatório").trim();

export const usernameRegistrationSchema = usernameSchema
  .min(3, "Usuário deve ter no mínimo 3 caracteres")
  .max(20, "Usuário deve ter no máximo 20 caracteres")
  .regex(/^[a-zA-Z0-9_]+$/, "Usuário deve conter apenas letras, números e _");

export const emailSchema = z
  .string()
  .min(1, "E-mail é obrigatório")
  .email("E-mail inválido")
  .trim()
  .toLowerCase();

export const passwordSchema = z
  .string()
  .min(1, "Senha é obrigatória")
  .min(6, "Senha deve ter no mínimo 6 caracteres");

export const passwordRegistrationSchema = passwordSchema
  .min(8, "Senha deve ter no mínimo 8 caracteres")
  .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
  .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
  .regex(/[0-9]/, "Senha deve conter pelo menos um número");
