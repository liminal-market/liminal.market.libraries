import GeneralError from "./GeneralError";
export default class ErrorInfo {
    errorInfo: string;
    constructor(errorInfo: string);
    getErrorInfo(): string;
    static report(error: GeneralError): void;
    static log(obj: any): void;
    static info(obj: any): void;
    static error(obj: any): void;
}
