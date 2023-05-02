import ExecuteOrderButton from "../../elements/tradepanel/ExecuteOrderButton";
import KycStatus from "liminal.market/dist/dto/KycStatus";
export default class KycStatusHandler {
    kycResponse: KycStatus;
    executeTradeButton: ExecuteOrderButton;
    constructor(kycResponse: any, executeTradeButton: ExecuteOrderButton);
    getButtonText(): string;
    getButtonClickEvent(executeTradeButton: ExecuteOrderButton): () => void;
    showModal(title: string, content: string): () => void;
}
