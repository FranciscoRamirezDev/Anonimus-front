import { apiGet } from "@/lib/api";
import { getToken } from "@/lib/auth";

jest.mock("@/lib/auth", () => ({ getToken: jest.fn() }));
const mockedGetToken = getToken as jest.Mock;

beforeEach(() => {
  global.fetch = jest.fn();
  mockedGetToken.mockReset();
  mockedGetToken.mockReturnValue(null);
});

describe("lib/api (ramas de error)", () => {
  it("usa 'Error {status}' si el cuerpo de error no es JSON parseable", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => {
        throw new Error("no es json");
      },
      text: async () => "",
    });

    await expect(apiGet("/x")).rejects.toThrow("Error 500");
  });
});
