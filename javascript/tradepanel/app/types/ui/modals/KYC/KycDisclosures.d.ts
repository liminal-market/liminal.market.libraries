import KycBase from "./KycBase";
import KYCForm from "../KYCForm";
import KycAffiliateOrControlled from "./KycAffiliateOrControlled";
import KycImmediateFamily from "./KycImmediateFamily";
export default class KycDisclosures extends KycBase {
    kycAffiliatedOrControlled: KycAffiliateOrControlled;
    kycImmediateFamily: KycImmediateFamily;
    constructor(kycForm: KYCForm);
    render(edit?: boolean): any;
    show(): void;
    bindEvents(): void;
    private loadAffiliatedOrControlComponent;
    private loadPep;
    private uncheck;
    private validateFields;
}
