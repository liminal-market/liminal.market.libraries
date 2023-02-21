export default class OrderProgress {
    progressNr: number;
    private static instance;
    private constructor();
    static getInstance(): OrderProgress;
    clearProgressText(): void;
    setProgressText(progressNr: number, text: string, hash: string): void;
}
