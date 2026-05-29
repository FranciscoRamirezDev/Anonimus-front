// Modelos de dominio del API Anonimus (verificados contra el spec OpenAPI).

export interface Usuario {
  id_usuario: number;
  alias: string;
  avatar_url: string | null;
  fecha_registro: string;
}

// Alias de compatibilidad: el usuario logueado tiene la misma forma.
export type LoginUser = Usuario;

export interface Comunidad {
  id_comunidad: number;
  nombre: string;
  categoria: string;
}

export interface Publicacion {
  id_publicacion: number;
  id_usuario: number;
  id_comunidad: number;
  contenido: string;
  fecha_pub: string;
  es_valida: boolean;
}

export interface Comentario {
  id_comentario: number;
  id_publicacion: number;
  id_usuario: number;
  texto: string;
  fecha?: string;
}

export type TipoReaccion = "like" | "love" | "haha" | "wow" | "sad" | "angry";

export interface Reaccion {
  id_reaccion: number;
  id_publicacion: number;
  id_usuario?: number; // el API no lo incluye en las respuestas de lista
  tipo_reaccion: TipoReaccion;
}

export interface Reto {
  id_reto: number;
  id_usuario?: number; // los retos tienen dueño en los datos reales
  titulo: string;
  progreso_pct: number;
}

// Respuesta estándar de los GET de lista: { total, <recurso>: [...] }.
export type ListResponse<K extends string, T> = { total: number } & {
  [P in K]: T[];
};
