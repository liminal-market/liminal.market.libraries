import { ethers } from "ethers";
import User from "./dto/User";
import NetworkInfo from "./networks/NetworkInfo";
import AuthenticateService from "./services/backend/AuthenticateService";
import TradePanel from "./ui/elements/TradePanel";
import WidgetGlobals from "./WidgetGlobals";
import Handlebars from "handlebars";

export default class TradePanelWidget {
  constructor(ether: ethers.providers.JsonRpcProvider) {
    WidgetGlobals.HandlebarsInstance = Handlebars;
    WidgetGlobals.Network = NetworkInfo.getInstance();
    WidgetGlobals.User = new User(null, "", WidgetGlobals.Network.ChainId, "");
    WidgetGlobals.User.ether = ether;
  }

  public async render(
    elementSelector: string,
    symbol?: string,
    name?: string,
    logo?: string,
    address?: string
  ) {
    let authenticationService = new AuthenticateService();
    await authenticationService.isAuthenticated();
    new TradePanel().render(elementSelector, symbol, name, logo, address);
  }
}
