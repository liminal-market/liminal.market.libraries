import Modal from "../Modal";
import ExecuteOrderButton from "../../elements/tradepanel/ExecuteOrderButton";
export default class KycActionRequired {
    modal: Modal;
    templates: Map<string, string>;
    executeTradeButton: ExecuteOrderButton;
    constructor(executeTradeButton: ExecuteOrderButton);
    show(): Promise<void>;
    private getKycMessages;
    private hideError;
    private showError;
}
