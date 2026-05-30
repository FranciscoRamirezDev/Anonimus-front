jest.mock("@/lib/api");
import { apiGet, apiPost } from "@/lib/api";
import { getCommentsByPost, createComment } from "@/services/comments";

const mGet = apiGet as jest.Mock;
const mPost = apiPost as jest.Mock;

beforeEach(() => {
  mGet.mockReset();
  mPost.mockReset();
});

describe("services/comments", () => {
  it("getCommentsByPost filtra por id_publicacion", async () => {
    mGet.mockResolvedValue({
      comentarios: [
        { id_comentario: 1, id_publicacion: 7, texto: "a" },
        { id_comentario: 2, id_publicacion: 8, texto: "b" },
        { id_comentario: 3, id_publicacion: 7, texto: "c" },
      ],
    });
    const res = await getCommentsByPost(7);
    expect(res.map((c) => c.id_comentario)).toEqual([1, 3]);
  });

  it("createComment hace POST a /comentarios", async () => {
    mPost.mockResolvedValue({});
    await createComment({ id_publicacion: 7, texto: "hola" });
    expect(mPost).toHaveBeenCalledWith("/comentarios", { id_publicacion: 7, texto: "hola" });
  });
});
