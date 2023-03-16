// import { beforeAll, it, describe } from "@jest/globals";
// import { setDefaultOptions } from "expect-puppeteer";

// setDefaultOptions({ timeout: 10000 });

// describe("On widget load test", () => {
//   beforeAll(async () => {
//     await global.dappeteerPage.goto(`https://localhost`);
//   });

//   it(
//     "should render aUSD button",
//     async () => {
//       await expect(global.dappeteerPage.page).toClick("a", { text: "aUSD" });
//     },
//     60 * 1000 * 10
//   );
//   it("should render Select stock button", async () => {
//     await expect(global.dappeteerPage.page).toClick("a", {
//       text: "Select stock",
//     });
//   });
//   it("should render Connect wallet button", async () => {
//     await expect(global.dappeteerPage.page).toClick("button", {
//       text: "Connect wallet",
//     });
//   });
//   it("should render BuyInputs and SellInputs", async () => {
//     await expect(global.dappeteerPage.page).toFill(
//       ".SellInputs .trade_input input",
//       "100"
//     );
//     await expect(global.dappeteerPage.page).toFill(
//       ".BuyInputs .trade_input input",
//       "100"
//     );
//   });
//   it("should render Balance fields", async () => {
//     await expect(global.dappeteerPage.page).toMatchElement(
//       ".SellInputs .balance",
//       {
//         text: "Balance : $0",
//       }
//     );
//     await expect(global.dappeteerPage.page).toMatchElement(
//       ".BuyInputs .balance",
//       {
//         text: "Balance :",
//       }
//     );
//   });
// });
