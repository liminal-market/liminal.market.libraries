import KycBase from "./KycBase";
import KYCForm from "../KYCForm";
export default class KycUpload extends KycBase {
    constructor(kycForm: KYCForm);
    render(): string;
    show(): void;
    bindEvents(): void;
}
