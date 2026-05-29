"use client";

import { useCallback, useSyncExternalStore } from "react";

// Progreso de retos por-usuario, guardado en localStorage.
// Los retos del API son globales (sin dueño); aquí el avance que marca cada
// usuario se persiste local, sin pisar el progreso de otros (no se hace PUT).

type ProgressMap = Record<number, number>;

const EVENT = "retoProgressChange";
const EMPTY: ProgressMap = {};

// Cache para devolver referencia estable en getSnapshot (Object.is).
const cache: Record<string, { raw: string | null; value: ProgressMap }> = {};

function keyFor(idUsuario: number | null | undefined): string {
  return `retoProgress:${idUsuario ?? "anon"}`;
}

function read(key: string): ProgressMap {
  const raw =
    typeof localStorage !== "undefined" ? localStorage.getItem(key) : null;
  const entry = cache[key];
  if (!entry || entry.raw !== raw) {
    let value: ProgressMap = {};
    try {
      value = raw ? (JSON.parse(raw) as ProgressMap) : {};
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

export function useRetoProgress(idUsuario: number | null | undefined) {
  const key = keyFor(idUsuario);

  const progress = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => EMPTY
  );

  const setProgress = useCallback(
    (idReto: number, pct: number) => {
      const clamped = Math.max(0, Math.min(100, Math.round(pct)));
      const next = { ...read(key), [idReto]: clamped };
      const raw = JSON.stringify(next);
      localStorage.setItem(key, raw);
      cache[key] = { raw, value: next };
      window.dispatchEvent(new Event(EVENT));
    },
    [key]
  );

  return { progress, setProgress };
}
