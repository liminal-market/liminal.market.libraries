import Network from "./networks/Network";
import Handlebars from "handlebars";
import User from "./dto/User";

export default class WidgetGlobals {
  static HandlebarsInstance: any = Handlebars;
  static Network: Network;
  static User: User;
  static elementSelector: string;
}
