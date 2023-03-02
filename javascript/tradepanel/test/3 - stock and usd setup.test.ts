import { beforeAll, it, describe } from "@jest/globals";
import { setDefaultOptions } from "expect-puppeteer";
import { startServer } from "./server";
setDefaultOptions({ timeout: 10000 });

describe("On widget load", () => {
  beforeAll(async () => {
    // await startServer();
    await page.goto(`http://localhost:8000`);
  });

  it("Should ????", async () => {
    // await expect(page).toClick("a", { text: "aUSD" });
  });
});
