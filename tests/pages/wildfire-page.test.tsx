import { render, screen } from "@testing-library/react";
import WildfirePage from "@/app/(site)/wildfire/page";

describe("wildfire page", () => {
  const originalNowcastUrl = process.env.NEXT_PUBLIC_WILDFIRE_NOWCAST_URL;

  afterEach(() => {
    if (originalNowcastUrl === undefined) {
      delete process.env.NEXT_PUBLIC_WILDFIRE_NOWCAST_URL;
      return;
    }

    process.env.NEXT_PUBLIC_WILDFIRE_NOWCAST_URL = originalNowcastUrl;
  });

  it("renders a setup message when iframe URL is not configured", async () => {
    delete process.env.NEXT_PUBLIC_WILDFIRE_NOWCAST_URL;
    render(await WildfirePage());

    expect(screen.getByRole("heading", { name: "Wildfire Nowcast" })).toBeInTheDocument();
    expect(screen.getByText(/NEXT_PUBLIC_WILDFIRE_NOWCAST_URL/)).toBeInTheDocument();
  });

  it("renders wildfire iframe when external URL is configured", async () => {
    process.env.NEXT_PUBLIC_WILDFIRE_NOWCAST_URL = "http://localhost:8501";

    render(await WildfirePage());

    const iframe = screen.getByTitle("Wildfire Nowcast app");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", "http://localhost:8501/");
  });
});
