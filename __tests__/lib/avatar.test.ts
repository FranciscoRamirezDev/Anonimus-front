import { avatarFromSeed, isStableAvatarUrl, AVATAR_OPTIONS } from "@/lib/avatar";

describe("avatarFromSeed", () => {
  it("genera URL de DiceBear con estilo por defecto (fun-emoji)", () => {
    expect(avatarFromSeed("Luna")).toBe(
      "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Luna"
    );
  });

  it("permite un estilo personalizado", () => {
    expect(avatarFromSeed("Sol", "bottts")).toContain("/bottts/svg?seed=Sol");
  });

  it("codifica el seed en la URL", () => {
    expect(avatarFromSeed("a b/c")).toContain("seed=a%20b%2Fc");
  });

  it("usa 'anon' cuando el seed es vacío o solo espacios", () => {
    expect(avatarFromSeed("")).toContain("seed=anon");
    expect(avatarFromSeed("   ")).toContain("seed=anon");
  });
});

describe("isStableAvatarUrl", () => {
  it("es true para URLs de DiceBear", () => {
    expect(isStableAvatarUrl("https://api.dicebear.com/9.x/fun-emoji/svg?seed=x")).toBe(true);
  });

  it("es false para null, undefined u otras URLs (p.ej. aida-public)", () => {
    expect(isStableAvatarUrl(null)).toBe(false);
    expect(isStableAvatarUrl(undefined)).toBe(false);
    expect(isStableAvatarUrl("https://lh3.googleusercontent.com/aida-public/abc")).toBe(false);
  });
});

describe("AVATAR_OPTIONS", () => {
  it("ofrece 5 opciones y todas son estables", () => {
    expect(AVATAR_OPTIONS).toHaveLength(5);
    expect(AVATAR_OPTIONS.every((u) => isStableAvatarUrl(u))).toBe(true);
  });
});
