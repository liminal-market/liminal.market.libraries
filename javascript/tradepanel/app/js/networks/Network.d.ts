export default class Network {
    ServerUrl: string;
    AppId: string;
    ChainId: number;
    Name: string;
    ChainName: string;
    NativeCurrencyName: string;
    NativeSymbol: string;
    NativeDecimal: number;
    RpcUrl: string;
    BlockExplorer: string;
    TestNetwork: boolean;
    FaucetUrl: string;
    BuyUrl: string;
    constructor();
    get ChainIdHex(): string;
    addNetworkToWallet(): Promise<void>;
    hasEnoughNativeTokens(): Promise<boolean>;
}
