import TransfersListHtml from "../../../html/modal/Funding/TransfersList.html";
import HandlebarHelpers from "../../../util/HandlebarHelpers";
import UserService from "../../../services/backend/UserService";
import { TransferDirectionEnum } from "../../../enums/TransferDirectionEnum";
import { Transfer } from "../../../dto/alpaca/Transfer";
import WidgetGlobals from "src/WidgetGlobals";

export default class TransfersList {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async render(direction: TransferDirectionEnum, transfers: Transfer[]) {
    HandlebarHelpers.registerHelpers();

    let transfersTemplate =
      WidgetGlobals.HandlebarsInstance.compile(TransfersListHtml);

    return transfersTemplate({ Direction: direction, transfers: transfers });
  }

  public bindEvents() {
    let deleteTransfers = document.querySelectorAll(".deleteTransfer");
    for (let i = 0; i < deleteTransfers.length; i++) {
      deleteTransfers[i]?.addEventListener("click", async (evt) => {
        evt.preventDefault();

        if (
          !confirm("Are you sure you want to cancel this withdraw request?")
        ) {
          return;
        }

        let id = (deleteTransfers[i] as HTMLElement).dataset["id"];
        if (!id) return;

        let userService = new UserService();
        await userService.deleteTransfer(id).then(() => {
          let statusTd = document.getElementById("status_" + id);
          if (statusTd) {
            statusTd.innerText = "CANCELED";
          }
          let deleteTd = document.getElementById("delete_" + id);
          deleteTd?.remove();
        });
      });
    }
  }
}
