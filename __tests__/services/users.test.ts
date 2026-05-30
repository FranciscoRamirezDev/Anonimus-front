jest.mock("@/lib/api");
import { apiGet } from "@/lib/api";
import { listUsers, buildUserMap } from "@/services/users";

const mGet = apiGet as jest.Mock;

beforeEach(() => mGet.mockReset());

describe("services/users", () => {
  it("listUsers devuelve usuarios", async () => {
    mGet.mockResolvedValue({ usuarios: [{ id_usuario: 1, alias: "a" }] });
    await expect(listUsers()).resolves.toEqual([{ id_usuario: 1, alias: "a" }]);
  });

  it("buildUserMap devuelve un Map por id_usuario", async () => {
    mGet.mockResolvedValue({
      usuarios: [
        { id_usuario: 1, alias: "Ana" },
        { id_usuario: 2, alias: "Beto" },
      ],
    });
    const map = await buildUserMap();
    expect(map.get(1)?.alias).toBe("Ana");
    expect(map.get(2)?.alias).toBe("Beto");
    expect(map.size).toBe(2);
  });
});
