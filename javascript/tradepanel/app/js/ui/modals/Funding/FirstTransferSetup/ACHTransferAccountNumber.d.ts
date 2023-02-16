import FirstTransferSetupBase from "./FirstTransferSetupBase";
import { BankRelationship } from "../../../../dto/alpaca/BankRelationship";
import AUSDFund from "../AUSDFund";
export default class ACHTransferAccountNumber extends FirstTransferSetupBase {
    constructor(aUsdFund: AUSDFund, bankRelationship: BankRelationship);
    show(): void;
    bindEvents(): void;
}
