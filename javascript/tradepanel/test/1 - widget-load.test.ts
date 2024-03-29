import { beforeAll, it, describe } from "@jest/globals";
import { setDefaultOptions } from "expect-puppeteer";

setDefaultOptions({ timeout: global.actionTimeout });

describe("On widget load test", () => {
  beforeAll(async () => {
    await global.page.goto(`https://localhost`);
    await global.page.bringToFront();
    await new Promise((r) => setTimeout(r, 1000));
  });

  it(
    "should render Action button",
    async () => {
      await expect(global.page).toMatchElement("button", {
        text: "Type in quantity",
      });
    },
    global.defaultScenatioTimeout
  );
  it(
    "should render aUSD button",
    async () => {
      await expect(global.page).toClick("a", { text: "aUSD" });
    },
    global.defaultScenatioTimeout
  );
  it(
    "should render Select stock button",
    async () => {
      await expect(global.page).toClick("a", {
        text: "Select stock",
      });
    },
    global.defaultScenatioTimeout
  );
  it(
    "should render BuyInputs and SellInputs",
    async () => {
      await expect(global.page).toFill(".SellInputs .trade_input input", "100");
      await expect(global.page).toFill(".BuyInputs .trade_input input", "100");
    },
    global.defaultScenatioTimeout
  );
  it(
    "should render Balance fields",
    async () => {
      await expect(global.page).toMatchElement(".SellInputs .balance", {
        text: /Balance :.*/,
      });
      await expect(global.page).toMatchElement(".BuyInputs .balance", {
        text: /Balance :.*/,
      });
    },
    global.defaultScenatioTimeout
  );
});
