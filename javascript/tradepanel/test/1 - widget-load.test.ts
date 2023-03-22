import { beforeAll, it, describe } from "@jest/globals";
import { setDefaultOptions } from "expect-puppeteer";

setDefaultOptions({ timeout: 60000 });

describe("On widget load test", () => {
  beforeAll(async () => {
    await global.page.goto(`https://localhost`);
    await global.page.bringToFront();
  });

  it(
    "should render aUSD button",
    async () => {
      await expect(global.page).toClick("a", { text: "aUSD" });
    },
    60 * 1000 * 10
  );
  it("should render Select stock button", async () => {
    await expect(global.page).toClick("a", {
      text: "Select stock",
    });
  }, 60000);
  it("should render BuyInputs and SellInputs", async () => {
    await expect(global.page).toFill(".SellInputs .trade_input input", "100");
    await expect(global.page).toFill(".BuyInputs .trade_input input", "100");
  }, 60000);
  it("should render Balance fields", async () => {
    await expect(global.page).toMatchElement(".SellInputs .balance", {
      text: "Balance : $0",
    });
    await expect(global.page).toMatchElement(".BuyInputs .balance", {
      text: "Balance :",
    });
  }, 60000);
  it("should render Action button", async () => {
    await expect(global.page).toClick("button", {
      text: "Type in quantity",
    });
  }, 60000);
});
