export default class OrderProgress {
    template: any;
    progressNr: number;
    private static instance;
    private constructor();
    static getInstance(): OrderProgress;
    render(): void;
    renderToString(): any;
    clearProgressText(): void;
    setProgressText(progressNr: number, text: string, hash?: string, hideInSeconds?: number): void;
}
