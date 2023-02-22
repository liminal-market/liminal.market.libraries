import { describe, expect, test } from "@jest/globals";

describe("Test the tradepanel rendering", () => {
  beforeAll(async () => {
    await page.goto(`http://localhost:8000`);
  });

  it('should open index page"', async () => {
    await expect(page.title()).resolves.toMatch("Test Index");
  });
});
