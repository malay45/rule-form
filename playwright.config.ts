import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",

  reporter: [
    ["json", { outputFile: "playwright-report/report.json" }],
    ["list"],
  ],

  use: {
    headless: true,
  },
});
