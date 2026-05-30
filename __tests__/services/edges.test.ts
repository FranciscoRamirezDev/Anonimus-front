jest.mock("@/lib/api");
import { apiGet } from "@/lib/api";
import { listPosts, getPost } from "@/services/posts";
import { getCommentsByPost } from "@/services/comments";
import { getReactionsByPost } from "@/services/reactions";
import { listUsers } from "@/services/users";
import { listChallenges, getChallenge } from "@/services/challenges";

const mGet = apiGet as jest.Mock;
beforeEach(() => mGet.mockReset());

describe("services: ramas ?? [] y desempaquetado directo", () => {
  it("listPosts -> [] si falta el campo", async () => {
    mGet.mockResolvedValue({});
    await expect(listPosts()).resolves.toEqual([]);
  });

  it("listPosts -> [] si la respuesta es null", async () => {
    mGet.mockResolvedValue(null);
    await expect(listPosts()).resolves.toEqual([]);
  });

  it("getPost acepta objeto directo (sin { publicacion })", async () => {
    mGet.mockResolvedValue({ id_publicacion: 1 });
    await expect(getPost(1)).resolves.toEqual({ id_publicacion: 1 });
  });

  it("getCommentsByPost -> [] si falta el campo", async () => {
    mGet.mockResolvedValue({});
    await expect(getCommentsByPost(1)).resolves.toEqual([]);
  });

  it("getReactionsByPost -> [] si falta el campo", async () => {
    mGet.mockResolvedValue({});
    await expect(getReactionsByPost(1)).resolves.toEqual([]);
  });

  it("listUsers -> [] si falta el campo", async () => {
    mGet.mockResolvedValue({});
    await expect(listUsers()).resolves.toEqual([]);
  });

  it("listChallenges -> [] si falta el campo", async () => {
    mGet.mockResolvedValue({});
    await expect(listChallenges()).resolves.toEqual([]);
  });

  it("getChallenge acepta objeto directo (sin { reto })", async () => {
    mGet.mockResolvedValue({ id_reto: 1 });
    await expect(getChallenge(1)).resolves.toEqual({ id_reto: 1 });
  });
});
