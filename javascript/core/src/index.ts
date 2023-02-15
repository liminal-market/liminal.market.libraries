import Network from "./networks/Network";
import {BigNumber, BigNumberish, ethers, Transaction, Wallet} from "ethers";
import HttpRequest from "./http/HttpRequest";
import NetworkType from "./networks/NetworkType";
import TestNetwork from "./networks/TestNetwork";
import {Account} from "./dto/Account";
import BlockchainError from "./error/BlockchainError";
import KycStatus from "./dto/KycStatus";
import AccountService from "./services/AccountService";
import BlockchainService from "./services/BlockchainService";

export default class LiminalMarketCore {
    httpRequest : HttpRequest;
    blockchainService : BlockchainService;
    accountService : AccountService;
    static Wallet : Wallet;
    static ServiceContractAddress : string;
    static Network : Network;
    static WalletAddress : string;
    static Bearer? : string;
    public static Instance : LiminalMarketCore;
    private constructor() {
        this.httpRequest = new HttpRequest();
        this.blockchainService = new BlockchainService();
        this.accountService = new AccountService();
    }

    public static async getInstance(wallet : any, serviceContractAddress? : string | undefined) {
        if (this.Instance) return this.Instance;

        let liminalMarketCore = new LiminalMarketCore();

        let network = await wallet.provider.detectNetwork();
        LiminalMarketCore.Network = NetworkType.getInstance(network.chainId) ?? new TestNetwork();
        if (LiminalMarketCore.Network.ChainId == 0) {
            throw new Error('Network is not supported. Using chainId ' + wallet.provider.chainId + '. Try switching to different Mumbai network');
        }

        LiminalMarketCore.ServiceContractAddress = serviceContractAddress ?? LiminalMarketCore.Network.EXTERNAL_SERVICE_CONTRACT_ADDRESS;
        if (!LiminalMarketCore.ServiceContractAddress) {
            throw new Error('ServiceContractAddress cannot be empty. You can get service contract address by signing contract at https://liminal.market/contract.html. No cost (except gas)')
        }
        LiminalMarketCore.Wallet = wallet;
        LiminalMarketCore.WalletAddress = wallet.address;
        this.Instance = liminalMarketCore;
        return liminalMarketCore;
    }


    /**
     * Get the balance of aUSD token.
     * @param {string} [address] - Optional. Uses the address from the provider is address is not provided
     */
    public async getAUSDBalance(address? : string | undefined) : Promise<BigNumber> {
        if (!address) address = LiminalMarketCore.WalletAddress;
        return await this.getBalance(LiminalMarketCore.Network.AUSD_ADDRESS, address)
    }

    /**
     * Get the balance of a security token.
     * @param {string} [address] - Optional. Uses the address from the provider is address is not provided
     */
    public async getSecurityTokenQuantity(symbol : string, address? : string | undefined) : Promise<BigNumberish> {
        if (!address) address = LiminalMarketCore.WalletAddress;
        let tokenAddress = await this.getSecurityTokenAddress(symbol);
        return await this.getBalance(tokenAddress, address);
    }

    /**
     * Return true if market is open, else false
     */
    public async isMarketOpen() : Promise<boolean> {
        return await this.httpRequest.get('isOpen');
    }

    /**
     * Create user on sandbox at the broker. This is for running on Mumbai testnet.
     *
     * @param {function} accountReadyEvent - function is called when the account is ready
     */
    public async createSandboxAccount(firstName : string, lastName : string, email : string,
                                      accountReadyEvent? : () => Promise<void> | undefined) : Promise<void> {
        return await this.accountService.createSandboxAccount(firstName, lastName, email, accountReadyEvent);
    }

    /**
     * Returns the status of the account. Most important is if KYC has been approved.
     * Trades cannot be executed if KYC is not valid.
     */
    public async isValidKyc() : Promise<KycStatus> {
        let accountService = new AccountService();
        return await accountService.isValidKyc();
    }

    /**
     * Get the balance of a token by tokenAddress and wallet address
     */
    public async getBalance(tokenAddress : string, address : string) {
        const contract = new ethers.Contract(tokenAddress, this.balanceOfAbi, LiminalMarketCore.Wallet.provider);
        return await contract['balanceOf'](address);
    }

    /**
     * Get the address of a security token (symbol)
     */
    public async getSecurityTokenAddress(symbol: string) : Promise<string> {
        const contract = new ethers.Contract(LiminalMarketCore.Network.LIMINAL_MARKET_ADDRESS, this.getSecurityTokenAbi, LiminalMarketCore.Wallet.provider);
        return await contract['getSecurityToken'](symbol);
    }

    /**
     * Send the command to buy a security token
     * @param {string}  symbol - Symbol of the security to buy, e.g. AAPL for Apple.
     * @param {string}  amount - Dollar amount in Wei, $100 is equal to 100 * 10**18. Buying for $54.32 would be 5432 * 10**16
     * @param {function} [orderExecutedEvent] - Optional. Listens for the orderExecuted event on chain, then calls your function.
     *
     * */
    public async buySecurityToken(symbol : string, amount : BigNumberish,
                                  orderExecutedEvent? : (recipient : string, symbol : string, tsl : BigNumberish, filledQty: BigNumberish, filledAvgPrice: BigNumberish, side : string, filledAt : BigNumberish, totalServiceFee: BigNumberish, aUsdBalance: BigNumberish, spender : string) => Promise<void> | undefined
    ) : Promise<Transaction> {
        return await this.blockchainService.executeOrder('buySecurityToken', symbol, amount, orderExecutedEvent);
    }

    /**
     * Send the command to sell a security token
     * @param {string}  symbol - Symbol of the security to buy, e.g. AAPL for Apple.
     * @param {string}  quantity - Quantity of shares to sell in Wei. Selling 10 shares would be 10 * 10**18. Selling 1.234 shares would be 123 * 10*15
     * @param {function} [orderExecutedEvent] - Optional. Listens for the orderExecuted event on chain, then calls your function.
     *
     * */
    public async sellSecurityToken(symbol : string, quantity : BigNumberish,
                                   orderExecutedEvent? : (recipient : string, symbol : string, tsl : BigNumberish, filledQty: BigNumberish, filledAvgPrice: BigNumberish, side : string, filledAt : BigNumberish, totalServiceFee: BigNumberish, aUsdBalance: BigNumberish, spender : string) => Promise<void> | undefined
    ) : Promise<Transaction> {
        return await this.blockchainService.executeOrder('sellSecurityToken', symbol, quantity, orderExecutedEvent);
    }

    /**
     Sends a login request to liminal.market. Returns Account object.
     **/
    public async login() : Promise<Account> {
        return await this.accountService.login();
    }

    /**
     Funds wallets sandbox account. There are limitation on how frequently you can fund your account.
     **/
    public async fundSandboxAccount(accountFunded : (obj : any) => Promise<void> | undefined) {
        return await this.accountService.fundSandboxAccount(accountFunded)
    }



    balanceOfAbi = [{
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }]
    getSecurityTokenAbi = [{
        "inputs": [
            {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            }
        ],
        "name": "getSecurityToken",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }]

}