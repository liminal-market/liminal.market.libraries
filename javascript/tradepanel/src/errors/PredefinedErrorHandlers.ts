import InfoBar from "../ui/elements/InfoBar";
import { InfoBarType } from "../ui/elements/InfoBarType";
import WalletMissingHtml from "../html/modal/WalletMissing.html";
import Modal from "../ui/modals/Modal";
import SwitchNetworkModal from "../ui/modals/SwitchNetworkModal";
import UserService from "../services/backend/UserService";
import WidgetGlobals from "../WidgetGlobals";
import AuthenticateService from "../services/backend/AuthenticateService";

export default class PredefinedErrorHandlers {
  errorMessageMapping = new Map<string, any>();
  SentLoginRequest =
    "We have sent request to you wallet to login. Open your wallet to login";

  constructor() {
    this.errorMessageMapping.set("chain not supported", () => {
      let div =
        'Network is not supported. <a href="" id="switchNetworkLink">Click me to switch to supported network</a>';

      InfoBar.show(div, InfoBarType.Warning, 120);

      let switchNetworkLink = document.getElementById("switchNetworkLink");
      switchNetworkLink?.addEventListener("click", (evt) => {
        evt.preventDefault();
        let modal = new SwitchNetworkModal();
        modal.show();
      });
    });
    this.errorMessageMapping.set(
      "already processing eth_requestaccounts",
      this.SentLoginRequest
    );
    this.errorMessageMapping.set(
      "request of type 'wallet_requestPermissions' already pending",
      this.SentLoginRequest
    );
    this.errorMessageMapping.set(
      "already has been called, but is not finished yet",
      this.SentLoginRequest
    );
    this.errorMessageMapping.set(
      "request is already in progress",
      this.SentLoginRequest
    );
    this.errorMessageMapping.set("web3 instance", () => {
      let elements = document.querySelectorAll(
        ".liminal_market_connect_wallet"
      );
      if (elements.length > 0) {
        elements[0].dispatchEvent(new MouseEvent("click"));
        return;
      }
    });
    this.errorMessageMapping.set("user rejected the request", async () => {
      let authenticationService = new AuthenticateService();
      await authenticationService.logOut();
      window.location.reload();
    });
    this.errorMessageMapping.set("Non ethereum enabled browser", () => {
      let modal = new Modal();
      let template =
        WidgetGlobals.HandlebarsInstance.compile(WalletMissingHtml);
      modal.showModal("New to blockchain?", template(null), false, () => {
        //window.location.reload();
      });
    });
  }

  public handle(message: string) {
    let handled = false;
    this.errorMessageMapping.forEach((value, key) => {
      if (!handled && message.toLowerCase().indexOf(key.toLowerCase()) != -1) {
        if (typeof value == "string") {
          InfoBar.show(value.toString(), InfoBarType.Warning, 10);
        } else {
          value();
        }
        handled = true;
        return handled;
      }
    });
    return handled;
  }
}
