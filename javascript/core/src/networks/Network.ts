import mumbaiNetwork from "./mumbaiNetwork";
import localhostNetwork from "./localhostNetwork";

export default class Network {
    ServerUrl = "";
    ChainId = 0;
    Name = "";
    ChainName = '';
    NativeCurrencyName = "";
    NativeSymbol = "";
    NativeDecimal = 18;
    RpcUrl = '';
    BlockExplorer = '';
    TestNetwork = true;
    FaucetUrl = '';
    BuyUrl = '';
    KYC_ADDRESS = "";
    AUSD_ADDRESS = "";
    LIMINAL_MARKET_ADDRESS = "";
    MARKET_CALENDAR_ADDRESS = "";
    LM_ADDRESS = '';
    SERVICE_CONTRACT_ADDRESS = '';
    EXTERNAL_SERVICE_CONTRACT_ADDRESS = '';
    static networkInfos : any = [localhostNetwork, mumbaiNetwork];

    constructor() {
    }

    public get ChainIdHex() {
        return '0x' + this.ChainId.toString(16)
    }

    public static getInstance(provider : any) {
        const chainId = parseInt(provider.chainId, 16);
        return this.getNetworkByChainId(chainId);
    }

    private static getNetworkByChainId(chainId: number) {
        let networkInfo: Network | undefined = undefined;
        this.networkInfos.forEach((networkInfoType : any) => {
            let tmp = new networkInfoType();
            if (tmp.ChainId == chainId) {
                networkInfo = tmp;
            }
        });
        return networkInfo;
    }
}