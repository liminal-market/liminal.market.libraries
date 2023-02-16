import { TradeType } from "../../../enums/TradeType";
import BigNumber from "bignumber.js";
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
    isDirty: boolean;
    constructor(symbol: string, name: string, logo: string, address: string, tradeType: TradeType);
    setOtherTradePanelInput(tradePanelInput: TradePanelInput): void;
    renderToString(): string;
    render(bindEvents?: boolean): void;
    bindEvents(): void;
    setSymbol(symbol: string, name: string, logo: string): void;
    private bindSelectStockButton;
    private bindQuantityListener;
    private bindMaxLink;
    loadBalance(): Promise<void>;
    loadLastTrade(): Promise<void>;
    updateQuantity(): void;
    private loadProgressbar;
    static switchPanels(sellTradePanelInput: TradePanelInput, buyTradePanelInput: TradePanelInput): Promise<[TradePanelInput, TradePanelInput]>;
    setQuantity(value: string): void;
    quantityFormatted(): string | BigNumber;
    updatePanel(): Promise<void>;
    private toggleMaxBalanceLink;
}
