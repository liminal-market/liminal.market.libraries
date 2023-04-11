import TradeInputHtml from "../../../html/elements/tradepanel/TradeInput.html";
import { TradeType } from "../../../enums/TradeType";
import SecuritiesListModal from "../../modals/SecuritiesListModal";
import LiminalMarketService from "../../../services/blockchain/LiminalMarketService";
import { roundNumberDecimal } from "../../../util/Helper";
import StockPriceService from "../../../services/backend/StockPriceService";
import PricePerShareHtml from "../../../html/elements/tradepanel/PricePerShare.html";
import { BigNumber } from "ethers";
import WidgetGlobals from "../../../WidgetGlobals";
import { formatUnits, parseEther, parseUnits } from "ethers/lib/utils";

export default class TradePanelInput {
  symbol: string;
  name: string;
  logo: string;
  address: string;
  readonly tradeType: TradeType;
  quantity: BigNumber;
  strQuantity: string;
  balance: BigNumber;
  lastPrice: number;
  lastTraded: string;
  qtyPerDollar: number;
  template: any;
  pricePerShareTemplate: any;
  otherTradePanelInput: TradePanelInput | undefined;
  onUpdate: (() => void) | undefined;
  isDirty: boolean = false;

  constructor(
    symbol: string,
    name: string,
    logo: string,
    address: string,
    tradeType: TradeType
  ) {
    this.symbol = symbol;
    this.name = name;
    this.logo = logo;
    this.address = address;
    this.tradeType = tradeType;
    this.quantity = BigNumber.from(0);
    this.strQuantity = "";
    this.balance = BigNumber.from(0);
    this.lastPrice = 0;
    this.qtyPerDollar = 0;
    this.lastTraded = "";
    this.template = WidgetGlobals.HandlebarsInstance.compile(TradeInputHtml);
    this.pricePerShareTemplate =
      WidgetGlobals.HandlebarsInstance.compile(PricePerShareHtml);
  }

  public setOtherTradePanelInput(tradePanelInput: TradePanelInput) {
    this.otherTradePanelInput = tradePanelInput;
  }

  public renderToString(): string {
    return this.template(this);
  }

  public render(bindEvents: boolean = true): void {
    let element = document.querySelector(
      "." + this.tradeType + "Inputs"
    ) as HTMLElement;
    element.outerHTML = this.renderToString();
    if (bindEvents) {
      this.bindEvents();
    }
  }

  public bindEvents() {
    this.bindQuantityListener();
    this.bindSelectStockButton();
    this.bindMaxLink();
  }

  public setSymbol(symbol: string, name: string, logo: string) {
    this.symbol = symbol;
    this.name = name;
    this.logo = logo;

    this.isDirty = true;
  }

  private bindSelectStockButton() {
    let selectStock = document.querySelector(
      "#" + this.tradeType + "SelectStock"
    ) as HTMLInputElement;
    if (!selectStock) return;

    selectStock.addEventListener("click", async (evt) => {
      evt.preventDefault();

      let securityList = new SecuritiesListModal();
      await securityList.showModal(
        async (symbol: string, name: string, logo: string) => {
          securityList.hideModal();

          if (
            this.otherTradePanelInput &&
            this.symbol == "aUSD" &&
            symbol != this.symbol
          ) {
            this.otherTradePanelInput.setSymbol(
              this.symbol,
              this.name,
              this.logo
            );
          }

          this.symbol = symbol;
          this.name = name;
          this.logo = logo;

          let liminalMarketService = new LiminalMarketService();
          this.address = await liminalMarketService.getSymbolContractAddress(
            symbol
          );

          this.render();
          this.loadBalance().then();
          await this.loadLastTrade();

          if (this.onUpdate) this.onUpdate();
        }
      );
    });
  }
  private bindQuantityListener() {
    let qtyInput = document.querySelector(
      "." + this.tradeType + "Inputs .trade_input input"
    ) as HTMLInputElement;
    if (!qtyInput) return;

    let inputTimer: any;
    qtyInput.addEventListener("keyup", (evt) => {
      if (inputTimer) clearTimeout(inputTimer);

      inputTimer = setTimeout(() => {
        let inputValue = (evt.target as HTMLInputElement).value;
        this.setQuantity(inputValue);
        this.loadProgressbar();

        if (this.otherTradePanelInput)
          this.otherTradePanelInput.updateQuantity();
        if (this.onUpdate) this.onUpdate();
      }, 300);
    });
  }

  private bindMaxLink() {
    let maxBalanceDom = document.querySelector(
      "." + this.tradeType + "Inputs .balance_max"
    ) as HTMLElement;
    if (!maxBalanceDom) return;

    maxBalanceDom.addEventListener("click", (evt) => {
      evt.preventDefault();

      let qtyInput = document.querySelector(
        "." + this.tradeType + "Inputs .trade_input input"
      ) as HTMLInputElement;
      if (!qtyInput) return;

      qtyInput.value = formatUnits(this.balance);
      this.setQuantity(qtyInput.value);
      this.loadProgressbar();

      if (this.otherTradePanelInput) this.otherTradePanelInput.updateQuantity();
      if (this.onUpdate) this.onUpdate();
    });
  }

  public async loadBalance() {
    this.balance = BigNumber.from(0);
    let ethAddress = WidgetGlobals.User.address;

    let balanceDom = document.querySelector(
      "." + this.tradeType + "Inputs .balance_value"
    ) as HTMLElement;
    if (!balanceDom) return;

    if (this.symbol === "aUSD") {
      if (ethAddress) {
        this.balance = await WidgetGlobals.LiminalMarket.getAUSDBalance(
          ethAddress
        );
      }
      balanceDom.innerHTML = "$" + this.balance;
    } else if (this.name !== "") {
      this.balance = BigNumber.from(0);
      if (ethAddress) {
        this.balance =
          await WidgetGlobals.LiminalMarket.getSecurityTokenQuantity(
            this.symbol,
            ethAddress
          );
      }
      balanceDom.innerHTML = this.balance.toString();
    }
    balanceDom.dataset.tooltip = this.balance.toString();
    balanceDom.title = this.balance.toString();

    this.loadProgressbar();
    this.toggleMaxBalanceLink();
  }

  public async loadLastTrade() {
    if (this.symbol === "aUSD") {
      this.lastPrice = 1;
      this.qtyPerDollar = 1;
      return;
    }
    if (!this.otherTradePanelInput || this.name == "") return;

    let aUsdPricePerShare = document.querySelector(
      "." + this.otherTradePanelInput.tradeType + "Inputs .price_per_share"
    ) as HTMLElement;
    if (!aUsdPricePerShare) return;

    let pricePerShare = document.querySelector(
      "." + this.tradeType + "Inputs .price_per_share"
    ) as HTMLElement;
    if (!pricePerShare) return;

    aUsdPricePerShare.setAttribute("aria-busy", "true");
    pricePerShare.setAttribute("aria-busy", "true");

    let stockPriceService = new StockPriceService();
    let tradeInfo = await stockPriceService
      .getSymbolPrice(this.symbol, this.otherTradePanelInput.tradeType)
      .catch((reason) => {
        alert(reason.message);

        aUsdPricePerShare.removeAttribute("aria-busy");
        pricePerShare.removeAttribute("aria-busy");
      });
    if (!tradeInfo) return;

    this.lastPrice = tradeInfo.price;
    this.lastTraded = tradeInfo.lastTrade.toString();
    this.qtyPerDollar = 1 / this.lastPrice;

    let pricePerShareHtml: any = {
      lastTraded: this.lastTraded,
      text: "≈ $" + this.lastPrice + " per share",
    };
    pricePerShare.innerHTML = this.pricePerShareTemplate(pricePerShareHtml);

    let pricePerAUsdHtml: any = {
      lastTraded: this.lastTraded,
      text:
        "1 aUSD ≈ " +
        roundNumberDecimal(this.qtyPerDollar, 6) +
        " " +
        this.symbol,
    };
    aUsdPricePerShare.innerHTML = this.pricePerShareTemplate(pricePerAUsdHtml);
    this.updateQuantity();

    aUsdPricePerShare.removeAttribute("aria-busy");
    pricePerShare.removeAttribute("aria-busy");
  }

  public updateQuantity() {
    if (!this.otherTradePanelInput) return;

    let qtyInput = document.querySelector(
      "." + this.tradeType + "Inputs .trade_input input"
    ) as HTMLInputElement;
    if (!qtyInput) return;
    if (this.symbol === "aUSD") {
      qtyInput.value =
        "" +
        (
          parseFloat(formatUnits(this.otherTradePanelInput.quantity)) /
          this.otherTradePanelInput.qtyPerDollar
        ).toFixed(18);
    } else {
      qtyInput.value =
        "" +
        (
          parseFloat(formatUnits(this.otherTradePanelInput.quantity)) *
          this.qtyPerDollar
        ).toFixed(18);
    }

    if (qtyInput.value == "0.000000000000000000") {
      qtyInput.value = "";
    }

    this.setQuantity(qtyInput.value);
    this.loadProgressbar();
  }

  private loadProgressbar() {
    if (
      this.quantity.eq(0) ||
      this.balance.eq(0) ||
      this.tradeType == TradeType.Buy
    )
      return;

    let progressDom = document.querySelector(
      "." + this.tradeType + "Inputs .progress"
    ) as HTMLProgressElement;
    if (!progressDom) return;

    let percentage = parseFloat(formatUnits(this.quantity.div(this.balance)));
    progressDom.value = percentage;
    progressDom.classList.remove("d-none");

    let exceedsBalance = document.querySelector(
      "." + this.tradeType + "Inputs .exceeds_wallet_balance"
    ) as HTMLElement;
    if (percentage > 1) {
      exceedsBalance.classList.remove("d-none");
      progressDom.setAttribute("aria-invalid", "true");
    } else {
      exceedsBalance.classList.add("d-none");
    }
  }

  public static async switchPanels(
    sellTradePanelInput: TradePanelInput,
    buyTradePanelInput: TradePanelInput
  ): Promise<[TradePanelInput, TradePanelInput]> {
    let sellSymbol = sellTradePanelInput.symbol;
    let sellName = sellTradePanelInput.name;
    let sellLogo = sellTradePanelInput.logo;
    let sellQuantity = sellTradePanelInput.quantity;
    sellTradePanelInput.setSymbol(
      buyTradePanelInput.symbol,
      buyTradePanelInput.name,
      buyTradePanelInput.logo
    );
    sellTradePanelInput.quantity = buyTradePanelInput.quantity;
    buyTradePanelInput.setSymbol(sellSymbol, sellName, sellLogo);
    buyTradePanelInput.quantity = sellQuantity;

    await sellTradePanelInput.updatePanel();
    await buyTradePanelInput.updatePanel();

    return [sellTradePanelInput, buyTradePanelInput];
  }

  public setQuantity(value: string) {
    if (value == "") {
      value = "0";
    }
    this.quantity = parseUnits(value);
    this.strQuantity = value;
  }
  public quantityFormatted() {
    return this.symbol === "aUSD" ? "$" + this.quantity : this.quantity;
  }

  public async updatePanel() {
    this.updateQuantity();
    this.render(true);

    await this.loadBalance();
    await this.loadLastTrade();
  }

  private toggleMaxBalanceLink() {
    let maxBalanceDom = document.querySelector(
      "." + this.tradeType + "Inputs .balance_max"
    ) as HTMLElement;
    if (!maxBalanceDom) return;

    if (this.balance.eq(0)) {
      maxBalanceDom.classList.add("d-none");
    } else {
      maxBalanceDom.classList.remove("d-none");
    }
  }
}
