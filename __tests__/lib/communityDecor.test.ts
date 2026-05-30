import { communityIcon, decorativeMembers } from "@/lib/communityDecor";

describe("communityIcon", () => {
  it("mapea categorías conocidas por palabra clave", () => {
    expect(communityIcon("Alcoholismo")).toBe("local_bar");
    expect(communityIcon("Dejar de fumar")).toBe("smoking_rooms");
    expect(communityIcon("Ansiedad")).toBe("psychology");
    expect(communityIcon("Alimentación saludable")).toBe("restaurant");
    expect(communityIcon("ejercicio")).toBe("fitness_center");
  });

  it("usa 'groups' como fallback", () => {
    expect(communityIcon("categoría rara")).toBe("groups");
    expect(communityIcon(undefined)).toBe("groups");
    expect(communityIcon("")).toBe("groups");
  });
});

describe("decorativeMembers", () => {
  it("es determinista para el mismo id", () => {
    expect(decorativeMembers(7)).toBe(decorativeMembers(7));
  });

  it("devuelve un string (formateado por locale)", () => {
    expect(typeof decorativeMembers(3)).toBe("string");
  });

  it("difiere entre ids distintos", () => {
    expect(decorativeMembers(1)).not.toBe(decorativeMembers(2));
  });
});
