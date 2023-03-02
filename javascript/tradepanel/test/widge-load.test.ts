import { beforeAll, it, describe } from "@jest/globals";
import { setDefaultOptions } from "expect-puppeteer";
import { startServer } from "./server";
setDefaultOptions({ timeout: 10000 });

describe("On widget load", () => {
  beforeAll(async () => {
    // await startServer();
    await page.goto(`http://localhost:8000`);
  });

  it("should render aUSD button", async () => {
    await expect(page).toClick("a", { text: "aUSD" });
  });
  it("should render Select stock button", async () => {
    await expect(page).toClick("a", { text: "Select stock" });
  });
  it("should render Connect wallet button", async () => {
    await expect(page).toClick("button", { text: "Connect wallet" });
  });
  it("should render BuyInputs and SellInputs", async () => {
    await expect(page).toFill(".SellInputs .trade_input input", "100");
    await expect(page).toFill(".BuyInputs .trade_input input", "100");
  });
  it("should render Balance fields", async () => {
    await expect(page).toMatchElement(".SellInputs .balance", {
      text: "Balance : $0",
    });
    await expect(page).toMatchElement(".BuyInputs .balance", {
      text: "Balance :",
    });
  });
});
