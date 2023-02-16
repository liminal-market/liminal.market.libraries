import KYCForm from "../../ui/modals/KYCForm";
export default class KycValidatorError {
    validValues: string | string[];
    inputName: string;
    labelText: string;
    message: string;
    pattern: string;
    onshow: any;
    kycForm: KYCForm;
    constructor(error: any, kycForm: KYCForm);
    handle(): void;
    private getDivToDisplayErrorMessage;
}
