/**
 * @type {ICodeNarratorConfig}
 */
const config = {
    entry_file: "dist/index.js",
    cli_file: "",
    project_name: "liminal.market",
    config_files: [],
    repository_url: "https://github.com/liminal-market/liminal.market.libraries/tree/main/javascript/core",
    project_file: "package.json",
    source_path: "src",
    documentation_path: "./docs",
    test_path: "tests",
    gptModel: "gpt-4",
    readmeRoot: true,
    include: ["src/**/*"],
    exclude: ["/node_modules", ".env", "/.idea", "/.git", ".gitignore", "/.code-narrator", "/dist", "/build", "package-lock.json"],
    builders: [
        {
            name: "README",
            type: "README",
            template: "README",
            sidebarPosition: 1,
            args:
                {
                    entryFileContent: "content(package.json)"
                },
            files: [
                {
                    path: "./src/index.ts,0-80",
                    extract: "how to initiate class"
                }
            ]

        }, {
            name: "Account", type: "howto", template: "howto_account",
            files: [
                {
                    path: "./src/index.ts",
                    extract: "extract these functions createSandbox, hasAccount, kycStatus, fundSandboxAccount, getAUSDBalance"
                }
            ]
        },
        {
            name: "Market", type: "howto", template: "howto_market",
            files: [
                {
                    path: "./src/index.ts",
                    extract: "extract these functions positions, isMarketOpen, positions, getSymbols, getSecurityTokenQuantity"
                }
            ]
        },
        {
            name: "Trading", type: "howto", template: "howto_trade",
            files: [
                {
                    path: "./src/index.ts,150",
                    extract: "extract these functions buySecurityToken, sellSecurityToken, executeOrder"
                }
            ]
        }
    ]


}
module.exports = config;
