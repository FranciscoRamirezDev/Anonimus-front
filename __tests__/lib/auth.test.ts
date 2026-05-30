import { getToken, getCurrentUser, saveSession, clearSession } from "@/lib/auth";
import type { LoginUser } from "@/types/models";

const user: LoginUser = {
  id_usuario: 1,
  alias: "Ana",
  avatar_url: null,
  fecha_registro: "2026-01-01",
};

function clearAllCookies() {
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/");
  });
}

describe("lib/auth", () => {
  beforeEach(() => {
    localStorage.clear();
    clearAllCookies();
  });

  it("getToken devuelve null si no hay cookie", () => {
    expect(getToken()).toBeNull();
  });

  it("getCurrentUser devuelve null si no hay userInfo", () => {
    expect(getCurrentUser()).toBeNull();
  });

  it("saveSession guarda userInfo y token, y se pueden leer", () => {
    saveSession(user, "tok123");
    expect(getCurrentUser()).toEqual(user);
    expect(getToken()).toBe("tok123");
  });

  it("getCurrentUser devuelve null si userInfo está corrupto", () => {
    localStorage.setItem("userInfo", "{ no es json");
    expect(getCurrentUser()).toBeNull();
  });

  it("clearSession elimina userInfo y token", () => {
    saveSession(user, "tok");
    clearSession();
    expect(getCurrentUser()).toBeNull();
    expect(getToken() || null).toBeNull();
  });
});
