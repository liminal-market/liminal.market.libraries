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
    EXTERNAL_SERVICE_CONTRACT_ADDRESS = '';

    static RpcUrl = '';

    protected constructor() {
    }

    public get ChainIdHex() {
        return '0x' + this.ChainId.toString(16)
    }

}