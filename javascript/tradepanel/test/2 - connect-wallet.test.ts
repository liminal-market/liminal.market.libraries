import { beforeAll, it, describe } from "@jest/globals";
import { setDefaultOptions } from "expect-puppeteer";
import { Frame } from "puppeteer";

setDefaultOptions({ timeout: 60000 });
describe("Connect Wallet Tests", () => {
  beforeAll(async () => {
    // await global.page.goto(`https://localhost`);
  });

  it(
    "should open metamask login",
    async () => {
      await new Promise((r) => setTimeout(r, 60000 * 10));
      // await global.metamask.approve(global.dappeteerPage);
      // await new Promise((r) => setTimeout(r, 15000));
      // await global.metamask.acceptAddToken();
      // await global.metamask.sign(global.dappeteerPage);
      // await new Promise((r) => setTimeout(r, 5000));
      // await expect(global.dappeteerPage.page).toClick("button", {
      //   text: "Connect wallet",
      // });
      //wait for iframe to load
      // let iframeHandle = await global.dappeteerPage.page.waitForSelector(
      //   "iframe[title='Secure Modal']"
      // );
      // const iframe = await iframeHandle.toElement("iframe");
      // await new Promise((r) => setTimeout(r, 5000));
      // const frame = await iframe.contentFrame();
      // await iframe.$eval("button", (el: any) => {
      //   console.log(el.innerText);
      //   return document;
      // });
      // .find(async (f: Frame) => {
      //   return (await f.title()) == "Secure Modal";
      // });
      // if (frame) {
      //   // Wait for h2 inside the iframe
      //   console.log("BBBBBBBBBBBBBBBBB");
      //   await frame.waitForSelector("#root");
      // } else {
      //   throw "iFrame not found";
      // }
      // await frame.$eval("button", (el: any) => {
      //   console.log(el.innerText);
      //   return document;
      // });
      // return video;
      // await global.dappeteerPage.page.frames()[1].$("image#image0_2201_32859");
      // console.log(
      //   await global.dappeteerPage.page.frames()[1].$("image#image0_2201_32859")
      // );
      // await frame.waitForSelector("image#image0_2201_32859");
      // await expect(frame).toClick("image#image0_2201_32859");
      // await frame.click("image#image0_2201_32859");
      // await new Promise((r) => setTimeout(r, 15000));
      // await page.bringToFront();
      // await page.screenshot({
      //   path: "screenshot.jpg",
      // });
    },
    60 * 1000 * 10
  );
});
