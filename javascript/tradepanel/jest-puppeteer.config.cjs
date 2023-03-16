module.exports = {
  launch: {
    dumpio: true,
    headless: false,
    ignoreHTTPSErrors: true,
    slowMo: 3000,
    args: ["--disable-infobars", "--allow-insecure-localhost"],
  },
  browserContext: "default",
};
