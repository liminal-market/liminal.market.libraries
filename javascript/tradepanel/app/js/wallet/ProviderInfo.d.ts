import { WalletType } from "../enums/WalletType";
export default class ProviderInfo {
    web3Provider: any;
    ProviderName: string;
    WalletName: string;
    WalletUrl: string;
    WalletType: WalletType;
    UserAddress: string;
    InternalWallet: boolean;
    static Instance: ProviderInfo;
    constructor(web3Provider: any);
    private loadMetamask;
    private loadWalletConnect;
    private loadCustom;
    private loadMagicConnect;
}
