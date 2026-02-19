import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import WildfirePage from "@/app/(site)/wildfire/page";

vi.mock("next/dynamic", () => ({
  default: (
    _: unknown,
    options?: {
      loading?: () => ReactElement;
    }
  ) => {
    const DynamicComponent = () => options?.loading?.() ?? <div data-testid="dynamic-map-placeholder" />;
    return DynamicComponent;
  }
}));

describe("wildfire page", () => {
  it("renders sidebar content and map placeholder", async () => {
    render(await WildfirePage());

    expect(screen.getByText("Wildfire model details")).toBeInTheDocument();
    expect(screen.getAllByText("How It Works").length).toBeGreaterThan(0);
  });
});
