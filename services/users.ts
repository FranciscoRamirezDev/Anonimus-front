import { apiGet } from "@/lib/api";
import type { Usuario, ListResponse } from "@/types/models";

export async function listUsers(limit = 500, offset = 0): Promise<Usuario[]> {
  const res = await apiGet<ListResponse<"usuarios", Usuario>>(
    `/usuarios?limit=${limit}&offset=${offset}`
  );
  return res?.usuarios ?? [];
}

// Mapa id_usuario -> Usuario para resolver autores de publicaciones/comentarios.
export async function buildUserMap(): Promise<Map<number, Usuario>> {
  const users = await listUsers();
  return new Map(users.map((u) => [u.id_usuario, u]));
}
