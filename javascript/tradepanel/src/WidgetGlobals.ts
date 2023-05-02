import Network from "./networks/Network";
import Handlebars from "handlebars";
import User from "./dto/User";
import LiminalMarket from "liminal.market";

export default class WidgetGlobals {
  static HandlebarsInstance: any = Handlebars;
  static Network: Network;
  static User: User;
  static LiminalMarket: LiminalMarket;
  static elementSelector: string;
}
