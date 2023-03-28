import { mkdirSync, writeFileSync } from "fs";
import os from "os";
import path from "path";
import { startServer } from "../server";
import puppeteer from "puppeteer";
const dappeteer = require("@chainsafe/dappeteer");

const DIR = path.join(os.tmpdir(), "jest_puppeteer_global_setup");

module.exports = async function () {
  console.log("Loading server...");
  await startServer();
  try {
    console.log("Initializing metamask browser...");
    const browser = await dappeteer.launch(puppeteer, {
      metamaskVersion: "10.15",
      headless: false,
      slowMo: 100,
      dumpio: true,
      ignoreHTTPSErrors: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--disable-infobars",
        "--allow-insecure-localhost",
        "--disable-web-security",
        "--ignore-certificate-errors",
        "--disable-features=IsolateOrigins,site-per-process",
      ],
    });
    const metamask = await dappeteer.setupMetamask(browser, {
      seed: "element ritual intact tumble cement voice sauce trick present skill yard link",
      password: "1q2w3e4r",
    });

    console.log("Configuring metamask...");
    await metamask.addNetwork({
      networkName: "Mumbai Testnet",
      rpc: "https://rpc-mumbai.maticvigil.com/",
      chainId: "80001",
      symbol: "MATIC",
    });

    const page = await browser.newPage();
    await page.goto("https://localhost");

    console.log("Approving metamask...");
    await new Promise((r) => setTimeout(r, 5000));
    await metamask.approve();

    console.log("Sign...");
    await new Promise((r) => setTimeout(r, 5000));
    await metamask.sign();

    try {
      console.log("Sign..."); //sometimes it needs to be signed twice
      await new Promise((r) => setTimeout(r, 5000));
      await metamask.sign();
    } catch (error) {}

    global.browser = browser;
    global.metamask = metamask;
    global.page = page;
    global.actionTimeout = 60000 * 3;
    global.defaultScenatioTimeout = 60000 * 5;

    // use the file system to expose the wsEndpoint for TestEnvironments
    await mkdirSync(DIR, { recursive: true });
    await writeFileSync(path.join(DIR, "wsEndpoint"), browser.wsEndpoint());

    // await new Promise((r) => setTimeout(r, 6000 * 60 * 60));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
