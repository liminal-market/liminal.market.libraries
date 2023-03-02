/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testMatch: ["**/?(*.)+(spec|test).[t]s"],
  testPathIgnorePatterns: ["/node_modules/", "app"], //
  setupFilesAfterEnv: [
    "expect-puppeteer",
    "<rootDir>/test/setup/jest.setup.ts",
  ],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  globalSetup: "<rootDir>/test/setup/jest.global-setup.ts",
  globalTeardown: "<rootDir>/test/setup/jest.global-teardown.ts",
  testEnvironment: "jest-environment-puppeteer",
  testTimeout: 15000,
};
