import { apiPost } from "@/lib/api";

export interface RegisterData {
  alias: string;
  password: string;
  avatar: string;
}

export interface RegisterResponse {
  status: number;
  success: boolean;
  message: string;
  userId?: string;
  token?: string;
}

export async function registerUserService(data: RegisterData): Promise<RegisterResponse> {
  return apiPost<RegisterResponse>(
    "/auth/register",
    {
      alias: data.alias,
      password_hash: data.password,
      avatar_url: data.avatar,
    },
    false // registro no requiere token
  );
}
