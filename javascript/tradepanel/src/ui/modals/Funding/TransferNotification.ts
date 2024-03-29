import AUSDFund from "./AUSDFund";
import TransferNotificationHtml from "../../../html/modal/Funding/TransferNotification.html";
import { BankRelationship } from "../../../dto/alpaca/BankRelationship";
import { TransferDirectionEnum } from "../../../enums/TransferDirectionEnum";
import TransfersList from "./TransfersList";
import { Transfer } from "../../../dto/alpaca/Transfer";
import MoneyTransferred from "./FirstTransferSetup/MoneyTransferred";
import WidgetGlobals from "src/WidgetGlobals";

export default class TransferNotification {
  aUsdFund: AUSDFund;
  bankRelationship?: BankRelationship;
  private transfersList: TransfersList;
  moneyTransferred?: MoneyTransferred;

  constructor(aUsdFund: AUSDFund) {
    this.aUsdFund = aUsdFund;
    this.transfersList = new TransfersList();
  }

  public async show(bankRelationship: BankRelationship, transfers: Transfer[]) {
    this.bankRelationship = bankRelationship;

    let template = WidgetGlobals.HandlebarsInstance.compile(
      TransferNotificationHtml
    );
    let transfersListHtml = await this.transfersList.render(
      TransferDirectionEnum.Incoming,
      transfers
    );
    this.moneyTransferred = new MoneyTransferred(
      this.aUsdFund,
      this.bankRelationship
    );

    this.aUsdFund.modal.showModal(
      "Create transfer notification",
      template({
        moneyTransferred: this.moneyTransferred.render(),
        transfers: transfersListHtml,
      })
    );

    this.bindEvents();
  }

  public bindEvents() {
    this.moneyTransferred?.bindEvents();
    this.transfersList.bindEvents();

    let first_transfer_setup = document.getElementById("first_transfer_setup");
    first_transfer_setup?.addEventListener("click", (evt) => {
      evt.preventDefault();

      this.aUsdFund.firstTransferSetup.show(this.bankRelationship!);
    });
  }
}
