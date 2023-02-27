import WidgetGlobals from "../../WidgetGlobals";

export default class BaseService {
  constructor() {}

  public async get(path: string, data?: any, options?: any): Promise<any> {
    let url = "";
    let method = "GET";
    if (!options || !options.relativeUrl) {
      url = WidgetGlobals.Network.ServerUrl;
    }
    let params = new URLSearchParams(data);
    if (!params.has("chainId")) {
      params.set("chainId", WidgetGlobals.Network.ChainId.toString());
    }
    if (!params.has("address")) {
      params.set("address", WidgetGlobals.User.address);
    }

    let response = await fetch(
      this.getUrl(url, path) + "?" + params.toString(),
      {
        method: method,
        headers: {
          Authentication: "Bearer: " + WidgetGlobals.User.token,
          "Content-Type": "application/json",
        },
      }
    );
    let obj = await response.json();
    return obj.result ? obj.result : undefined;
  }

  public async post<T>(path: string, data?: any) {
    if (!data) {
      data = {};
    }
    data.chainId = data.chainId ? data.chainId : WidgetGlobals.Network.ChainId;
    data.address = data.address ? data.address : WidgetGlobals.User.address;

    let response = await fetch(
      this.getUrl(WidgetGlobals.Network.ServerUrl, path),
      {
        method: "POST",
        headers: {
          Authentication: "Bearer: " + WidgetGlobals.User.token,
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(data),
      }
    );
    let obj = await response.json();
    if (obj.success) return obj.result;

    throw new Error(obj.error);
  }

  private getUrl(ServerUrl: string, path: string) {
    if (path.startsWith("/")) return ServerUrl + path;
    return ServerUrl + "/" + path;
  }
}
