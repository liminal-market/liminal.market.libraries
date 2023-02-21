import { InfoBarType } from "./InfoBarType";
export default class InfoBar {
    static show(message: string, type: InfoBarType, timeoutInSeconds?: number): void;
}
