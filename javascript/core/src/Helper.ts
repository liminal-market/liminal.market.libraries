import NetworkType from "./networks/NetworkType";
import MumbaiNetwork from "./networks/MumbaiNetwork";
import {Provider} from "@ethersproject/abstract-provider";
import {Signer} from "ethers";
import LiminalMarket from "./index";

export default class Helper {
    static AddressZero = '0x0000000000000000000000000000000000000000';

    public static setCookie(name: string, value: string) {
        if (typeof document == 'undefined') return;
        let date = new Date();
        this.deleteCookie(name);
        document.cookie = name + "=" + value + "; expires=Mon, 2 Dec " + (date.getFullYear() + 1) + " 12:00:00 UTC;path=/;SameSite=Strict;";
    }

    public static getCookieValue(name: string) {
        if (typeof document == 'undefined') return;
        return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';
    }

    public static deleteCookie(name: string) {
        if (typeof document == 'undefined') return;
        document.cookie = name + "=0; expires=Mon, 2 Dec 2020 12:00:00 UTC;path=/";
    }

    public static async loadLiminalMarket(walletAddress: string, provider: Provider, signer: Signer, chainId: number, serviceContractAddress: string | undefined) {
        LiminalMarket.Provider = provider;
        LiminalMarket.Signer = signer;

        LiminalMarket.Network = NetworkType.getInstance(chainId) ?? new MumbaiNetwork();
        if (LiminalMarket.Network.ChainId == 0) {
            throw new Error('Network is not supported. Using chainId ' + chainId + '. Try switching to different network, e.g. Mumbai');
        }

        LiminalMarket.ServiceContractAddress = (serviceContractAddress) ? serviceContractAddress : LiminalMarket.Network.NO_FEE_SERVICE_CONTRACT_ADDRESS;

        if (!LiminalMarket.ServiceContractAddress) {
            throw new Error('ServiceContractAddress cannot be empty. You can get service contract address by signing contract at https://liminal.market/contract. No cost (except gas)')
        }

        if (LiminalMarket.ServiceContractAddress == LiminalMarket.Network.NO_FEE_SERVICE_CONTRACT_ADDRESS) {
            console.debug('No service contract address set. You will not receive any service fee. Check out https://liminal.market/contract/')
        }

        LiminalMarket.WalletAddress = walletAddress;
    }
}