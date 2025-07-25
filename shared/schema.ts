import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "El nombre de usuario es requerido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export const authResponseSchema = z.object({
  success: z.boolean(),
  username: z.string().optional(),
  message: z.string().optional(),
});

export type LoginRequest = z.infer<typeof loginSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;

// Simple session type for in-memory storage
export type UserSession = {
  id: string;
  username: string;
  loginTime: Date;
};
