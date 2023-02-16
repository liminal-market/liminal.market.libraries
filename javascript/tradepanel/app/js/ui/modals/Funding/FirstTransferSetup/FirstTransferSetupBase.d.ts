import { BankRelationship } from "../../../../dto/alpaca/BankRelationship";
import AUSDFund from "../AUSDFund";
export default abstract class FirstTransferSetupBase {
    bankRelationship: BankRelationship;
    aUsdFund: AUSDFund;
    protected constructor(aUsdFund: AUSDFund, bankRelationship: BankRelationship);
    abstract show(): void;
    abstract bindEvents(): void;
    protected render(html: string): void;
}
