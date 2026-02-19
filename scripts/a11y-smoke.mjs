import { chromium } from "playwright";
import axe from "axe-core";

const urls = ["/", "/wildfire", "/methods", "/status"];
const baseUrl = "http://127.0.0.1:4173";

const browser = await chromium.launch();
const page = await browser.newPage();
let hasViolations = false;

for (const url of urls) {
  await page.goto(`${baseUrl}${url}`, { waitUntil: "networkidle" });
  await page.addScriptTag({ content: axe.source });
  const result = await page.evaluate(async () => {
    return window.axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] }
    });
  });

  if (result.violations.length > 0) {
    hasViolations = true;
    console.error(`A11y violations for ${url}:`);
    for (const violation of result.violations) {
      console.error(`- ${violation.id}: ${violation.help}`);
      for (const node of violation.nodes) {
        console.error(`  target: ${node.target.join(", ")}`);
      }
    }
  }
}

await browser.close();

if (hasViolations) {
  process.exit(1);
}
