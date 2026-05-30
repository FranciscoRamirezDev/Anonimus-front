import { renderHook, act } from "@testing-library/react";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useRetoDates } from "@/hooks/useRetoDates";

describe("useUserInfo (ramas)", () => {
  beforeEach(() => localStorage.clear());

  it("devuelve null si userInfo está corrupto", () => {
    localStorage.setItem("userInfo", "{ corrupto");
    const { result } = renderHook(() => useUserInfo());
    expect(result.current).toBeNull();
  });

  it("se desmonta sin error (cleanup de la suscripción)", () => {
    const { unmount } = renderHook(() => useUserInfo());
    expect(() => unmount()).not.toThrow();
  });
});

describe("useRetoDates (ramas)", () => {
  beforeEach(() => localStorage.clear());

  it("markCompleted es idempotente (no reescribe si ya existe)", () => {
    const { result } = renderHook(() => useRetoDates(2));
    act(() => result.current.markCompleted(10));
    const first = result.current.dates[10];
    act(() => result.current.markCompleted(10));
    expect(result.current.dates[10]).toBe(first);
  });

  it("clearCompleted no hace nada si la fecha no existe", () => {
    const { result } = renderHook(() => useRetoDates(2));
    act(() => result.current.clearCompleted(999));
    expect(result.current.dates[999]).toBeUndefined();
  });

  it("maneja localStorage corrupto devolviendo {}", () => {
    localStorage.setItem("retoDates:3", "{ corrupto");
    const { result } = renderHook(() => useRetoDates(3));
    expect(result.current.dates).toEqual({});
  });
});
