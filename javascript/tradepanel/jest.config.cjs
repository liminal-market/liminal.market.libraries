/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testMatch: ["**/?(*.)+(spec|test).[t]s"],
  testPathIgnorePatterns: ["/node_modules/", "app"], //
  setupFilesAfterEnv: [
    "expect-puppeteer",
    "<rootDir>/test/setup/jest.setup-after-env.ts",
  ],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  globalSetup: "<rootDir>/test/setup/jest.global-setup.ts",
  globalTeardown: "<rootDir>/test/setup/jest.global-teardown.ts",
  testEnvironment: "<rootDir>/test/setup/jest.test-environment.ts",
  testTimeout: 15000,
};
