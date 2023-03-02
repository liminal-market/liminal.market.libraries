import KycBase from "./KycBase";
import KYCForm from "../KYCForm";
export default class KycImmediateFamily extends KycBase {
    constructor(kycForm: KYCForm);
    render(): any;
    bindEvents(): void;
    validate(): boolean;
}
