import { apiRequest } from "./queryClient";
import { type LoginRequest, type AuthResponse } from "@shared/schema";

export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  const response = await apiRequest("POST", "/api/auth/login", credentials);
  return response.json();
}

export async function logout(): Promise<AuthResponse> {
  const response = await apiRequest("POST", "/api/auth/logout");
  return response.json();
}

export async function checkAuthStatus(): Promise<AuthResponse> {
  const response = await apiRequest("GET", "/api/auth/status");
  return response.json();
}
