export default class LoadingHelper {
    static lastElement?: HTMLElement;
    static setLoading(element?: HTMLElement | null): void;
    static removeLoading(): void;
}
