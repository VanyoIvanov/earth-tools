import { expect, test } from "@playwright/test";

test("navigates across primary routes", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Tool Directory" })).toBeVisible();

  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Methods" }).click();
  await expect(page.getByRole("heading", { name: "Methods & Transparency" })).toBeVisible();

  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Status" }).click();
  await expect(page.getByRole("heading", { name: "System Status" })).toBeVisible();

  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Wildfire Tool" }).click();
  await expect(page.getByRole("heading", { name: "Wildfire Nowcast" }).first()).toBeVisible();
  await expect(page.getByTestId("map-legend")).toBeVisible();

  const mapVisible = await page.getByTestId("wildfire-map").isVisible();
  if (!mapVisible) {
    await expect(page.getByText(/Map rendering/i)).toBeVisible();
  }
});

test("mobile menu navigation works", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog", { name: "Site navigation" })).toBeVisible();

  await page
    .getByRole("navigation", { name: "Mobile primary" })
    .getByRole("link", { name: "Status" })
    .click();
  await expect(page.getByRole("heading", { name: "System Status" })).toBeVisible();
});
