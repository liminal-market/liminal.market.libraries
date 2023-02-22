import KycStatus from "../dto/KycStatus";
import HttpRequest from "../http/HttpRequest";
import {Account} from "../dto/Account";
import LiminalMarket from "../index";

export default class AccountService {
    private signInMessage = "You are logging into Liminal.market.\n\nNonce:";
    httpRequest: HttpRequest;

    constructor() {
        this.httpRequest = new HttpRequest();
    }

    public async kycStatus(): Promise<KycStatus> {
        let result = (await this.httpRequest.getAuth("isValidKyc")) as KycStatus;
        if (!result.isValidKyc && result.status == 'ACTIVE') {
            result.message = 'Kyc status is being written down on blockchain. This can take few minutes. Ask again in few minutes'
        } else if (result.isValidKyc) {
            result.message = 'This account can execute trades';
        } else if (!result.isValidKyc) {
            result.message = 'KYC for this account has not been approved. Current status is ' + result.status;
        }
        if ((result as any).alpacaId) {
            result.brokerId = (result as any).alpacaId;
            delete (result as any).alpacaId;
        }
        return result;
    }

    public async login(): Promise<Account> {
        let account = await this.autoLogin();
        if (account) return account;

        let response = await this.httpRequest.post('/me/nonce', {address: LiminalMarket.WalletAddress})
        let signingMessage = this.signInMessage + response.nonce;

        let signedMessage = await LiminalMarket.Signer.signMessage(signingMessage)
        let loginResponse = await this.httpRequest.post('me/validate', {
            address: LiminalMarket.WalletAddress,
            signedMessage
        });

        account = loginResponse as Account;
        account.brokerId = loginResponse.alpacaId;
        delete (account as any).alpacaId;

        if (!account.address) {
            throw new Error('Login not successful:' + JSON.stringify(account))
        }
        LiminalMarket.Bearer = account.token;

        return account;
    }

    public async fundSandboxAccount(accountFunded?: (obj: any) => Promise<void> | undefined) {
        await this.httpRequest.listen('BalanceSet', async (obj: any) => {
            if (accountFunded) accountFunded(obj);
        })
        return await this.httpRequest.postAuth('/fundUser')
    }

    public async createSandboxAccount(firstName: string, lastName: string, email: string, accountReadyEvent?: (event : any) => Promise<void> | undefined): Promise<void> {
        let response = await this.httpRequest.postAuth("sandboxCreateAccount", {
            given_name: firstName,
            family_name: lastName,
            email_address: email
        });

        if (accountReadyEvent) {
            await this.httpRequest.listen('BalanceSet', async (event: any) => {
                accountReadyEvent(event);
            })
        }
        return response;
    }

    private async autoLogin() {
        try {
            let validate = document.cookie.match('(^|;)\\s*validate\\s*=\\s*([^;]+)')?.pop() || '';
            if (validate) {
                let obj = JSON.parse(atob(validate));
                LiminalMarket.Bearer = obj.token;
                let result = await this.httpRequest.post('/me/jwt');
                if (result.jwt) {
                    let account = {} as Account;
                    account.brokerId = result.alpacaId;
                    account.chainId = result.chainId;
                    account.token = obj.token;
                    account.address = result.address;
                    return account;
                }
            }
        } catch (e : any) {
            document.cookie = "validate=0; expires=Mon, 2 Dec 2020 12:00:00 UTC;path=/";
        }
        return;
    }
}