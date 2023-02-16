import KycBase from "./KycBase";
import KYCForm from "../KYCForm";
export default class KycContact extends KycBase {
    usTaxResidence: boolean;
    constructor(kycForm: KYCForm);
    render(edit?: boolean): string;
    show(): void;
    bindEvents(): void;
}
