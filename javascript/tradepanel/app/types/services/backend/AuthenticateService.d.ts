import BaseService from "./BaseService";
import LiminalMarket from "liminal.market";
export default class AuthenticateService extends BaseService {
    constructor();
    static enableWeb3(): Promise<any>;
    logOut(): Promise<void>;
    login(): Promise<void>;
    isAuthenticated(): Promise<false | LiminalMarket>;
    authenticateUser(enableWeb3Callback?: (walletConnectionInfo: any) => void, authenticatedCallback?: () => void): Promise<void>;
}
