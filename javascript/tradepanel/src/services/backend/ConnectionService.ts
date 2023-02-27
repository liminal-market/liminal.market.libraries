import NetworkInfo from "../../networks/NetworkInfo";
import WidgetGlobals from "../../WidgetGlobals";

export default class ConnectionService {
  options: { serverUrl: string; appId: string };

  constructor() {
    this.options = { serverUrl: "", appId: "" };
  }

  public getOptions() {
    return this.options;
  }

  public async start(): Promise<void> {
    let networkInfo = WidgetGlobals.Network;
    this.options = {
      serverUrl: networkInfo.ServerUrl,
      appId: networkInfo.AppId,
    };
  }
}
