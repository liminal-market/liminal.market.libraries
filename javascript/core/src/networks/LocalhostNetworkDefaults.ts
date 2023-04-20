import TestNetwork from "./TestNetwork";
//localhost
export default abstract class LocalhostNetworkDefaults extends TestNetwork {
    protected constructor() {
        super();

        this.ChainId = LocalhostNetworkDefaults.ChainId;
        this.Name = "localhost";
        this.ChainName = 'localhost test';
        this.NativeCurrencyName = "Ethereum";
        this.NativeSymbol = "ETH";
        this.NativeDecimal = 18;
        this.RpcUrl = LocalhostNetworkDefaults.RpcUrl;
        this.BlockExplorer = 'https://rinkeby.etherscan.io';
        this.ServerUrl = "http://127.0.0.1:10000";
	}
    static override RpcUrl = 'http://127.0.0.1:8545/';

    static override ChainId = 31337;

}

