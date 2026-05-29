import { apiGet, apiPost } from "@/lib/api";
import type { Reaccion, TipoReaccion, ListResponse } from "@/types/models";

export async function listReactions(limit = 500, offset = 0): Promise<Reaccion[]> {
  const res = await apiGet<ListResponse<"reacciones", Reaccion>>(
    `/reacciones?limit=${limit}&offset=${offset}`
  );
  return res?.reacciones ?? [];
}

// El API no permite filtrar por publicación: filtramos/contamos en cliente.
export async function getReactionsByPost(idPublicacion: number): Promise<Reaccion[]> {
  const all = await listReactions();
  return all.filter((r) => r.id_publicacion === idPublicacion);
}

export async function createReaction(input: {
  id_publicacion: number;
  tipo_reaccion: TipoReaccion;
}): Promise<unknown> {
  return apiPost("/reacciones", input);
}
