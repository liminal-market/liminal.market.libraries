import KYCForm from "../KYCForm";
export default class KycBase {
    kycForm: KYCForm;
    constructor(kycForm: KYCForm);
    showFieldset(selector: string, header: string): void;
    showRequiredMarker(): void;
    setRequired(inputId: string): void;
    removeRequired(inputId: string): void;
    bind(selector: string, eventName: string, action: (evt: Event) => void): void;
    bindFileUploads(): void;
    hideFieldsets(): void;
    validateRequiredFields(selector: string): boolean;
    showElement(elementId: string): void;
    hideElement(elementId: string): void;
    protected setLabel(elementId: string, text: string): void;
    private isMissingInputFromUser;
    protected removeMissingInfo(errorDivId: string, focusElementId?: string): void;
    protected setMissingInfo(errorDivId: string, text: string, focusElementId?: string): void;
}
