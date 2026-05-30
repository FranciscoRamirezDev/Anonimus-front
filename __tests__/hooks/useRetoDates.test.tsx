import { renderHook, act } from "@testing-library/react";
import { useRetoDates } from "@/hooks/useRetoDates";

describe("useRetoDates", () => {
  beforeEach(() => localStorage.clear());

  it("inicia vacío", () => {
    const { result } = renderHook(() => useRetoDates(1));
    expect(result.current.dates).toEqual({});
  });

  it("markCompleted guarda la fecha del reto", () => {
    const { result } = renderHook(() => useRetoDates(1));
    act(() => result.current.markCompleted(10));
    expect(result.current.dates[10]).toBeDefined();
    // persiste en localStorage
    expect(localStorage.getItem("retoDates:1")).toContain("10");
  });

  it("clearCompleted elimina la fecha", () => {
    const { result } = renderHook(() => useRetoDates(1));
    act(() => result.current.markCompleted(10));
    act(() => result.current.clearCompleted(10));
    expect(result.current.dates[10]).toBeUndefined();
  });
});
