import { render, screen } from "@testing-library/react";
import { Flame } from "lucide-react";
import { Card } from "@/components/ui/Card";

describe("Card", () => {
  it("renders as an accessible link", () => {
    render(
      <Card
        title="Wildfire Nowcast"
        description="Real-time detections"
        badge="live"
        icon={Flame}
        href="/wildfire"
      />
    );

    const link = screen.getByRole("link", { name: /Wildfire Nowcast/i });
    expect(link).toHaveAttribute("href", "/wildfire");
    expect(link.className).toContain("focus-visible:ring-2");
  });
});
