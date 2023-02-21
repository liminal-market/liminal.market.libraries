import { TradeType } from "../../enums/TradeType";
export default class TradePanel {
    quantity: number;
    constructor();
    importStylesheet(): void;
    render(elementId: string, symbol?: string, name?: string, logo?: string, address?: string): Promise<void>;
    formatBuyPanel(symbol: string, name: string, logo: string, tradeType: TradeType, contractAddress: string): void;
}
