import UserService from "../../services/backend/UserService";
import ProviderInfo from "../../wallet/ProviderInfo";
import WalletHelper from "../../util/WalletHelper";
import AuthenticateService from "../../services/backend/AuthenticateService";
type ListenerAction = (...args: Array<any>) => void;
export default class UserInfo {
    authenticationService: AuthenticateService;
    userService: UserService;
    providerInfo: ProviderInfo;
    walletHelper: WalletHelper;
    walletLoaded: boolean;
    static onUserLoggedIn: Array<ListenerAction>;
    constructor(providerInfo: ProviderInfo);
    render(elementId: string): Promise<void>;
    private listenForWalletChanges;
    private loadUserMenuUI;
    private bindUserActionEvents;
    private bindEvents;
    private loadIfTestNetwork;
    private ifTradePage;
}
export {};
