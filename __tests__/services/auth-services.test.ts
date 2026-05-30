jest.mock("@/lib/api");
import { apiPost } from "@/lib/api";
import { loginUserService } from "@/services/login";
import { registerUserService } from "@/services/register";

const mPost = apiPost as jest.Mock;

beforeEach(() => mPost.mockReset());

describe("services/login", () => {
  it("envía password como password_hash y sin auth", async () => {
    mPost.mockResolvedValue({ message: "ok", user: {}, token: "t" });
    await loginUserService({ alias: "ana", password: "secreto12" });
    expect(mPost).toHaveBeenCalledWith(
      "/auth/login",
      { alias: "ana", password_hash: "secreto12" },
      false
    );
  });
});

describe("services/register", () => {
  it("envía password_hash y avatar_url, sin auth", async () => {
    mPost.mockResolvedValue({ status: 201, success: true, message: "ok" });
    await registerUserService({ alias: "ana", password: "secreto12", avatar: "https://api.dicebear.com/x" });
    expect(mPost).toHaveBeenCalledWith(
      "/auth/register",
      { alias: "ana", password_hash: "secreto12", avatar_url: "https://api.dicebear.com/x" },
      false
    );
  });
});
