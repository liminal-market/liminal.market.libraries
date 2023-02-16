import {BigNumberish, ethers, Transaction} from "ethers";
import BlockchainError from "../error/BlockchainError";
import LiminalMarket from "../index";
import Abis from "../abis";

export default class BlockchainService {
    public async executeOrder(method : string, symbol : string, quantity : BigNumberish,
                               orderExecutedEvent? : (recipient : string, symbol : string, tsl : BigNumberish,
                                                      filledQty: BigNumberish, filledAvgPrice: BigNumberish, side : string,
                                                      filledAt : BigNumberish, totalServiceFee: BigNumberish,
                                                      aUsdBalance: BigNumberish, spender : string) => Promise<void> | undefined
    ) : Promise<Transaction> {
        const contract = new ethers.Contract(LiminalMarket.ServiceContractAddress, Abis.liminalMarketExternalServiceAbi, LiminalMarket.Wallet);
        if (orderExecutedEvent) {
            const liminalMarketContract = new ethers.Contract(LiminalMarket.Network.LIMINAL_MARKET_ADDRESS, Abis.liminalMarketAbi, LiminalMarket.Wallet);
            liminalMarketContract.on('OrderExecuted', (recipient: string, symbol: string, tsl: BigNumberish, filledQty: BigNumberish, filledAvgPrice: BigNumberish, side: string, filledAt: BigNumberish, totalServiceFee: BigNumberish, aUsdBalance: BigNumberish, spender: string) => {
                orderExecutedEvent(
                    recipient, symbol, tsl, filledQty, filledAvgPrice, side, filledAt, totalServiceFee, aUsdBalance, spender
                )
            })
        }
        try {
            let response = await contract[method](LiminalMarket.WalletAddress, symbol, quantity);

            return response;
        } catch (e : any) {
            throw new BlockchainError(e)
        }
    }


}