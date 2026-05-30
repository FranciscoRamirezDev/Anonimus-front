jest.mock("@/lib/api");
import { apiGet, apiPut, apiFetch } from "@/lib/api";
import {
  listChallenges,
  getChallenge,
  getChallengesByUser,
  updateReto,
  createReto,
  seedDefaultRetos,
} from "@/services/challenges";

const mGet = apiGet as jest.Mock;
const mPut = apiPut as jest.Mock;
const mFetch = apiFetch as jest.Mock;

beforeEach(() => {
  mGet.mockReset();
  mPut.mockReset();
  mFetch.mockReset();
});

describe("services/challenges", () => {
  it("listChallenges devuelve retos", async () => {
    mGet.mockResolvedValue({ retos: [{ id_reto: 1 }] });
    await expect(listChallenges()).resolves.toEqual([{ id_reto: 1 }]);
  });

  it("getChallenge desenvuelve { reto }", async () => {
    mGet.mockResolvedValue({ reto: { id_reto: 2 } });
    await expect(getChallenge(2)).resolves.toEqual({ id_reto: 2 });
  });

  it("getChallengesByUser filtra por id_usuario", async () => {
    mGet.mockResolvedValue({
      retos: [
        { id_reto: 1, id_usuario: 10 },
        { id_reto: 2, id_usuario: 20 },
        { id_reto: 3, id_usuario: 10 },
      ],
    });
    const res = await getChallengesByUser(10);
    expect(res.map((r) => r.id_reto)).toEqual([1, 3]);
  });

  it("updateReto hace PUT /retos/{id} con progreso_pct", async () => {
    mPut.mockResolvedValue({});
    await updateReto(5, 75);
    expect(mPut).toHaveBeenCalledWith("/retos/5", { progreso_pct: 75 });
  });

  it("createReto hace POST /retos con token explícito", async () => {
    mFetch.mockResolvedValue({});
    await createReto({ titulo: "Reto", progreso_pct: 0 }, "tok");
    expect(mFetch).toHaveBeenCalledWith("/retos", {
      method: "POST",
      body: { titulo: "Reto", progreso_pct: 0 },
      token: "tok",
    });
  });

  it("seedDefaultRetos crea los 10 retos por defecto", async () => {
    mFetch.mockResolvedValue({});
    await seedDefaultRetos("tok");
    expect(mFetch).toHaveBeenCalledTimes(10);
    // todas las llamadas usan el token y el endpoint correcto
    for (const call of mFetch.mock.calls) {
      expect(call[0]).toBe("/retos");
      expect(call[1].token).toBe("tok");
    }
  });

  it("seedDefaultRetos no falla aunque alguna creación rechace", async () => {
    mFetch.mockRejectedValue(new Error("boom"));
    await expect(seedDefaultRetos("tok")).resolves.toBeUndefined();
  });
});
