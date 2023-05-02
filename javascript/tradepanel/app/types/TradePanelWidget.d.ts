import { ethers } from "ethers";
export default class TradePanelWidget {
    constructor(ether: ethers.providers.JsonRpcProvider);
    render(elementSelector: string, symbol?: string, name?: string, logo?: string, address?: string): Promise<void>;
}
