import Network from "../networks/Network";
export default class WalletHelper {
    static addTokenFallbackLoaded?: boolean;
    constructor();
    getAUsdAsset(): {
        Logo: string;
    };
    addTokenToWallet(address: string, symbol: string, fallbackTimeout: () => void): Promise<any>;
    static isWebview(): boolean;
    isMagic(): Promise<boolean>;
    switchNetwork(network: Network): Promise<boolean>;
    static hideMagicWallet(): void;
}
