import Network from "./Network";
export default class NetworkInfo {
    private static instance;
    private constructor();
    static getInstance(): Network;
    static loadNetwork(networkName: string): void;
    static setNetworkByName(name: string): void;
    static setNetworkByChainId(chainId: number): void;
    static getNetworks(networkType?: number): Array<Network>;
    static getNetworkInfoByChainId(chainId: number): Network | undefined;
    private static getNetworkInfo;
    private static getNetworkNameByChainIdHex;
    private static getNetworkByName;
}
