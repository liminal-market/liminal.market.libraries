export default class CopyHelper {
    fallbackCopyTextToClipboard(text: string): boolean;
    copyTextToClipboard(text: string): Promise<boolean>;
}
