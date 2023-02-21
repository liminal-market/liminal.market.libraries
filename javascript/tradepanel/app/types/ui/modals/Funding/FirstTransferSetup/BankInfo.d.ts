import { BankRelationship } from "../../../../dto/alpaca/BankRelationship";
import FirstTransferSetupBase from "./FirstTransferSetupBase";
import AUSDFund from "../AUSDFund";
export default class BankInfo extends FirstTransferSetupBase {
    constructor(aUsdFund: AUSDFund, bankRelationship: BankRelationship);
    show(): void;
    bindEvents(): void;
}
