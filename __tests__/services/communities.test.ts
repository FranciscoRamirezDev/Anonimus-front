jest.mock("@/lib/api");
import { apiGet } from "@/lib/api";
import { listCommunities, getCommunity } from "@/services/communities";

const mGet = apiGet as jest.Mock;

beforeEach(() => mGet.mockReset());

describe("services/communities", () => {
  it("listCommunities devuelve el arreglo de comunidades", async () => {
    mGet.mockResolvedValue({ total: 1, comunidades: [{ id_comunidad: 1, nombre: "Tec", categoria: "tecnologia" }] });
    await expect(listCommunities()).resolves.toEqual([
      { id_comunidad: 1, nombre: "Tec", categoria: "tecnologia" },
    ]);
    expect(mGet).toHaveBeenCalledWith(expect.stringContaining("/comunidades?limit=100"));
  });

  it("listCommunities devuelve [] si falta el campo", async () => {
    mGet.mockResolvedValue({ total: 0 });
    await expect(listCommunities()).resolves.toEqual([]);
  });

  it("getCommunity desenvuelve { comunidad }", async () => {
    mGet.mockResolvedValue({ comunidad: { id_comunidad: 3 } });
    await expect(getCommunity(3)).resolves.toEqual({ id_comunidad: 3 });
  });

  it("getCommunity acepta el objeto directo", async () => {
    mGet.mockResolvedValue({ id_comunidad: 4, nombre: "X", categoria: "y" });
    await expect(getCommunity(4)).resolves.toEqual({ id_comunidad: 4, nombre: "X", categoria: "y" });
  });
});
