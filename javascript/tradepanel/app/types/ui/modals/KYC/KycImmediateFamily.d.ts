import KycBase from "./KycBase";
import KYCForm from "../KYCForm";
export default class KycImmediateFamily extends KycBase {
    constructor(kycForm: KYCForm);
    render(): string;
    bindEvents(): void;
    validate(): boolean;
}
