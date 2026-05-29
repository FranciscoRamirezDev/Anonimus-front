"use client";

import { useCallback, useSyncExternalStore } from "react";

// Fecha en que cada reto se marcó como completado, por-usuario, en localStorage.
// El API de retos no guarda fecha (solo id, titulo, progreso_pct), así que la
// registramos localmente cuando el reto llega al 100%.

type DateMap = Record<number, string>; // id_reto -> ISO date

const EVENT = "retoDatesChange";
const EMPTY: DateMap = {};
const cache: Record<string, { raw: string | null; value: DateMap }> = {};

function keyFor(idUsuario: number | null | undefined): string {
  return `retoDates:${idUsuario ?? "anon"}`;
}

function read(key: string): DateMap {
  const raw =
    typeof localStorage !== "undefined" ? localStorage.getItem(key) : null;
  const entry = cache[key];
  if (!entry || entry.raw !== raw) {
    let value: DateMap = {};
    try {
      value = raw ? (JSON.parse(raw) as DateMap) : {};
    } catch {
      value = {};
    }
    cache[key] = { raw, value };
  }
  return cache[key].value;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useRetoDates(idUsuario: number | null | undefined) {
  const key = keyFor(idUsuario);

  const dates = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => EMPTY
  );

  // Registra la fecha de completado (solo si no existía ya).
  const markCompleted = useCallback(
    (idReto: number) => {
      const current = read(key);
      if (current[idReto]) return;
      const next = { ...current, [idReto]: new Date().toISOString() };
      const raw = JSON.stringify(next);
      localStorage.setItem(key, raw);
      cache[key] = { raw, value: next };
      window.dispatchEvent(new Event(EVENT));
    },
    [key]
  );

  // Limpia la fecha si el reto deja de estar completo.
  const clearCompleted = useCallback(
    (idReto: number) => {
      const current = read(key);
      if (!current[idReto]) return;
      const next = { ...current };
      delete next[idReto];
      const raw = JSON.stringify(next);
      localStorage.setItem(key, raw);
      cache[key] = { raw, value: next };
      window.dispatchEvent(new Event(EVENT));
    },
    [key]
  );

  return { dates, markCompleted, clearCompleted };
}
