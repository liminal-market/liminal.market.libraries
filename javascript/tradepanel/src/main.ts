// import TradePageHtml from "./html/pages/trade.html";
import TradePanelWidget from "./TradePanelWidget";

export { TradePanelWidget };

// export default class App {
//   constructor() {
//     //this is required by many places
//     //TODO move to the widget
//     // App.Network = NetworkInfo.getInstance();
//     //TODO move to the widget
//     // App.User = new User(null, "", App.Network.ChainId, "");
//   }

//   public async start() {
//     let mainContainer = document.getElementById("main_container");
//     if (!mainContainer) return;

//     let template = Handlebars.compile(TradePageHtml);
//     mainContainer.innerHTML = template({});

//     let tradePanel = new TradePanelWidget();
//     await tradePanel.render("liminal_market_trade_panel");

//     //TODO move to the widget
//     // UserPosition.registerListener();
//     //TODO move to the widget
//     // EventService.register();

//     // let header = new Header();
//     // header.load();

//     // if (WalletHelper.isWebview()) {
//     //   // @ts-ignore
//     //   var vConsole = new window.VConsole();
//     // }
//   }
// }

// let app = new App();
// app.start().then();
