import { render, screen } from "@testing-library/react";
import { Badge, badgeVariantClasses } from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders with the expected variant classes", () => {
    render(<Badge variant="live">Live</Badge>);

    const badge = screen.getByText("Live");
    expect(badge).toHaveClass("text-orange-300");
    expect(badge).toHaveClass("bg-orange-500/10");
  });

  it("exports a complete variant map", () => {
    expect(Object.keys(badgeVariantClasses)).toEqual([
      "default",
      "live",
      "beta",
      "experimental"
    ]);
  });
});
