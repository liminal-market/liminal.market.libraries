const { teardown: teardownPuppeteer } = require("jest-environment-puppeteer");
/**
 * Sets up the environment for running tests with Jest
 */
export default async function globalTearDown(globalConfig: any) {
  await teardownPuppeteer();
}
