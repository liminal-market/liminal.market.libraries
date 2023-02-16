import AUSDFund from "../AUSDFund";
import RelationshipBase from "./RelationshipBase";
export default class ACHRelationship extends RelationshipBase {
    constructor(aUsdFund: AUSDFund);
    show(): void;
    bindEvents(): void;
    validate(): boolean;
}
