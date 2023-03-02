import { startServer } from "../server";
const { setup: setupPuppeteer } = require("jest-environment-puppeteer");

module.exports = async function globalSetup() {
  await setupPuppeteer();
  console.log("Loading server...");
  await startServer();
};
