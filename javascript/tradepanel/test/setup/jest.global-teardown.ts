import fs from "fs";
import os from "os";
import path from "path";

const DIR = path.join(os.tmpdir(), "jest_puppeteer_global_setup");

module.exports = async function () {
  // clean-up the wsEndpoint file
  await fs.rmSync(DIR, { recursive: true, force: true });
};
