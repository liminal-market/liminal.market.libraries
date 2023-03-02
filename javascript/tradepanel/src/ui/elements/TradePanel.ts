import ExecuteOrderButton from "./tradepanel/ExecuteOrderButton";
import { TradeType } from "../../enums/TradeType";
import TradePanelInput from "./tradepanel/TradePanelInput";
import ContractInfo from "../../contracts/ContractInfo";
import TradeSwitch from "./tradepanel/TradeSwitch";
import WidgetGlobals from "../../WidgetGlobals";

export default class TradePanel {
  quantity: number;

  constructor() {
    this.quantity = 0;
  }

  public importStylesheet() {
    const existingLinkTag = document.getElementById("liminal-market-css");
    if (!existingLinkTag) {
      document.head.insertAdjacentHTML(
        "beforeend",
        `
          <link
            id="liminal-market-css"
            rel="stylesheet"
            href="https://app.liminal.market/css/style.css"
            type="text/css"
          />
          <link
            id="pico-css"
            rel="stylesheet"
            href="https://app.liminal.market/css/pico/pico.min.css"
            type="text/css"
          />
        `
      );
    }
  }

  public async render(
    elementSelector: string,
    symbol?: string,
    name?: string,
    logo?: string,
    address?: string
  ) {
    let element = document.querySelector(elementSelector);
    if (!element) return;

    this.importStylesheet();

    let contractInfo = ContractInfo.getContractInfo(WidgetGlobals.Network.Name);

    let sellTradeInput = new TradePanelInput(
      "aUSD",
      "aUSD at Broker",
      "/img/ausd.png",
      contractInfo.AUSD_ADDRESS,
      TradeType.Sell
    );
    let buyTradeInput: TradePanelInput;
    if (!symbol) {
      buyTradeInput = new TradePanelInput(
        "Select stock",
        "",
        "",
        "",
        TradeType.Buy
      );
    } else {
      buyTradeInput = new TradePanelInput(
        symbol as string,
        name as string,
        logo as string,
        address as string,
        TradeType.Buy
      );
    }

    sellTradeInput.setOtherTradePanelInput(buyTradeInput);
    buyTradeInput.setOtherTradePanelInput(sellTradeInput);

    let tradeSwitch = new TradeSwitch();
    let executeOrderButton = new ExecuteOrderButton(
      sellTradeInput,
      buyTradeInput
    );

    let sellInput = sellTradeInput.renderToString();
    let buyInput = buyTradeInput.renderToString();
    let switchHtml = tradeSwitch.renderToString();
    let executeOrderButtonHtml = executeOrderButton.renderToString();

    element.innerHTML =
      sellInput + switchHtml + buyInput + switchHtml + executeOrderButtonHtml;

    await sellTradeInput.loadBalance();
    await buyTradeInput.loadBalance();
    if (symbol) {
      await buyTradeInput.loadLastTrade();
    }
    sellTradeInput.bindEvents();
    buyTradeInput.bindEvents();

    await executeOrderButton.renderButton();

    tradeSwitch.bindEvents(sellTradeInput, buyTradeInput, executeOrderButton);
    sellTradeInput.onUpdate = () => {
      if (buyTradeInput.isDirty) buyTradeInput.updatePanel();
      executeOrderButton.renderButton();
    };
    buyTradeInput.onUpdate = () => {
      if (sellTradeInput.isDirty) sellTradeInput.updatePanel();
      executeOrderButton.renderButton();
    };
  }
  public formatBuyPanel(
    symbol: string,
    name: string,
    logo: string,
    tradeType: TradeType,
    contractAddress: string
  ) {
    document.getElementById("liminal_market_select_symbol")!.innerHTML = symbol;
  }
}
