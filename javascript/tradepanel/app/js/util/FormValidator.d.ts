export default class FormValidator {
    selector: string;
    constructor(selector: string);
    validateRequiredFields(): boolean;
    private isMissingInputFromUser;
    protected removeMissingInfo(errorDivId: string, focusElementId?: string): void;
    protected setMissingInfo(errorDivId: string, text: string, focusElementId?: string): void;
    private handle;
}
