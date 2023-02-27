export default class TradePanelWidget {
    constructor();
    render(elementSelector: string, symbol?: string, name?: string, logo?: string, address?: string): Promise<void>;
}
