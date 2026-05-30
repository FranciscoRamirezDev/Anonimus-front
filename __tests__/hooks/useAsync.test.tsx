import { renderHook, waitFor, act } from "@testing-library/react";
import { useAsync } from "@/hooks/useAsync";

describe("useAsync", () => {
  it("resuelve data y deja loading en false", async () => {
    const fn = jest.fn().mockResolvedValue("ok");
    const { result } = renderHook(() => useAsync(fn, []));

    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toBe("ok");
    expect(result.current.error).toBeNull();
  });

  it("captura el error y expone el message", async () => {
    const fn = jest.fn().mockRejectedValue(new Error("boom"));
    const { result } = renderHook(() => useAsync(fn, []));

    await waitFor(() => expect(result.current.error).toBe("boom"));
    expect(result.current.data).toBeNull();
  });

  it("reload vuelve a ejecutar fn", async () => {
    const fn = jest.fn().mockResolvedValue("a");
    const { result } = renderHook(() => useAsync(fn, []));
    await waitFor(() => expect(result.current.data).toBe("a"));

    fn.mockResolvedValue("b");
    act(() => result.current.reload());
    await waitFor(() => expect(result.current.data).toBe("b"));
  });
});
