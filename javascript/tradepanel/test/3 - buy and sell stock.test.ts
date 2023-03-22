import { beforeAll, it, describe, beforeEach } from "@jest/globals";
import { setDefaultOptions } from "expect-puppeteer";

setDefaultOptions({ timeout: 60000 });

describe("Buys and sell transactions", () => {
  beforeEach(async () => {
    await global.page.goto(`https://localhost`);
    await global.page.bringToFront();
  }, 60000);

  it(
    "Buy Stock",
    async () => {
      await expect(global.page).toClick("a#BuySelectStock");
      await expect(global.page).toClick("td.security_information strong", {
        text: "Microsoft Corporation Common Stock",
      });
      await expect(global.page).toMatchElement("a#BuySelectStock", {
        text: "MSFT",
      });
      await expect(global.page).toFill(".SellInputs .trade_input input", "1");
      await new Promise((r) => setTimeout(r, 5000));
      await expect(global.page).toClick("button#liminal_market_execute_order", {
        text: "Execute trade",
      });

      try {
        await new Promise((r) => setTimeout(r, 5000));
        console.log("Sign..."); //sometimes it needs to be signed twice
        await global.metamask.sign();
        console.log("Sign..."); //sometimes it needs to be signed twice
        await new Promise((r) => setTimeout(r, 5000));
        await global.metamask.sign();
      } catch (error) {}

      await expect(global.page).toMatchElement(
        "dialog#liminal_market_modal_div span",
        {
          text: "Trade executed",
          timeout: 60000 * 3,
        }
      );
      await new Promise((r) => setTimeout(r, 30000));
    },
    60000 * 5
  );

  it(
    "Sell Stock",
    async () => {
      await expect(global.page).toClick("a#SellSelectStock");
      await expect(global.page).toClick("td.security_information strong", {
        text: "Microsoft Corporation Common Stock",
      });
      await expect(global.page).toMatchElement("a#SellSelectStock", {
        text: "MSFT",
      });
      await expect(global.page).toFill(
        ".SellInputs .trade_input input",
        "0.001"
      );
      await new Promise((r) => setTimeout(r, 5000));
      await expect(global.page).toClick("button#liminal_market_execute_order", {
        text: "Execute trade",
      });

      try {
        await new Promise((r) => setTimeout(r, 5000));
        console.log("Sign..."); //sometimes it needs to be signed twice
        await global.metamask.sign();
        console.log("Sign..."); //sometimes it needs to be signed twice
        await new Promise((r) => setTimeout(r, 5000));
        await global.metamask.sign();
      } catch (error) {}

      await expect(global.page).toMatchElement(
        "dialog#liminal_market_modal_div span",
        {
          text: "Trade executed",
          timeout: 60000 * 3,
        }
      );
      await new Promise((r) => setTimeout(r, 30000));
    },
    60000 * 5
  );
});
