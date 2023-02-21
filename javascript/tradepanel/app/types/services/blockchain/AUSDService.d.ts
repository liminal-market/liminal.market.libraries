import BigNumber from "bignumber.js";
import BlockchainService from "./BlockchainService";
type ListenerAction = (...args: Array<any>) => void;
export default class AUSDService extends BlockchainService {
    private static AUSDInfo;
    static lastUpdate?: Date;
    private static aUSDAmount?;
    static onAUsdLoad: Array<ListenerAction>;
    constructor();
    getAUSDBalanceOf(ethAddress: string): Promise<BigNumber>;
    transfer(symbolAddress: string, qty: BigNumber): Promise<any>;
    getAUsdAbi(): Promise<any>;
}
export {};
