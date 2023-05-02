import { BigNumber } from "ethers";
export default class AUsdBalance {
    constructor();
    static forceLoadAUSDBalanceUI(): Promise<void>;
    loadAUSDBalanceUI(): Promise<void>;
    private bindEvents;
    updateUIBalance(aUsdValueWei: BigNumber): void;
}
