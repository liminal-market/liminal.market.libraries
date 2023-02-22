import TestNetwork from "./TestNetwork";

export default class MumbaiNetworkDefaults extends TestNetwork {
    constructor() {
        super();

        this.Name = "mumbai";
        this.ChainName = 'Polygon Mumbai';
        this.NativeCurrencyName = "Matic";
        this.NativeSymbol = "MATIC";
        this.NativeDecimal = 18;
        this.BlockExplorer = 'https://mumbai.polygonscan.com/';
        this.FaucetUrl = 'https://faucet.polygon.technology/';
        this.BuyUrl = 'https://www.moonpay.com/buy/matic';

        this.ChainId = MumbaiNetworkDefaults.ChainId;
        this.RpcUrl = MumbaiNetworkDefaults.RpcUrl;
    }

    static override RpcUrl = 'https://polygon-mumbai.g.alchemy.com/v2/FILTBk8FT9RzcRVxkMXIg7Ipl8JCNdK2';
    static override ChainId = 80001;
}

