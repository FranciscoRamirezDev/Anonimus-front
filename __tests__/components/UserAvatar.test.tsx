import { render, screen, fireEvent } from "@testing-library/react";
import UserAvatar from "@/components/UserAvatar";

describe("UserAvatar", () => {
  it("usa la avatar_url guardada si es de DiceBear (estable)", () => {
    const stable = "https://api.dicebear.com/9.x/bottts/svg?seed=Ana";
    render(<UserAvatar alias="Ana" avatarUrl={stable} />);
    expect(screen.getByRole("img")).toHaveAttribute("src", stable);
  });

  it("deriva un avatar del alias si la URL no es estable (caducada)", () => {
    render(<UserAvatar alias="Ana" avatarUrl="https://lh3.googleusercontent.com/aida-public/x" />);
    const src = screen.getByRole("img").getAttribute("src") ?? "";
    expect(src).toContain("api.dicebear.com");
    expect(src).toContain("seed=Ana");
  });

  it("deriva del alias cuando avatar_url es null", () => {
    render(<UserAvatar alias="Beto" avatarUrl={null} />);
    expect(screen.getByRole("img").getAttribute("src")).toContain("seed=Beto");
  });

  it("muestra la inicial del alias si la imagen falla", () => {
    render(<UserAvatar alias="Ana" />);
    fireEvent.error(screen.getByRole("img"));
    expect(screen.getByText("A")).toBeInTheDocument();
  });
});
