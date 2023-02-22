export default abstract class Network {
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
    NO_FEE_CONTRACT_ADDRESS = "0x0d82EF4e843c1ca7bd2aa9B2Aa4239bd70b306df";


    static RpcUrl = '';
    static ChainId = 0;

    protected constructor() {
    }

    public get ChainIdHex() {
        return '0x' + this.ChainId.toString(16)
    }

}