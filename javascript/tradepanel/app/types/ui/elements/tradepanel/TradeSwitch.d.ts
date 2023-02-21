import TradePanelInput from "./TradePanelInput";
import ExecuteOrderButton from "./ExecuteOrderButton";
export default class TradeSwitch {
    template: any;
    constructor();
    renderToString(): any;
    render(): void;
    bindEvents(sellTradePanelInput: TradePanelInput, buyTradePanelInput: TradePanelInput, executeTradeButton: ExecuteOrderButton): void;
}
