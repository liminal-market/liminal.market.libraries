import NetworkInfo from "../../networks/NetworkInfo";
import SwitchNetworkModal from "../../ui/modals/SwitchNetworkModal";
import MagicWeb3Connector from "../../wallet/MagicWeb3Connector";
import BaseService from "./BaseService";
import CookieHelper from "../../util/CookieHelper";
import User from "../../dto/User";
import { showBar } from "../../util/Helper";
import WalletHelper from "../../util/WalletHelper";
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
    WidgetGlobals.User.magic.connect.disconnect();
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
    let cookieHelper = new CookieHelper();
    let validate = cookieHelper.getCookieValue("validate");
    if (!validate) return false;

    try {
      let obj = JSON.parse(atob(validate));
      WidgetGlobals.User.token = obj.token;

      let result = await this.post("/me/jwt");
      if (!result.jwt) {
        await this.logOut();
        return false;
      }

      await AuthenticateService.enableWeb3();

      WidgetGlobals.User.address = result.address;
      WidgetGlobals.User.alpacaId = result.alpacaId;
      WidgetGlobals.User.chainId = result.chainId;
      WidgetGlobals.User.isLoggedIn = true;

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
    console.log("network", WidgetGlobals.Network);

    // @ts-ignore
    if (window.ethereum) {
      console.log(
        "Ethereum",
        // @ts-ignore
        window.ethereum.networkVersion,
        // @ts-ignore
        window.ethereum.chainId,
        WidgetGlobals.Network.ChainIdHex
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
          //showBar('Your wallet is on wrong network. I expect you to be on ' + WidgetGlobals.Network.Name + '(chainId:' + WidgetGlobals.Network.ChainId + ') network');
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

    WidgetGlobals.User.setValidate(loginResponse);
    WidgetGlobals.User.token = loginResponse.token;
    WidgetGlobals.User.alpacaId = loginResponse.alpacaId;
    WidgetGlobals.User.address = loginResponse.address;
    WidgetGlobals.User.isLoggedIn = true;

    if (authenticatedCallback) {
      authenticatedCallback();
    } else {
      location.reload();
    }
  }
}
