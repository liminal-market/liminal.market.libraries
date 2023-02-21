export default class FileUpload {
    private maxFileSize;
    inputId: string;
    label: string;
    accept: string;
    capture: string;
    constructor(inputId: string, label: string, accept?: string, capture?: string);
    render(): string;
    bindEvents(): void;
    protected processFile(element: HTMLInputElement): void;
    protected setBase64Input(elementId: string, value: string): void;
    protected showFileRelatedInfo(elementId: string, text: string): void;
    protected hideFileRelatedInfo(elementId: string): void;
    static fileUploads: FileUpload[];
    static registerHandler(): void;
}
