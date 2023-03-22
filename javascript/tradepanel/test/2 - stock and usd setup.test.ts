import { beforeAll, it, describe } from "@jest/globals";
import { setDefaultOptions } from "expect-puppeteer";

setDefaultOptions({ timeout: 60000 });

describe("Check stock and usd selections", () => {
  beforeAll(async () => {
    await global.page.goto(`https://localhost`);
    await global.page.bringToFront();
  }, 60000);

  it("Select Stock", async () => {
    await expect(global.page).toClick("a#BuySelectStock");
    await expect(global.page).toClick("td.security_information strong", {
      text: "Microsoft Corporation Common Stock",
    });
    await expect(global.page).toMatchElement("a#BuySelectStock", {
      text: "MSFT",
    });
  }, 60000);

  it("Switch Between Stock and USD", async () => {
    await expect(global.page).toClick("a#SellSelectStock");
    await expect(global.page).toClick("td.security_information strong", {
      text: "Microsoft Corporation Common Stock",
    });
    await expect(global.page).toMatchElement("a#BuySelectStock", {
      text: "aUSD",
    });
  }, 60000);
});