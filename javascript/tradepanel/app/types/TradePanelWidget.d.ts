import User from "./dto/User";
import Network from "./networks/Network";
export default class TradePanelWidget {
    static Network: Network;
    static User: User;
    constructor();
    render(elementId: string, symbol?: string, name?: string, logo?: string, address?: string): Promise<void>;
}
