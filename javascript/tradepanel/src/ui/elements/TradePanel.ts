import ExecuteOrderButton from "./tradepanel/ExecuteOrderButton";
import { TradeType } from "../../enums/TradeType";
import TradePanelInput from "./tradepanel/TradePanelInput";
import ContractInfo from "../../contracts/ContractInfo";
import TradeSwitch from "./tradepanel/TradeSwitch";
import TradePanelWidget from "../../TradePanelWidget";

export default class TradePanel {
  quantity: number;

  constructor() {
    this.quantity = 0;
  }

  public async render(
    elementId: string,
    symbol?: string,
    name?: string,
    logo?: string,
    address?: string
  ) {
    let element = document.getElementById(elementId);
    if (!element) return;

    let contractInfo = ContractInfo.getContractInfo(
      TradePanelWidget.Network.Name
    );

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
