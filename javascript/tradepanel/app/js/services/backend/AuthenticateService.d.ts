import BaseService from "./BaseService";
export default class AuthenticateService extends BaseService {
    constructor();
    static enableWeb3(): Promise<any>;
    logOut(): Promise<void>;
    login(): Promise<void>;
    isAuthenticated(): Promise<boolean>;
    authenticateUser(enableWeb3Callback?: (walletConnectionInfo: any) => void, authenticatedCallback?: () => void): Promise<void>;
}
