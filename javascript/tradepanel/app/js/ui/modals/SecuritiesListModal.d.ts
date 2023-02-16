import Modal from "./Modal";
export default class SecuritiesListModal {
    page: number;
    tbodyId: string;
    loadmore: boolean;
    modal: Modal;
    constructor();
    showModal(onSelectSymbol: (symbol: string, name: string, logo: string) => void): Promise<void>;
    hideModal(): void;
}
