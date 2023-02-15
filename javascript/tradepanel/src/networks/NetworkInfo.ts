import localhostNetwork from './localhost-network';
import mumbaiNetwork from './mumbai-network';
import Network from "./Network";
import CookieHelper from "../util/CookieHelper";
import polygonNetwork from "./polygon-network";
import {NetworkType} from "./NetworkType";


const networkInfos = [localhostNetwork, mumbaiNetwork];


export default class NetworkInfo {
    private static instance: Network;

    private constructor() {
    }

    public static getInstance(): Network {
        if (NetworkInfo.instance) return NetworkInfo.instance;

        NetworkInfo.instance = this.getNetworkInfo();
        return NetworkInfo.instance;
    }

    public static loadNetwork(networkName: string): void {
        NetworkInfo.instance = this.getNetworkInfo(networkName);
        this.setNetworkByChainId(NetworkInfo.instance.ChainId)
    }

    public static setNetworkByName(name: string) {
        let network = this.getNetworkByName(name);
        this.setNetworkByChainId(network.ChainId);
    }

    public static setNetworkByChainId(chainId: number): void {
        let network = this.getNetworkInfoByChainId(chainId);

        if (network) {
            NetworkInfo.instance = network;
            console.log('setCookie', network.Name);
            let cookieHelper = new CookieHelper(document);
            cookieHelper.setCookie('network', network.Name);
        }
    }

    public static getNetworks(networkType?: number): Array<Network> {
        let networks = new Array<Network>();
        let isLocalhost = window.location.host.indexOf('localhost') != -1;
        networkInfos.forEach(networkInfoType => {
            let tmp = new networkInfoType();
            if (!isLocalhost && tmp.Name == "localhost") return;

            if (networkType === undefined) {
                networks.push(tmp);
            } else {
                if (networkType == NetworkType.Mainnet && !tmp.TestNetwork) {
                    networks.push(tmp);
                } else if (networkType == NetworkType.Testnet && tmp.TestNetwork) {
                    networks.push(tmp);
                }
            }
        });
        return networks;
    }

    public static getNetworkInfoByChainId(chainId: number): Network | undefined {

        let networkInfo: Network | undefined;

        networkInfos.forEach(networkInfoType => {
            let tmp = new networkInfoType();
            if (tmp.ChainId == chainId) {
                networkInfo = tmp;
            }
        });
        return networkInfo;

    }

    private static getNetworkInfo(networkName?: string): Network {
        let cookieHelper = new CookieHelper(document);

        // @ts-ignore
        if (window.ethereum && window.ethereum.chainId) {
            // @ts-ignore
            let networkInfo = this.getNetworkNameByChainIdHex(window.ethereum.chainId);
            if (networkInfo) {
                return networkInfo;
            }

        }

        if (!networkName) networkName = cookieHelper.getCookieValue('network');
        if (!networkName) networkName = 'mumbai';

        let networkInfo = this.getNetworkByName(networkName)
        return networkInfo
    }

    private static getNetworkNameByChainIdHex(chainIdHex: string) {
        let networkInfo: Network | undefined = undefined;
        networkInfos.forEach(networkInfoType => {
            let tmp = new networkInfoType();
            if (tmp.ChainIdHex == chainIdHex) {
                networkInfo = tmp;
            }
        });
        return networkInfo;
    }

    private static getNetworkByName(networkName: string) {
        let networkInfo = null;
        networkInfos.forEach(networkInfoType => {
            let tmp = new networkInfoType();
            if (tmp.Name == networkName) {
                networkInfo = tmp;
            }
        });
        if (networkInfo) return networkInfo;

        console.error("Network '" + networkName + "' could not be found. Defaulting to Mumbai network.");
        return new mumbaiNetwork();
    }
}





