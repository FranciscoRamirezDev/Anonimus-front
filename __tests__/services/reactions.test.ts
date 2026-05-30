jest.mock("@/lib/api");
import { apiGet, apiPost } from "@/lib/api";
import { getReactionsByPost, createReaction } from "@/services/reactions";

const mGet = apiGet as jest.Mock;
const mPost = apiPost as jest.Mock;

beforeEach(() => {
  mGet.mockReset();
  mPost.mockReset();
});

describe("services/reactions", () => {
  it("getReactionsByPost filtra por id_publicacion", async () => {
    mGet.mockResolvedValue({
      reacciones: [
        { id_reaccion: 1, id_publicacion: 4, tipo_reaccion: "like" },
        { id_reaccion: 2, id_publicacion: 5, tipo_reaccion: "love" },
        { id_reaccion: 3, id_publicacion: 4, tipo_reaccion: "love" },
      ],
    });
    const res = await getReactionsByPost(4);
    expect(res.map((r) => r.id_reaccion)).toEqual([1, 3]);
  });

  it("createReaction hace POST a /reacciones con tipo_reaccion", async () => {
    mPost.mockResolvedValue({});
    await createReaction({ id_publicacion: 4, tipo_reaccion: "love" });
    expect(mPost).toHaveBeenCalledWith("/reacciones", { id_publicacion: 4, tipo_reaccion: "love" });
  });
});
