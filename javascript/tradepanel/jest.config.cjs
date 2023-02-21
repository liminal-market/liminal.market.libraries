module.exports = {
  preset: "jest-puppeteer",
  testMatch: ["**/?(*.)+(spec|test).[t]s"],
  testPathIgnorePatterns: ["/node_modules/", "app"], //
  setupFilesAfterEnv: ["<rootDir>/test/setup/jest.setup.ts"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  globalSetup: "./test/setup/jest.global-setup.ts", // will be called once before all tests are executed
  globalTeardown: "./test/setup/jest.global-teardown.ts", // will be called once after all tests are executed
};
