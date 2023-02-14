import TestNetwork from "./TestNetwork";
//localhost
export default class localhostNetworkDefaults extends TestNetwork {
    constructor() {
        super();

        this.ChainId = 31337;
        this.Name = "localhost";
        this.ChainName = 'localhost test';
        this.NativeCurrencyName = "Ethereum";
        this.NativeSymbol = "ETH";
        this.NativeDecimal = 18;
        this.RpcUrl = 'http://127.0.0.1:8545/';
        this.BlockExplorer = 'https://rinkeby.etherscan.io';
        this.ServerUrl = "http://localhost:10000";
	}



}

