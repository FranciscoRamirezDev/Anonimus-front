import { apiGet, apiPost } from "@/lib/api";
import type { Publicacion, ListResponse } from "@/types/models";

export async function listPosts(limit = 100, offset = 0): Promise<Publicacion[]> {
  const res = await apiGet<ListResponse<"publicaciones", Publicacion>>(
    `/publicaciones?limit=${limit}&offset=${offset}`
  );
  return res?.publicaciones ?? [];
}

export async function getPost(id: number): Promise<Publicacion> {
  const res = await apiGet<Publicacion | { publicacion: Publicacion }>(`/publicaciones/${id}`);
  return "publicacion" in res ? res.publicacion : res;
}

// El API no permite filtrar por comunidad: traemos la lista y filtramos en cliente.
export async function getPostsByCommunity(idComunidad: number): Promise<Publicacion[]> {
  const all = await listPosts();
  return all.filter((p) => p.id_comunidad === idComunidad);
}

export async function createPost(input: {
  id_comunidad: number;
  contenido: string;
}): Promise<unknown> {
  return apiPost("/publicaciones", input);
}
