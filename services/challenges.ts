import { apiGet, apiFetch } from "@/lib/api";
import type { Reto, ListResponse } from "@/types/models";

export async function listChallenges(limit = 1000, offset = 0): Promise<Reto[]> {
  const res = await apiGet<ListResponse<"retos", Reto>>(
    `/retos?limit=${limit}&offset=${offset}`
  );
  return res?.retos ?? [];
}

export async function getChallenge(id: number): Promise<Reto> {
  const res = await apiGet<Reto | { reto: Reto }>(`/retos/${id}`);
  return "reto" in res ? res.reto : res;
}

// El API no filtra por usuario: traemos todos y filtramos por dueño en cliente.
export async function getChallengesByUser(idUsuario: number): Promise<Reto[]> {
  const all = await listChallenges();
  return all.filter((r) => r.id_usuario === idUsuario);
}

// El dueño del reto se deriva del JWT en el backend (igual que las publicaciones).
export async function createReto(
  input: { titulo: string; progreso_pct?: number },
  token?: string
): Promise<unknown> {
  return apiFetch("/retos", { method: "POST", body: input, token });
}

// Retos por defecto que se asignan a cada usuario al registrarse.
const DEFAULT_RETOS = [
  "7 días de gratitud diaria",
  "Meditar 10 minutos al día",
  "Dormir 8 horas esta semana",
  "Salir a caminar 30 minutos",
  "Escribir cómo me siento cada día",
  "Reducir el tiempo en redes sociales",
  "Hablar con alguien de confianza",
  "Beber 2 litros de agua al día",
  "Practicar respiración consciente",
  "Cumplir una pequeña meta hoy",
];

// Crea los 10 retos iniciales para un usuario recién registrado.
// Usa el token devuelto por el registro (aún no hay cookie de sesión).
export async function seedDefaultRetos(token: string): Promise<void> {
  await Promise.all(
    DEFAULT_RETOS.map((titulo) =>
      createReto({ titulo, progreso_pct: 0 }, token).catch(() => {
        // si alguno falla, no bloqueamos el registro
      })
    )
  );
}
