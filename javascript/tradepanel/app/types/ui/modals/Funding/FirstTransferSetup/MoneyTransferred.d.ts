import FirstTransferSetupPage from "./FirstTransferSetupBase";
import { BankRelationship } from "../../../../dto/alpaca/BankRelationship";
import AUSDFund from "../AUSDFund";
export default class MoneyTransferred extends FirstTransferSetupPage {
    constructor(aUsdFund: AUSDFund, bankRelationship: BankRelationship);
    show(): void;
    render(): string;
    bindEvents(): void;
}
