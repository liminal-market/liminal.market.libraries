export default class Helper {
    static AddressZero = '0x0000000000000000000000000000000000000000';

    public static setCookie(name: string, value: string) {
        if (typeof document == 'undefined') return;
        let date = new Date();
        this.deleteCookie(name);
        document.cookie = name + "=" + value + "; expires=Mon, 2 Dec " + (date.getFullYear() + 1) + " 12:00:00 UTC;path=/;SameSite=Strict;";
    }

    public static getCookieValue(name: string) {
        if (typeof document == 'undefined') return;
        return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';
    }

    public static deleteCookie(name: string) {
        if (typeof document == 'undefined') return;
        document.cookie = name + "=0; expires=Mon, 2 Dec 2020 12:00:00 UTC;path=/";
    }
}