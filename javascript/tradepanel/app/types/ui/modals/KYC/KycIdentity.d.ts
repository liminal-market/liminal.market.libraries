import KYCForm from "../KYCForm";
import KycBase from "./KycBase";
export default class KycIdentity extends KycBase {
    edit: boolean;
    constructor(kycForm: KYCForm);
    render(edit?: boolean): string;
    show(): void;
    bindEvents(): void;
    private hideCitizenErrorMessage;
    private bindButtons;
    private validateInputs;
}
