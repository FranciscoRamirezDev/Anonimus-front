import { apiPost } from "@/lib/api";
import type { LoginUser } from "@/types/models";

// Reexport para compatibilidad con imports existentes (p.ej. hooks/useUserInfo).
export type { LoginUser } from "@/types/models";

export interface LoginData {
  alias: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: LoginUser;
  token: string;
}

export async function loginUserService(data: LoginData): Promise<LoginResponse> {
  return apiPost<LoginResponse>(
    "/auth/login",
    { alias: data.alias, password_hash: data.password },
    false // login no requiere token
  );
}
