import AUSDFund from "./AUSDFund";
import { BankRelationship } from "../../../dto/alpaca/BankRelationship";
export default class TransferNotified {
    aUsdFund: AUSDFund;
    constructor(aUsdFund: AUSDFund);
    show(bankRelationship: BankRelationship, amount: string): void;
}
