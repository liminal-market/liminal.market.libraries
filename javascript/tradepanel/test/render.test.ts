import { describe, expect, test } from "@jest/globals";

describe("Test the tradepanel rendering", () => {
  beforeAll(async () => {
    await page.goto(`file://${process.cwd()}/test/index.html`);
  });

  it('should open index page"', async () => {
    await expect(page.title()).resolves.toMatch("Test Index");
  });
});
