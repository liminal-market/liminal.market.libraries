import AUSDFund from "../AUSDFund";
import RelationshipBase from "./RelationshipBase";
export default class WireTransferRelationship extends RelationshipBase {
    constructor(aUsdFund: AUSDFund);
    show(): void;
    bindEvents(): void;
    validate(): boolean;
}
