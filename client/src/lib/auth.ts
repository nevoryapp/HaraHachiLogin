import { apiRequest } from "./queryClient";
import { type LoginRequest, type AuthResponse } from "@shared/schema";

export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  console.log("Attempting login with:", { username: credentials.username, password: "***" });
  try {
    const response = await apiRequest("POST", "/api/auth/login", credentials);
    const data = await response.json();
    console.log("Login API response:", data);
    return data;
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
}

export async function logout(): Promise<AuthResponse> {
  const response = await apiRequest("POST", "/api/auth/logout");
  return response.json();
}

export async function checkAuthStatus(): Promise<AuthResponse> {
  const response = await apiRequest("GET", "/api/auth/status");
  return response.json();
}
