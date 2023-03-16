import KycStatus from "../../../dto/KycStatus";
import ExecuteOrderButton from "../../elements/tradepanel/ExecuteOrderButton";
export default class KycStatusHandler {
    kycResponse: KycStatus;
    executeTradeButton: ExecuteOrderButton;
    constructor(kycResponse: any, executeTradeButton: ExecuteOrderButton);
    getButtonText(): string;
    getButtonClickEvent(executeTradeButton: ExecuteOrderButton): () => void;
    showModal(title: string, content: string): () => void;
}
