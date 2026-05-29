"use client";

import { useCallback, useEffect, useState } from "react";

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Hook genérico para llamadas async (servicios del API): estandariza
// loading / error / reload. setState ocurre solo en callbacks async
// (nunca síncrono dentro del effect).
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let active = true;
    fn()
      .then((res) => {
        if (active) setState({ data: res, loading: false, error: null });
      })
      .catch((e) => {
        if (active)
          setState({
            data: null,
            loading: false,
            error: e instanceof Error ? e.message : "Error inesperado",
          });
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, ...deps]);

  const reload = useCallback(() => {
    setState((s) => ({ ...s, loading: true }));
    setTick((t) => t + 1);
  }, []);

  return { ...state, reload };
}
