export default class CookieHelper {
    document: Document;
    constructor(doc?: Document);
    setCookie(name: string, value: string): void;
    getCookieValue(name: string): string;
    setCookieProvider(providerName: string): void;
    deleteCookie(name: string): void;
}
