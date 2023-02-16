import Network from "./networks/Network";
import {BigNumber, BigNumberish, ethers, Transaction, Wallet} from "ethers";
import HttpRequest from "./http/HttpRequest";
import NetworkType from "./networks/NetworkType";
import TestNetwork from "./networks/TestNetwork";
import {Account} from "./dto/Account";
import KycStatus from "./dto/KycStatus";
import AccountService from "./services/AccountService";
import BlockchainService from "./services/BlockchainService";
import Abis from "./abis";

export default class LiminalMarket {
    httpRequest : HttpRequest;
    blockchainService : BlockchainService;
    accountService : AccountService;
    account : Account;
    static Wallet : Wallet;
    static ServiceContractAddress : string;
    static Network : Network;
    static WalletAddress : string;
    static Bearer? : string;
    public static Instance : LiminalMarket;
    private constructor() {
        this.httpRequest = new HttpRequest();
        this.blockchainService = new BlockchainService();
        this.accountService = new AccountService();
        this.account = {} as Account;
    }

    public static async getInstance(wallet : any, serviceContractAddress? : string | undefined) {
        if (this.Instance) return this.Instance;

        let liminalMarket = new LiminalMarket();

        let network = await wallet.provider.detectNetwork();
        LiminalMarket.Network = NetworkType.getInstance(network.chainId) ?? new TestNetwork();
        if (LiminalMarket.Network.ChainId == 0) {
            throw new Error('Network is not supported. Using chainId ' + wallet.provider.chainId + '. Try switching to different network, e.g. Mumbai');
        }

        LiminalMarket.ServiceContractAddress = serviceContractAddress ?? LiminalMarket.Network.EXTERNAL_SERVICE_CONTRACT_ADDRESS;
        if (!LiminalMarket.ServiceContractAddress) {
            throw new Error('ServiceContractAddress cannot be empty. You can get service contract address by signing contract at https://liminal.market/contract.html. No cost (except gas)')
        }
        LiminalMarket.Wallet = wallet;
        LiminalMarket.WalletAddress = wallet.address;

        liminalMarket.account = await liminalMarket.accountService.login();

        this.Instance = liminalMarket;

        return liminalMarket;
    }

    /**
     * Return true if market is open, else false
     */
    public async isMarketOpen() : Promise<boolean> {
        return await this.httpRequest.get('isOpen');
    }

    /**
     * Returns true if the user has been created at the broker, false if he does not exist at broker
     * If it returns false, you can call createSandboxAccount to create the user at broker.
     */
    public hasAccount() : boolean {
        return this.account.brokerId !== undefined;
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
     * Funds wallets sandbox account. There are limitation on how frequently you can fund your account.
     **/
    public async fundSandboxAccount(accountFunded : (obj : any) => Promise<void> | undefined) {
        return await this.accountService.fundSandboxAccount(accountFunded)
    }

    /**
     * Get the balance of aUSD token.
     * @param {string} [address] - Optional. Uses the address from the provider is address is not provided
     */
    public async getAUSDBalance(address? : string | undefined) : Promise<BigNumber> {
        if (!address) address = LiminalMarket.WalletAddress;
        return await this.getBalance(LiminalMarket.Network.AUSD_ADDRESS, address)
    }

    /**
     * Return all symbols available in the system.
     */
    public async getSymbols() {
        return await this.httpRequest.get('https://liminal.market/securities')
    }

    /**
     * Returns the position wallet address has. It is also possible to query any wallet address
     * @param address
     */
    public async getPositions(address? : string) {
        if (!address) address = LiminalMarket.WalletAddress;
        return await this.httpRequest.get('positions', {address:address})
    }



    /**
     * Get the balance of a security token.
     * @param {string} [address] - Optional. Uses the address from the provider is address is not provided
     */
    public async getSecurityTokenQuantity(symbol : string, address? : string | undefined) : Promise<BigNumberish> {
        if (!address) address = LiminalMarket.WalletAddress;
        let tokenAddress = await this.getSecurityTokenAddress(symbol);
        return await this.getBalance(tokenAddress, address);
    }
    /**
     * Get the balance of a token by tokenAddress and wallet address
     */
    public async getBalance(tokenAddress : string, address : string) {
        const contract = new ethers.Contract(tokenAddress, Abis.balanceOfAbi, LiminalMarket.Wallet.provider);
        return await contract['balanceOf'](address);
    }

    /**
     * Get the address of a security token (symbol)
     */
    public async getSecurityTokenAddress(symbol: string) : Promise<string> {
        const contract = new ethers.Contract(LiminalMarket.Network.LIMINAL_MARKET_ADDRESS, Abis.getSecurityTokenAbi, LiminalMarket.Wallet.provider);
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




}