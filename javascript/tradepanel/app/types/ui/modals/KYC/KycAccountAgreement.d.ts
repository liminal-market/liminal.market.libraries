import KycBase from "./KycBase";
import KYCForm from "../KYCForm";
export default class KycAccountAgreement extends KycBase {
    constructor(kycForm: KYCForm);
    render(edit?: boolean): any;
    show(): void;
    bindEvents(): void;
    bindSubmitKyc(edit?: boolean): void;
    private validate;
}
