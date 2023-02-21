import AUSDFund from "../AUSDFund";
export default abstract class RelationshipBase {
    protected aUsdFund: AUSDFund;
    protected constructor(aUsdFund: AUSDFund);
    abstract bindEvents(): void;
    abstract validate(): boolean;
    show(title: string, html: string, param?: any): void;
    handleErrorResponse(reason: any): Promise<void>;
}
