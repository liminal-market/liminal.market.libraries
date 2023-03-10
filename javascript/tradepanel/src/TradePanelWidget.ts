import User from "./dto/User";
import NetworkInfo from "./networks/NetworkInfo";
import EventService from "./services/backend/EventService";
import TradePanel from "./ui/elements/TradePanel";
import WidgetGlobals from "./WidgetGlobals";
import Handlebars from "handlebars";

export default class TradePanelWidget {
  constructor() {
    WidgetGlobals.HandlebarsInstance = Handlebars;
    WidgetGlobals.Network = NetworkInfo.getInstance();
    WidgetGlobals.User = new User(null, "", WidgetGlobals.Network.ChainId, "");
    EventService.register();
  }

  public async render(
    elementSelector: string,
    symbol?: string,
    name?: string,
    logo?: string,
    address?: string
  ) {
    new TradePanel().render(elementSelector, symbol, name, logo, address);
  }
}
