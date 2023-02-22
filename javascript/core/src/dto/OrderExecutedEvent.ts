import {BigNumberish} from "ethers";

export default interface OrderExecutedEvent {
    recipient: string;
    symbol: string;
    tsl: BigNumberish;
    filledQty: BigNumberish;
    filledAvgPrice: BigNumberish;
    side: string;
    filledAt: BigNumberish;
    totalServiceFee: BigNumberish;
    aUsdBalance: BigNumberish;
    spender: string;
    blockInfo : any
}