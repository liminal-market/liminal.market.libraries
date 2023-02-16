import AuthenticateService from "../../../services/backend/AuthenticateService";
import TradePanelInput from "./TradePanelInput";
export default class ExecuteOrderButton {
    authenticateService: AuthenticateService;
    sellTradeInput: TradePanelInput;
    buyTradeInput: TradePanelInput;
    template: any;
    button: HTMLInputElement;
    static Instance: ExecuteOrderButton;
    constructor(sellTradeInput: TradePanelInput, buyTradeInput: TradePanelInput);
    renderToString(): string;
    renderButton(): Promise<void>;
    private enableExecuteOrder;
    private executeTransfer;
    private loadingButton;
    private stopLoadingButton;
    private walletIsConnected;
    private userIsLoggedIn;
    private chainIdIsCorrect;
    private userHasNativeToken;
    kycIdDoneTimeout: any;
    private kycIsDone;
    checkBalanceInterval: any;
    hasBuyingPower: boolean;
    private userHasAUSD;
    private userHasEnoughQty;
    private isMarketOpen;
    private hasQuantityAndSymbol;
}
