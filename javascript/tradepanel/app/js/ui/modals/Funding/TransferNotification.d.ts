import AUSDFund from "./AUSDFund";
import { BankRelationship } from "../../../dto/alpaca/BankRelationship";
import { Transfer } from "../../../dto/alpaca/Transfer";
import MoneyTransferred from "./FirstTransferSetup/MoneyTransferred";
export default class TransferNotification {
    aUsdFund: AUSDFund;
    bankRelationship?: BankRelationship;
    private transfersList;
    moneyTransferred?: MoneyTransferred;
    constructor(aUsdFund: AUSDFund);
    show(bankRelationship: BankRelationship, transfers: Transfer[]): Promise<void>;
    bindEvents(): void;
}
