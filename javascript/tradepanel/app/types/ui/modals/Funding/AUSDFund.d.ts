import Modal from "../Modal";
import SelectFundingType from "./Relationship/SelectFundingType";
import ACHRelationship from "./Relationship/ACHRelationship";
import TransferNotification from "./TransferNotification";
import WireTransferRelationship from "./Relationship/WireTransferRelationship";
import TransferNotified from "./TransferNotified";
import FirstTransferSetup from "./FirstTransferSetup/FirstTransferSetup";
export default class AUSDFund {
    modal: Modal;
    selectFundingType: SelectFundingType;
    achRelationship: ACHRelationship;
    wireTransferRelationship: WireTransferRelationship;
    firstTransferSetup: FirstTransferSetup;
    transferNotification: TransferNotification;
    transferNotified: TransferNotified;
    constructor();
    show(): Promise<void>;
    showError(elementId: string, reason: string): void;
    hideError(elementId: string): void;
}
