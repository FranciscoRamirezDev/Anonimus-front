import { apiGet } from "@/lib/api";
import type { Comunidad, ListResponse } from "@/types/models";

export async function listCommunities(limit = 100, offset = 0): Promise<Comunidad[]> {
  const res = await apiGet<ListResponse<"comunidades", Comunidad>>(
    `/comunidades?limit=${limit}&offset=${offset}`
  );
  return res?.comunidades ?? [];
}

export async function getCommunity(id: number): Promise<Comunidad> {
  // El backend puede devolver el objeto directo o envuelto en { comunidad }.
  const res = await apiGet<Comunidad | { comunidad: Comunidad }>(`/comunidades/${id}`);
  return "comunidad" in res ? res.comunidad : res;
}
