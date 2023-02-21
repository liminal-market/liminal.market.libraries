import { describe, expect, test } from "@jest/globals";

describe("Sample Google test", () => {
  beforeAll(async () => {
    await page.goto("https://google.com");
  });

  it('should be titled "Google"', async () => {
    await expect(page.title()).resolves.toMatch("Google");
  });
});
