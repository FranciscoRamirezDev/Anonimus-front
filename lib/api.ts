// Wrapper único de fetch para el API Anonimus.
// Centraliza base URL, header Authorization (Bearer JWT) y manejo de errores.

import { getToken } from "@/lib/auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  auth?: boolean; // adjuntar Authorization: Bearer <token> (default true)
  token?: string; // token explícito (p.ej. justo tras registrarse, sin cookie aún)
}

export async function apiFetch<T>(
  path: string,
  { method = "GET", body, auth = true, token }: ApiOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (auth) {
    const bearer = token ?? getToken();
    if (bearer) headers["Authorization"] = `Bearer ${bearer}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("No se pudo conectar con el servidor.");
  }

  if (!response.ok) {
    let message = `Error ${response.status}`;
    try {
      const err = await response.json();
      message = err?.message || message;
    } catch {
      // respuesta sin cuerpo JSON
    }
    throw new Error(message);
  }

  const text = await response.text();
  return (text ? JSON.parse(text) : null) as T;
}

export const apiGet = <T>(path: string, auth = true) =>
  apiFetch<T>(path, { method: "GET", auth });

export const apiPost = <T>(path: string, body?: unknown, auth = true) =>
  apiFetch<T>(path, { method: "POST", body, auth });

export const apiPut = <T>(path: string, body?: unknown, auth = true) =>
  apiFetch<T>(path, { method: "PUT", body, auth });

export const apiDelete = <T>(path: string, auth = true) =>
  apiFetch<T>(path, { method: "DELETE", auth });
