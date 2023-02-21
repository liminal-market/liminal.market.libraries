import TestNetwork from "./TestNetwork";

export default class MumbaiNetworkDefaults extends TestNetwork {
    constructor() {
        super();

        this.ChainId = 80001;
        this.Name = "mumbai";
        this.ChainName = 'Polygon Mumbai';
        this.NativeCurrencyName = "Matic";
        this.NativeSymbol = "MATIC";
        this.NativeDecimal = 18;
        this.BlockExplorer = 'https://mumbai.polygonscan.com/';
        this.FaucetUrl = 'https://faucet.polygon.technology/';
        this.BuyUrl = 'https://www.moonpay.com/buy/matic';
        this.RpcUrl = MumbaiNetworkDefaults.RpcUrl;
    }

    static override RpcUrl = 'https://rpc-mumbai.matic.today/';

}

