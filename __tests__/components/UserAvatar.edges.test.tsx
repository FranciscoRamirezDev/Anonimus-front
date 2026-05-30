import { render, screen, fireEvent } from "@testing-library/react";
import UserAvatar from "@/components/UserAvatar";

describe("UserAvatar (ramas sin alias)", () => {
  it("usa seed=anon cuando no hay alias ni url", () => {
    render(<UserAvatar />);
    expect(screen.getByRole("img").getAttribute("src")).toContain("seed=anon");
  });

  it("muestra '?' como inicial si la imagen falla y no hay alias", () => {
    render(<UserAvatar />);
    fireEvent.error(screen.getByRole("img"));
    expect(screen.getByText("?")).toBeInTheDocument();
  });
});
