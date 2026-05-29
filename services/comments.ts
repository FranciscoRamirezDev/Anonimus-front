import { apiGet, apiPost } from "@/lib/api";
import type { Comentario, ListResponse } from "@/types/models";

export async function listComments(limit = 200, offset = 0): Promise<Comentario[]> {
  const res = await apiGet<ListResponse<"comentarios", Comentario>>(
    `/comentarios?limit=${limit}&offset=${offset}`
  );
  return res?.comentarios ?? [];
}

// El API no permite filtrar por publicación: filtramos en cliente.
export async function getCommentsByPost(idPublicacion: number): Promise<Comentario[]> {
  const all = await listComments();
  return all.filter((c) => c.id_publicacion === idPublicacion);
}

export async function createComment(input: {
  id_publicacion: number;
  texto: string;
}): Promise<unknown> {
  return apiPost("/comentarios", input);
}
