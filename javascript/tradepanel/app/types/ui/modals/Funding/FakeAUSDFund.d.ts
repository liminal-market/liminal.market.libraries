import Modal from "../Modal";
import BigNumber from "bignumber.js";
export default class FakeAUSDFund {
    currentBalance: BigNumber;
    modal: Modal;
    constructor();
    showAUSDFund(): void;
    static writingToChain(): void;
    showAUSDFakeFund(): void;
    private loadAUSDBalance;
    private showCopyField;
    private errorWhileFunding;
}
