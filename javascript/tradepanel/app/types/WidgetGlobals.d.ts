import Network from "./networks/Network";
import User from "./dto/User";
export default class WidgetGlobals {
    static HandlebarsInstance: any;
    static Network: Network;
    static User: User;
    static elementSelector: string;
}
