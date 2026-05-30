jest.mock("@/lib/api");
import { apiGet, apiPost } from "@/lib/api";
import { listPosts, getPost, getPostsByCommunity, createPost } from "@/services/posts";

const mGet = apiGet as jest.Mock;
const mPost = apiPost as jest.Mock;

beforeEach(() => {
  mGet.mockReset();
  mPost.mockReset();
});

describe("services/posts", () => {
  it("listPosts devuelve publicaciones", async () => {
    mGet.mockResolvedValue({ total: 1, publicaciones: [{ id_publicacion: 1 }] });
    await expect(listPosts()).resolves.toEqual([{ id_publicacion: 1 }]);
  });

  it("getPostsByCommunity filtra por id_comunidad en cliente", async () => {
    mGet.mockResolvedValue({
      publicaciones: [
        { id_publicacion: 1, id_comunidad: 5 },
        { id_publicacion: 2, id_comunidad: 9 },
        { id_publicacion: 3, id_comunidad: 5 },
      ],
    });
    const res = await getPostsByCommunity(5);
    expect(res.map((p) => p.id_publicacion)).toEqual([1, 3]);
  });

  it("createPost hace POST a /publicaciones con el body", async () => {
    mPost.mockResolvedValue({});
    await createPost({ id_comunidad: 2, contenido: "hola" });
    expect(mPost).toHaveBeenCalledWith("/publicaciones", { id_comunidad: 2, contenido: "hola" });
  });

  it("getPost desenvuelve { publicacion }", async () => {
    mGet.mockResolvedValue({ publicacion: { id_publicacion: 9 } });
    await expect(getPost(9)).resolves.toEqual({ id_publicacion: 9 });
  });
});
