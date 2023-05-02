import NetworkInfo from "../../networks/NetworkInfo";
import SwitchNetworkModal from "../../ui/modals/SwitchNetworkModal";
import MagicWeb3Connector from "../../wallet/MagicWeb3Connector";
import BaseService from "./BaseService";
import CookieHelper from "../../util/CookieHelper";
import User from "../../dto/User";
import LiminalMarket from "liminal.market";
import WidgetGlobals from "../../WidgetGlobals";

export default class AuthenticateService extends BaseService {
  public constructor() {
    super();
  }

  public static async enableWeb3() {
    if (WidgetGlobals.User.connector) return WidgetGlobals.User.connector;

    let magicWeb3Connector = new MagicWeb3Connector();
    let connector = await magicWeb3Connector.activate();
    WidgetGlobals.User.connector = connector;
    WidgetGlobals.User.magic = connector.magic;
    WidgetGlobals.User.provider = connector.provider;
    WidgetGlobals.User.ether = connector.ether;
    WidgetGlobals.User.signer = connector.signer;

    return connector;
  }

  public async logOut() {
    let cookieHelper = new CookieHelper(document);
    cookieHelper.deleteCookie("validate");
    if (!WidgetGlobals.User.ether) {
      let connection = await AuthenticateService.enableWeb3();
      WidgetGlobals.User.magic = connection.magic;
    }
    WidgetGlobals.User.magic?.connect.disconnect();
    WidgetGlobals.User = new User(null, "", WidgetGlobals.Network.ChainId, "");
  }

  public async login() {
    let connector = await AuthenticateService.enableWeb3();
    WidgetGlobals.User = new User(
      connector.provider,
      connector.account,
      connector.chainId,
      connector.ether
    );
    WidgetGlobals.User.magic = connector.magic;
    WidgetGlobals.User.signer = connector.signer;
    WidgetGlobals.User.isLoggedIn = true;
  }

  public async isAuthenticated() {
    let provider = await AuthenticateService.enableWeb3();
    let liminalMarket = await LiminalMarket.getInstance(
      provider.ether,
      "0x19d5ABE7854b01960D4911e6536b26F8A38C3a18"
    );
    if (liminalMarket.account.token == "") return false;
    WidgetGlobals.LiminalMarket = liminalMarket;
    WidgetGlobals.User.address = liminalMarket.account.address;
    WidgetGlobals.User.alpacaId = liminalMarket.account.brokerId;
    WidgetGlobals.User.chainId = liminalMarket.account.chainId;
    WidgetGlobals.User.token = liminalMarket.account.token;
    WidgetGlobals.User.isLoggedIn = true;
    console.log("liminalMarket.account.token", liminalMarket.account.token);

    return liminalMarket;
  }

  public async authenticateUser(
    enableWeb3Callback?: (walletConnectionInfo: any) => void,
    authenticatedCallback?: () => void
  ) {
    let connector = await AuthenticateService.enableWeb3();

    let liminalMarket = await this.isAuthenticated();
    if (!liminalMarket) {
      await this.logOut();
      return;
    }

    if (enableWeb3Callback && connector.provider) {
      enableWeb3Callback(connector.provider);
    }

    if (connector.chainId != WidgetGlobals.Network.ChainId) {
      let userNetwork = NetworkInfo.getNetworkInfoByChainId(connector.chainId);
      if (userNetwork) {
        NetworkInfo.setNetworkByChainId(connector.chainId);
      } else {
        let modal = new SwitchNetworkModal();
        modal.show();
        return;
      }
    }
    WidgetGlobals.User.setValidate(liminalMarket.account.token);
    if (authenticatedCallback) {
      authenticatedCallback();
    } else {
      location.reload();
    }
  }
}
