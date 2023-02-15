import {BigNumberish, ethers, Transaction} from "ethers";
import BlockchainError from "../error/BlockchainError";
import LiminalMarketCore from "../index";

export default class BlockchainService {
    public async executeOrder(method : string, symbol : string, quantity : BigNumberish,
                               orderExecutedEvent? : (recipient : string, symbol : string, tsl : BigNumberish,
                                                      filledQty: BigNumberish, filledAvgPrice: BigNumberish, side : string,
                                                      filledAt : BigNumberish, totalServiceFee: BigNumberish,
                                                      aUsdBalance: BigNumberish, spender : string) => Promise<void> | undefined
    ) : Promise<Transaction> {
        const contract = new ethers.Contract(LiminalMarketCore.ServiceContractAddress, this.liminalMarketExternalServiceAbi, LiminalMarketCore.Wallet);
        if (orderExecutedEvent) {
            const liminalMarketContract = new ethers.Contract(LiminalMarketCore.Network.LIMINAL_MARKET_ADDRESS, this.liminalMarketAbi, LiminalMarketCore.Wallet);
            liminalMarketContract.on('OrderExecuted', (recipient: string, symbol: string, tsl: BigNumberish, filledQty: BigNumberish, filledAvgPrice: BigNumberish, side: string, filledAt: BigNumberish, totalServiceFee: BigNumberish, aUsdBalance: BigNumberish, spender: string) => {
                orderExecutedEvent(
                    recipient, symbol, tsl, filledQty, filledAvgPrice, side, filledAt, totalServiceFee, aUsdBalance, spender
                )
            })
        }
        try {
            let response = await contract[method](LiminalMarketCore.WalletAddress, symbol, quantity);

            return response;
        } catch (e : any) {
            throw new BlockchainError(e)
        }
    }

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
        }
    ]
    liminalMarketAbi = [{
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
    }]

}