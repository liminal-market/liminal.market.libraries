import AUSDFund from "../AUSDFund";
import { BankRelationship } from "../../../../dto/alpaca/BankRelationship";
export default class FirstTransferSetup {
    aUsdFund: AUSDFund;
    bankRelationship?: BankRelationship;
    constructor(aUsdFund: AUSDFund);
    show(bankRelationship: BankRelationship): void;
}
