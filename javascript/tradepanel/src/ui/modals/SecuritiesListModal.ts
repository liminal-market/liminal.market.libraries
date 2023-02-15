import Modal from "./Modal";
import SecuritiesList from "../elements/SecuritiesList";

export default class SecuritiesListModal {
    page: number;
    tbodyId = 'liminal_market_securities_list';
    loadmore: boolean;
    modal: Modal;

    constructor() {
        this.page = 0;
        this.loadmore = true;
        this.modal = new Modal();
    }

    public async showModal(onSelectSymbol: (symbol: string, name: string, logo: string) => void) {
        let securitiesList = new SecuritiesList();
        let content = await securitiesList.render();

        let newInstance = this.modal.showModal('Select stock to buy', content,
            true);
        //if (newInstance)
        {
            await securitiesList.bindEvents(onSelectSymbol);
        }
    }

    hideModal() {
        this.modal.hideModal();
    }
}