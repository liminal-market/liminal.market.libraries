import SecuritiesService from "../../services/broker/SecuritiesService";
export default class SecuritiesList {
    page: number;
    tbodyId: string;
    loadmore: boolean;
    onSelectSymbol?: (symbol: string, name: string, logo: string) => void;
    constructor();
    render(): Promise<string>;
    bindEvents(onSelectSymbol: (symbol: string, name: string, logo: string) => void): Promise<void>;
    private bindOnClickEvent;
    handleClick(evt: MouseEvent): Promise<void>;
    bindSearchEvent(): Promise<void>;
    showTopSecurities(securitiesService: SecuritiesService): Promise<void>;
    private loadSecuritiesToDom;
    private bindLoadMore;
    loadMore(this: SecuritiesList): Promise<void>;
    private addToWalletOrGetAddress;
    private showGetAddress;
    showAddToWallet(element: HTMLElement, symbol: string, address: string): Promise<"" | undefined>;
    private renderContractInfoToString;
}
