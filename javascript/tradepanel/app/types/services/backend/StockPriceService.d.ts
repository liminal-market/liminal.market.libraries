import TradeInfo from "./TradeInfo";
import { TradeType } from "../../enums/TradeType";
import BaseService from "./BaseService";
export default class StockPriceService extends BaseService {
    constructor();
    getSymbolPrice(symbol: string, tradeType: TradeType): Promise<TradeInfo>;
}
