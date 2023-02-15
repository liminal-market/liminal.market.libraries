import User from "./dto/User";
import Network from "./networks/Network";
import NetworkInfo from "./networks/NetworkInfo";
import TradePanel from "./ui/elements/TradePanel";

export default class TradePanelWidget {
  static Network: Network;
  static User: User;
  constructor() {
    TradePanelWidget.Network = NetworkInfo.getInstance();
    TradePanelWidget.User = new User(
      null,
      "",
      TradePanelWidget.Network.ChainId,
      ""
    );
  }

  public async render(
    elementId: string,
    symbol?: string,
    name?: string,
    logo?: string,
    address?: string
  ) {
    new TradePanel().render(elementId, symbol, name, logo, address);
  }
}
