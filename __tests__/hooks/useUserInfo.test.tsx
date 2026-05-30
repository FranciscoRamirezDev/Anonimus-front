import { renderHook } from "@testing-library/react";
import { useUserInfo } from "@/hooks/useUserInfo";

describe("useUserInfo", () => {
  beforeEach(() => localStorage.clear());

  it("devuelve null si no hay userInfo", () => {
    const { result } = renderHook(() => useUserInfo());
    expect(result.current).toBeNull();
  });

  it("devuelve el usuario guardado en localStorage", () => {
    const u = { id_usuario: 1, alias: "Ana", avatar_url: null, fecha_registro: "x" };
    localStorage.setItem("userInfo", JSON.stringify(u));
    const { result } = renderHook(() => useUserInfo());
    expect(result.current).toEqual(u);
  });
});
