export default class PredefinedErrorHandlers {
    errorMessageMapping: Map<string, any>;
    SentLoginRequest: string;
    constructor();
    handle(message: string): boolean;
}
