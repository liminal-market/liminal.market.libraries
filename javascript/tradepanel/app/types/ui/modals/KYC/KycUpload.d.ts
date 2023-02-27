import KycBase from "./KycBase";
import KYCForm from "../KYCForm";
export default class KycUpload extends KycBase {
    constructor(kycForm: KYCForm);
    render(): any;
    show(): void;
    bindEvents(): void;
}
