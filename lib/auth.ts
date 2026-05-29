// Helpers de sesión sin React (usables desde servicios y componentes).
// El token vive en una cookie (legible por el proxy del servidor);
// la info del usuario vive en localStorage.

import type { LoginUser } from "@/types/models";

const TOKEN_COOKIE = "token";
const USER_KEY = "userInfo";
const MAX_AGE = 60 * 60 * 24; // 1 día

export function getToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${TOKEN_COOKIE}=`));
  return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : null;
}

export function getCurrentUser(): LoginUser | null {
  if (typeof localStorage === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as LoginUser;
  } catch {
    return null;
  }
}

export function saveSession(user: LoginUser, token: string): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  document.cookie = `${TOKEN_COOKIE}=${token}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
}

export function clearSession(): void {
  localStorage.removeItem(USER_KEY);
  document.cookie = `${TOKEN_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}
