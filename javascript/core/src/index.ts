import Network from "./networks/Network";
import {BigNumber, BigNumberish, ethers, Signer, Wallet} from "ethers";
import HttpRequest from "./http/HttpRequest";
import NetworkType from "./networks/NetworkType";
import TestNetwork from "./networks/TestNetwork";
import {Account} from "./dto/Account";
import KycStatus from "./dto/KycStatus";
import AccountService from "./services/AccountService";
import BlockchainService from "./services/BlockchainService";
import Abis from "./abis";
import {Provider} from "@ethersproject/abstract-provider";
import ExecuteOrderResult from "./dto/ExecuteOrderResult";
import Listener from "./services/Listener";
export default class LiminalMarket {
    httpRequest : HttpRequest;
    blockchainService : BlockchainService;
    accountService : AccountService;
    account : Account;
    static Provider : any;
    static Signer : any;
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

    public static async getInstanceUsingPrivateKey(privateKey : string, chainId : number, serviceContractAddress? : string | undefined){
        LiminalMarket.Network = NetworkType.getInstance(chainId) ?? new TestNetwork();
        if (LiminalMarket.Network.ChainId == 0) {
            throw new Error('Network is not supported. Using chainId ' + chainId + '. Try switching to different network, e.g. Mumbai');
        }
        let provider = new ethers.providers.JsonRpcProvider(LiminalMarket.Network.RpcUrl);
        let wallet = new Wallet(privateKey, provider)
        return await this.getInstanceByWallet(wallet, serviceContractAddress);
    }

    public static async getInstance(provider? : ethers.providers.JsonRpcProvider | undefined, serviceContractAddress? : string | undefined) {
        if (!provider) {
            // @ts-ignore
            provider = new ethers.providers.Web3Provider(window.ethereum);
        }

        let signer = await provider.getSigner();
        if (!signer) {
            throw new Error('Provider needs to have a signer.')
        }

        let address = await signer.getAddress()
        if (!address) {
            throw new Error('No account could be access')
        }

        let network = await provider.getNetwork()
        return await this.load(address, provider, signer, network.chainId, serviceContractAddress)
    }


    public static async getInstanceByWallet(wallet : Wallet, serviceContractAddress? : string | undefined) {
        if (this.Instance) return this.Instance;

        if (!wallet) {
            throw new Error('Provider cannot be null')
        }
        let chainId = await wallet.getChainId();

        return await this.load(wallet.address,  wallet.provider,  wallet as any as Signer, chainId, serviceContractAddress);
    }

    private static async load(walletAddress : string, provider : Provider, signer : Signer, chainId : number, serviceContractAddress : string | undefined) {
        LiminalMarket.Provider = provider;
        LiminalMarket.Signer = signer;

        LiminalMarket.Network = NetworkType.getInstance(chainId) ?? new TestNetwork();
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

        let liminalMarket = new LiminalMarket();
        liminalMarket.account = await liminalMarket.accountService.login();

        this.Instance = liminalMarket;

        return liminalMarket;
    }

    public static get Listener() : Listener {
        return Listener;
    }

    /**
     * Return true if market is open, else false
     */
    public async isMarketOpen() : Promise<boolean> {
        return (await this.httpRequest.get('isOpen')).marketIsOpen;
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
                                      accountReadyEvent? : () => Promise<void> | undefined) : Promise<string> {
        return await this.accountService.createSandboxAccount(firstName, lastName, email, accountReadyEvent);
    }

    /**
     * Returns the status of the account. Most important is if KYC has been approved.
     * Trades cannot be executed if KYC is not valid.
     */
    public async kycStatus() : Promise<KycStatus> {
        let accountService = new AccountService();
        return await accountService.kycStatus();
    }

    /**
     * Funds wallets sandbox account. There are limitation on how frequently you can fund your account.
     **/
    public async fundSandboxAccount(accountFunded? : (obj : any) => Promise<void> | undefined) {
        return await this.accountService.fundSandboxAccount(accountFunded)
    }

    /**
     * Get the balance of aUSD token.
     * @param {string} [address] - Optional. Uses the address from the provider is address is not provided
     */
    public async getAUSDBalance(address? : string | undefined) : Promise<BigNumber> {
        if (!address) address = LiminalMarket.WalletAddress;
        return await this.getSecurityTokenQuantity(LiminalMarket.Network.AUSD_ADDRESS, address)
    }

    /**
     * Return all symbols available in the system.
     */
    public async getSymbols() {
        return await this.httpRequest.get('https://app.liminal.market/securities/securities.json')
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
    public async getSecurityTokenQuantity(symbolOrAddress : string, address? : string | undefined) : Promise<BigNumber> {
        if (!address) address = LiminalMarket.WalletAddress;
        if (symbolOrAddress.indexOf('0x') == -1) {
            symbolOrAddress = await this.getSecurityTokenAddress(symbolOrAddress);
            if (symbolOrAddress == ethers.constants.AddressZero) return BigNumber.from(0);
        }

        const contract = new ethers.Contract(symbolOrAddress, Abis.BalanceOfAbi, LiminalMarket.Provider);
        return await contract['balanceOf']!(address);
    }

    /**
     * Get the address of a security token (symbol)
     */
    public async getSecurityTokenAddress(symbol: string) : Promise<string> {
        const contract = new ethers.Contract(LiminalMarket.Network.LIMINAL_MARKET_ADDRESS, Abis.LiminalMarketAbi, LiminalMarket.Provider);
        return await contract['getSecurityToken']!(symbol);
    }


    /**
     * Send the command to buy a security token
     * @param {string}  symbol - Symbol of the security to buy, e.g. AAPL for Apple.
     * @param {string}  amount - Dollar amount in Wei, $100 is equal to 100 * 10**18. Buying for $54.32 would be 5432 * 10**16
     * @param {function} [orderExecutedEvent] - Optional. Listens for the orderExecuted event on chain, then calls your function.
     *
     * */
    public async buySecurityToken(symbol : string, amount : BigNumberish) : Promise<ExecuteOrderResult> {
        return await this.blockchainService.executeOrder('buy', symbol, amount);
    }

    /**
     * Send the command to sell a security token
     * @param {string}  symbol - Symbol of the security to buy, e.g. AAPL for Apple.
     * @param {string}  quantity - Quantity of shares to sell in Wei. Selling 10 shares would be 10 * 10**18. Selling 1.234 shares would be 123 * 10*15
     * @param {function} [orderExecutedEvent] - Optional. Listens for the orderExecuted event on chain, then calls your function.
     *
     * */
    public async sellSecurityToken(symbol : string, quantity : BigNumberish) : Promise<ExecuteOrderResult> {
        return await this.blockchainService.executeOrder('sell', symbol, quantity);
    }

    /**
     * Send the command to execute order depending on side (buy or sell)
     * @param {string}  symbol - Symbol of the security to buy, e.g. AAPL for Apple.
     * @param {string}  quantity - Quantity of shares to sell in Wei. Selling 10 shares would be 10 * 10**18. Selling 1.234 shares would be 123 * 10*15
     * @param {function} [orderExecutedEvent] - Optional. Listens for the orderExecuted event on chain, then calls your function.
     *
     * */
    public async executeOrder(side : string, symbol : string, quantity : BigNumberish) : Promise<ExecuteOrderResult> {
        if (side != 'buy' && side != 'sell') {
            throw new Error('side [' + side + '] is not valid. You can only set "buy" or "sell"');
        }
        return await this.blockchainService.executeOrder(side, symbol, quantity);
    }




}