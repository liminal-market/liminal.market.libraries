import AUSDFund from "./AUSDFund";
import TransferInfoHtml from "../../../html/modal/Funding/TransferInfo.html";
import { BankRelationship } from "../../../dto/alpaca/BankRelationship";
import WidgetGlobals from "src/WidgetGlobals";

export default class TransferNotified {
  aUsdFund: AUSDFund;

  constructor(aUsdFund: AUSDFund) {
    this.aUsdFund = aUsdFund;
  }

  public show(bankRelationship: BankRelationship, amount: string) {
    let template = WidgetGlobals.HandlebarsInstance.compile(TransferInfoHtml);
    let obj = {
      amount,
      account_number: bankRelationship.alpaca_account_number,
      wire: bankRelationship.transfer_type == "wire",
    };
    this.aUsdFund.modal.showModal("Transfer information", template(obj));
  }
}
