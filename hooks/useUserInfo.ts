"use client";

import { useSyncExternalStore } from "react";
import type { LoginUser } from "@/services/login";

// Cache para que getSnapshot devuelva la misma referencia mientras el raw no cambie
// (useSyncExternalStore compara con Object.is y entraría en bucle si parseamos en cada render).
let cachedUser: LoginUser | null = null;
let cachedRaw: string | null = null;

function getSnapshot(): LoginUser | null {
  const raw = localStorage.getItem("userInfo");
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedUser = raw ? JSON.parse(raw) : null;
    } catch {
      cachedUser = null;
    }
  }
  return cachedUser;
}

function getServerSnapshot(): LoginUser | null {
  return null;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function useUserInfo(): LoginUser | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
