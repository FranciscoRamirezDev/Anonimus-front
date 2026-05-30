import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api";
import { getToken } from "@/lib/auth";

jest.mock("@/lib/auth", () => ({ getToken: jest.fn() }));
const mockedGetToken = getToken as jest.Mock;

interface MockOpts {
  ok?: boolean;
  status?: number;
  jsonBody?: unknown;
  textBody?: string;
  reject?: boolean;
}

function mockFetchOnce(opts: MockOpts = {}) {
  const { ok = true, status = 200, jsonBody, textBody, reject } = opts;
  const fetchMock = global.fetch as jest.Mock;
  if (reject) {
    fetchMock.mockRejectedValueOnce(new TypeError("network fail"));
    return;
  }
  fetchMock.mockResolvedValueOnce({
    ok,
    status,
    json: async () => jsonBody,
    text: async () => (textBody !== undefined ? textBody : JSON.stringify(jsonBody ?? null)),
  });
}

beforeEach(() => {
  global.fetch = jest.fn();
  mockedGetToken.mockReset();
});

describe("lib/api", () => {
  it("adjunta Authorization: Bearer cuando hay token (auth por defecto)", async () => {
    mockedGetToken.mockReturnValue("tok");
    mockFetchOnce({ jsonBody: { ok: 1 } });

    await apiGet("/comunidades");

    const [url, init] = (global.fetch as jest.Mock).mock.calls[0];
    expect(url).toEqual(expect.stringContaining("/comunidades"));
    expect(init.method).toBe("GET");
    expect(init.headers.Authorization).toBe("Bearer tok");
    expect(init.headers["Content-Type"]).toBe("application/json");
  });

  it("NO adjunta Authorization cuando auth=false y envía el body en POST", async () => {
    mockedGetToken.mockReturnValue("tok");
    mockFetchOnce({ jsonBody: {} });

    await apiPost("/auth/login", { alias: "a" }, false);

    const [, init] = (global.fetch as jest.Mock).mock.calls[0];
    expect(init.method).toBe("POST");
    expect(init.headers.Authorization).toBeUndefined();
    expect(init.body).toBe(JSON.stringify({ alias: "a" }));
  });

  it("lanza Error con el message del backend si !ok", async () => {
    mockedGetToken.mockReturnValue(null);
    mockFetchOnce({ ok: false, status: 400, jsonBody: { message: "Credenciales inválidas" } });

    await expect(apiGet("/x")).rejects.toThrow("Credenciales inválidas");
  });

  it("devuelve null si el cuerpo viene vacío", async () => {
    mockedGetToken.mockReturnValue(null);
    mockFetchOnce({ textBody: "" });

    await expect(apiGet("/x")).resolves.toBeNull();
  });

  it("lanza error de conexión si fetch rechaza", async () => {
    mockedGetToken.mockReturnValue(null);
    mockFetchOnce({ reject: true });

    await expect(apiGet("/x")).rejects.toThrow("No se pudo conectar con el servidor.");
  });

  it("apiPut y apiDelete usan el método correcto", async () => {
    mockedGetToken.mockReturnValue(null);

    mockFetchOnce({ jsonBody: {} });
    await apiPut("/x", { b: 2 });
    expect((global.fetch as jest.Mock).mock.calls[0][1].method).toBe("PUT");

    mockFetchOnce({ jsonBody: {} });
    await apiDelete("/x");
    expect((global.fetch as jest.Mock).mock.calls[1][1].method).toBe("DELETE");
  });
});
