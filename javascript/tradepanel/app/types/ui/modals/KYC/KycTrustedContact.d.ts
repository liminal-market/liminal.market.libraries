import KycBase from "./KycBase";
import KYCForm from "../KYCForm";
export default class KycTrustedContact extends KycBase {
    edit: boolean;
    constructor(kycForm: KYCForm);
    render(edit?: boolean): any;
    show(): void;
    bindEvents(): void;
    private validate;
}
