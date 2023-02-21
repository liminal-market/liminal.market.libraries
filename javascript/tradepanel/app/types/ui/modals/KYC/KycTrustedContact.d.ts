import KycBase from "./KycBase";
import KYCForm from "../KYCForm";
export default class KycTrustedContact extends KycBase {
    edit: boolean;
    constructor(kycForm: KYCForm);
    render(edit?: boolean): string;
    show(): void;
    bindEvents(): void;
    private validate;
}
