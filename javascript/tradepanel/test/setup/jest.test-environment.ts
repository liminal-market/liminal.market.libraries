import { readFileSync } from "fs";
import os from "os";
import path from "path";
import puppeteer from "puppeteer";
const NodeEnvironment = require("jest-environment-node").TestEnvironment;

const DIR = path.join(os.tmpdir(), "jest_puppeteer_global_setup");

class PuppeteerEnvironment extends NodeEnvironment {
  constructor(config: any) {
    super(config);
  }

  async setup() {
    await super.setup();
    // get the wsEndpoint
    const wsEndpoint = await readFileSync(path.join(DIR, "wsEndpoint"), "utf8");
    if (!wsEndpoint) {
      throw new Error("wsEndpoint not found");
    }

    // connect to puppeteer
    globalThis.dappeteerBrowser = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint,
    });
  }

  async teardown() {
    // if (globalThis.dappeteerBrowser) {
    //   globalThis.dappeteerBrowser.disconnect();
    // }
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }
}

module.exports = PuppeteerEnvironment;
