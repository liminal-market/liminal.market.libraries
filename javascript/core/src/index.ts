import Network from "./networks/Network";
import {BigNumberish, ethers, Transaction} from "ethers";

export default class LiminalMarketCore {
    static Provider : any;
    static Signer : any;
    static ServiceContractAddress : string;
    static Network : Network;
    static WalletAddress : string;
    static Bearer? : string;
    private signInMessage: any = "You are logging into Liminal.market.\n\nNonce:";

    constructor(provider : any, serviceContractAddress? : string | undefined) {
        LiminalMarketCore.Provider = provider;
        LiminalMarketCore.Signer = provider.getSigner()
        LiminalMarketCore.WalletAddress = provider.selectedAddress;

        LiminalMarketCore.Network = Network.getInstance(provider) ?? new Network();
        LiminalMarketCore.ServiceContractAddress = serviceContractAddress ?? LiminalMarketCore.Network.EXTERNAL_SERVICE_CONTRACT_ADDRESS;
        if (LiminalMarketCore.Network.ChainId == 0) {
           throw new Error('Network is not supported. Using chainId ' + provider.chainId + '. Try switching to different Mumbai network');
        }
    }


    /**
     * Get the balance of aUSD token.
     * @param {string} [address] - Optional. Uses the address from the provider is address is not provided
     */
    public async getAUSDBalance(address? : string | undefined) : Promise<BigNumberish> {
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
     * Create user on sandbox at the broker. This is for running on Mumbai testnet.
     *
     * @param {function} accountReadyEvent - function is called when the account is ready
     */
    public async createSandboxAccount(firstName : string, lastName : string, email : string, accountReadyEvent? : () => void | undefined) : Promise<void> {

        await this.post("sandboxCreateAccount", {
            given_name: firstName,
            family_name: lastName,
            email_address: email
        });

        if (accountReadyEvent) {
            let eventSource = new EventSource(this.getUrl('/listenForChanges?jwt=' + LiminalMarketCore.Bearer));
            eventSource.onmessage = async (e: any) => {
                let obj = this.getEventSourceObject(e);
                if (obj.method == 'BalanceSet') {
                    accountReadyEvent();
                }
            };
        }
    }

    /**
     * Get the balance of a token by tokenAddress and wallet address
     */
    public async getBalance(tokenAddress : string, address : string) {
        const contract = new ethers.Contract(tokenAddress, this.balanceOfAbi, LiminalMarketCore.Provider);
        return await contract['balanceOf'](address);
    }

    /**
     * Get the address of a security token (symbol)
     */
    public async getSecurityTokenAddress(symbol: string) : Promise<string> {
        const contract = new ethers.Contract(LiminalMarketCore.Network.LIMINAL_MARKET_ADDRESS, this.getSecurityTokenAbi, LiminalMarketCore.Provider);
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
                                  orderExecutedEvent? : (recipient : string, symbol : string, tsl : BigNumberish, filledQty: BigNumberish, filledAvgPrice: BigNumberish, side : string, filledAt : BigNumberish, totalServiceFee: BigNumberish, aUsdBalance: BigNumberish, spender : string) => void | undefined
    ) : Promise<Transaction> {
        return await this.executeOrder('buySecurityToken', symbol, amount, orderExecutedEvent);
    }

    /**
     * Send the command to sell a security token
     * @param {string}  symbol - Symbol of the security to buy, e.g. AAPL for Apple.
     * @param {string}  quantity - Quantity of shares to sell in Wei. Selling 10 shares would be 10 * 10**18. Selling 1.234 shares would be 123 * 10*15
     * @param {function} [orderExecutedEvent] - Optional. Listens for the orderExecuted event on chain, then calls your function.
     *
     * */
    public async sellSecurityToken(symbol : string, quantity : BigNumberish,
                                   orderExecutedEvent? : (recipient : string, symbol : string, tsl : BigNumberish, filledQty: BigNumberish, filledAvgPrice: BigNumberish, side : string, filledAt : BigNumberish, totalServiceFee: BigNumberish, aUsdBalance: BigNumberish, spender : string) => void | undefined
    ) : Promise<Transaction> {
        return await this.executeOrder('sellSecurityToken', symbol, quantity, orderExecutedEvent);
    }

    private async executeOrder(method : string, symbol : string, quantity : BigNumberish,
                               orderExecutedEvent? : (recipient : string, symbol : string, tsl : BigNumberish, filledQty: BigNumberish, filledAvgPrice: BigNumberish, side : string, filledAt : BigNumberish, totalServiceFee: BigNumberish, aUsdBalance: BigNumberish, spender : string) => void
    ) : Promise<Transaction> {
        const contract = new ethers.Contract(LiminalMarketCore.ServiceContractAddress, this.liminalMarketExternalServiceAbi, LiminalMarketCore.Signer);
        if (orderExecutedEvent) {
            contract.on('OrderExecuted', (recipient: string, symbol: string, tsl: BigNumberish, filledQty: BigNumberish, filledAvgPrice: BigNumberish, side: string, filledAt: BigNumberish, totalServiceFee: BigNumberish, aUsdBalance: BigNumberish, spender: string) => {
                orderExecutedEvent(
                    recipient, symbol, tsl, filledQty, filledAvgPrice, side, filledAt, totalServiceFee, aUsdBalance, spender
                )
            })
        }
        return await contract[method](symbol, quantity);
    }


    public async login() : Promise<any> {
        let response = await this.post('/me/nonce', {address: LiminalMarketCore.WalletAddress})
        let signingMessage = this.signInMessage + response.nonce;

        let signedMessage = await LiminalMarketCore.Provider.getSigner().signMessage(signingMessage)
        let loginResponse = await this.post('me/validate', {address: LiminalMarketCore.WalletAddress, signedMessage});

        if (!loginResponse.address) {
            throw new Error('Login not successful:' + JSON.stringify(loginResponse))
        }
        LiminalMarketCore.Bearer = loginResponse.token;

        return loginResponse;
    }

    private async post(path: string, data?: any) {
        if (!LiminalMarketCore.Bearer) {
            await this.login();
        }

        if (!data) {
            data = {}
        }
        data.chainId = LiminalMarketCore.Network?.ChainId;
        data.address = LiminalMarketCore.WalletAddress;

        let response = await fetch(this.getUrl(path),
            {
                method: 'POST',
                headers: {
                    'Authentication': 'Bearer: ' + LiminalMarketCore.Bearer,
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(data),
            })
        let obj = await response.json();
        if (obj.success) return obj.result;

        throw new Error(obj.error);
    }

    private getUrl(path : string) {
        if (!LiminalMarketCore.Network) {
            throw new Error('No network available. User connected to unsupported network')
        }

        if (!path.startsWith('/')) path = '/' + path;
        return LiminalMarketCore.Network.ServerUrl + path
    }

    private getEventSourceObject(e: any) {
        let data = e.data;
        console.log(e);
        if (!data || data == 'ok') return;

        try {
            return JSON.parse(data);
        } catch (error : any) {
            throw new Error('Error parsing event source object:' + e)
        }
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
    liminalMarketExternalServiceAbi = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "walletAddress",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "symbol",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "buySecurityToken",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "walletAddress",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "symbol",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "quantity",
                    "type": "uint256"
                }
            ],
            "name": "sellSecurityToken",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "symbol",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "tsl",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "filledQty",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "filledAvgPrice",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "side",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "filledAt",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "serviceFee",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "aUsdBalance",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "OrderExecuted",
            "type": "event"
        }
    ]


}