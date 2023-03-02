import AuthenticateService from "../../services/backend/AuthenticateService";
import ConnectWallet from "./ConnectWallet";
import UserInfo from "./UserInfo";
import LoadingHelper from "../../util/LoadingHelper";
import WidgetGlobals from "../../WidgetGlobals";

export default class Header {
  public async load() {
    this.loadImage();
    await this.showUserOptions();
  }

  public async loadImage() {
    let header = document.querySelector("body > header") as HTMLElement;
    if (!header) return;

    let random = Math.floor(Math.random() * 10);

    header.style.backgroundImage = "url(/img/header/" + random + ".jpg)";
  }

  public async showUserOptions() {
    let user_header_info = document.getElementById("user_header_info");
    if (user_header_info) user_header_info.innerHTML = "Loading wallet..";
    LoadingHelper.setLoading(user_header_info);

    let authenticationService = new AuthenticateService();
    let isAuthenticated = await authenticationService.isAuthenticated();

    if (!isAuthenticated) {
      let connectWallet = new ConnectWallet();
      connectWallet.renderButton("user_header_info");

      return;
    }

    let userInfo = new UserInfo(WidgetGlobals.User.providerInfo);
    await userInfo.render("user_header_info");
  }
}
