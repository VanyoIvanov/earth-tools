import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SiteHeader } from "@/components/layout/SiteHeader";

const mockedUsePathname = vi.fn(() => "/");

vi.mock("next/navigation", () => ({
  usePathname: () => mockedUsePathname()
}));

describe("SiteHeader", () => {
  beforeEach(() => {
    mockedUsePathname.mockReturnValue("/");
  });

  it("marks the active route", () => {
    mockedUsePathname.mockReturnValue("/methods");
    render(<SiteHeader />);

    const active = screen.getByRole("link", { name: "Methods" });
    expect(active).toHaveAttribute("aria-current", "page");
  });

  it("opens and closes the mobile menu", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const openButton = screen.getByRole("button", { name: "Open menu" });
    await user.click(openButton);

    expect(screen.getByRole("dialog", { name: "Site navigation" })).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: "Close menu" });
    await user.click(closeButton);

    expect(screen.queryByRole("dialog", { name: "Site navigation" })).not.toBeInTheDocument();
  });
});
