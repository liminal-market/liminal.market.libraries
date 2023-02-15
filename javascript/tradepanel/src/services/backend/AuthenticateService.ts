import NetworkInfo from "../../networks/NetworkInfo";
import SwitchNetworkModal from "../../ui/modals/SwitchNetworkModal";
import MagicWeb3Connector from "../../wallet/MagicWeb3Connector";
import BaseService from "./BaseService";
import CookieHelper from "../../util/CookieHelper";
import User from "../../dto/User";
import { showBar } from "../../util/Helper";
import WalletHelper from "../../util/WalletHelper";
import TradePanelWidget from "../../TradePanelWidget";

export default class AuthenticateService extends BaseService {
  public constructor() {
    super();
  }

  public static async enableWeb3() {
    if (TradePanelWidget.User.connector) return TradePanelWidget.User.connector;

    let magicWeb3Connector = new MagicWeb3Connector();
    let connector = await magicWeb3Connector.activate();
    TradePanelWidget.User.connector = connector;
    TradePanelWidget.User.magic = connector.magic;
    TradePanelWidget.User.provider = connector.provider;
    TradePanelWidget.User.ether = connector.ether;
    TradePanelWidget.User.signer = connector.signer;

    return connector;
  }

  public async logOut() {
    let cookieHelper = new CookieHelper(document);
    cookieHelper.deleteCookie("validate");
    if (!TradePanelWidget.User.ether) {
      let connection = await AuthenticateService.enableWeb3();
      TradePanelWidget.User.magic = connection.magic;
    }
    TradePanelWidget.User.magic.connect.disconnect();
    TradePanelWidget.User = new User(
      null,
      "",
      TradePanelWidget.Network.ChainId,
      ""
    );
  }

  public async login() {
    let connector = await AuthenticateService.enableWeb3();
    TradePanelWidget.User = new User(
      connector.provider,
      connector.account,
      connector.chainId,
      connector.ether
    );
    TradePanelWidget.User.magic = connector.magic;
    TradePanelWidget.User.signer = connector.signer;
    TradePanelWidget.User.isLoggedIn = true;
  }

  public async isAuthenticated() {
    let cookieHelper = new CookieHelper();
    let validate = cookieHelper.getCookieValue("validate");
    if (!validate) return false;

    try {
      let obj = JSON.parse(atob(validate));
      TradePanelWidget.User.token = obj.token;

      let result = await this.post("/me/jwt");
      if (!result.jwt) {
        await this.logOut();
        return false;
      }

      await AuthenticateService.enableWeb3();

      TradePanelWidget.User.address = result.address;
      TradePanelWidget.User.alpacaId = result.alpacaId;
      TradePanelWidget.User.chainId = result.chainId;
      TradePanelWidget.User.isLoggedIn = true;

      return true;
    } catch (e: any) {
      cookieHelper.deleteCookie("validate");

      console.info(e);
      return false;
    }
  }

  public async authenticateUser(
    enableWeb3Callback?: (walletConnectionInfo: any) => void,
    authenticatedCallback?: () => void
  ) {
    let connector = await AuthenticateService.enableWeb3();

    if (enableWeb3Callback && connector.provider) {
      enableWeb3Callback(connector.provider);
    }

    if (connector.chainId != TradePanelWidget.Network.ChainId) {
      let userNetwork = NetworkInfo.getNetworkInfoByChainId(connector.chainId);
      if (userNetwork) {
        NetworkInfo.setNetworkByChainId(connector.chainId);
      } else {
        let modal = new SwitchNetworkModal();
        modal.show();
        return;
      }
    }

    let response = await this.post<any>("/me/nonce", {
      address: connector.account,
    });

    let obj: any = {
      signingMessage:
        "You are logging into Liminal.market.\n\nNonce:" + response.nonce,
      connector: MagicWeb3Connector,
    };
    console.log("isWebview", WalletHelper.isWebview());
    // @ts-ignore
    console.log("win.Ethereum", window.ethereum);
    //        console.log('Ethereum', ethereum);

    console.log("connector.ether", connector.ether);
    console.log("network", TradePanelWidget.Network);

    // @ts-ignore
    if (window.ethereum) {
      console.log(
        "Ethereum",
        // @ts-ignore
        window.ethereum.networkVersion,
        // @ts-ignore
        window.ethereum.chainId,
        TradePanelWidget.Network.ChainIdHex
      );
      if (WalletHelper.isWebview()) {
      }
    }

    console.log("calling signMessage");
    const signedMessage = await connector.ether
      .getSigner()
      .signMessage(obj.signingMessage)
      .then((result: any) => {
        console.log("then signMessage:", result);
        return result;
      })
      .catch(async (e: any) => {
        console.log(e);
        await this.logOut();
        if (
          e.message &&
          e.message.toLowerCase().indexOf("wrong network") != -1
        ) {
          await this.authenticateUser(
            enableWeb3Callback,
            authenticatedCallback
          );
          //showBar('Your wallet is on wrong network. I expect you to be on ' + TradePanelWidget.Network.Name + '(chainId:' + TradePanelWidget.Network.ChainId + ') network');
        } else {
          showBar("Error signing in:" + e.message);
          return;
        }
      });

    if (!signedMessage) return;

    let loginResponse = await this.post<any>("me/validate", {
      address: connector.account,
      signedMessage,
    });

    if (!loginResponse.address) {
      await this.logOut();
      return;
    }

    TradePanelWidget.User.setValidate(loginResponse);
    TradePanelWidget.User.token = loginResponse.token;
    TradePanelWidget.User.alpacaId = loginResponse.alpacaId;
    TradePanelWidget.User.address = loginResponse.address;
    TradePanelWidget.User.isLoggedIn = true;

    if (authenticatedCallback) {
      authenticatedCallback();
    } else {
      location.reload();
    }
  }
}
