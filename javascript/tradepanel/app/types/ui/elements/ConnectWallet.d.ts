import ProviderInfo from "../../wallet/ProviderInfo";
export default class ConnectWallet {
    static Provider: string;
    providerInfo: ProviderInfo;
    constructor();
    renderButton(elementId: string): void;
    connectWallet(button: HTMLElement): Promise<void>;
    private web3EnabledResult;
}
