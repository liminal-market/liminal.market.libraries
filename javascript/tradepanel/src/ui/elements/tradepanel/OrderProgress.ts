import OrderProgressHtml from "../../../html/elements/tradepanel/OrderProgress.html";
import WidgetGlobals from "../../../WidgetGlobals";

export default class OrderProgress {
  template: any = undefined;
  progressNr: number = 0;
  private static instance: OrderProgress = new OrderProgress();

  private constructor() {
    this.template = WidgetGlobals.HandlebarsInstance.compile(OrderProgressHtml);
  }

  public static getInstance() {
    return this.instance;
  }

  public render() {
    let dom = document.querySelector(".tradeSwitch");
    if (!dom) return;

    dom.outerHTML = this.renderToString();
  }

  public renderToString() {
    return this.template();
  }

  public clearProgressText() {
    let executingOrderProgress = document.getElementById(
      "executing-order-progress"
    );
    executingOrderProgress?.classList.add("hidden");
    this.progressNr = 0;
  }

  public setProgressText(
    progressNr: number,
    text: string,
    hash?: string,
    hideInSeconds?: number
  ) {
    console.log("thisNr", this.progressNr, "nr", progressNr, "text", text);
    if (progressNr < this.progressNr) return;

    let executingOrderProgress = document.getElementById(
      "executing-order-progress"
    );
    if (!executingOrderProgress) return;

    let progressText = document.getElementById("progress-text");
    if (!progressText) return;

    let networkInfo = WidgetGlobals.Network;
    progressText.innerHTML =
      text +
      '<br /><a href="' +
      networkInfo.BlockExplorer +
      "/tx/" +
      hash +
      '" target="_blank" style="font-size:10px">View</a>';
    executingOrderProgress.classList.remove("hidden");
    this.progressNr = progressNr;

    if (hideInSeconds) {
      setTimeout(() => {
        this.clearProgressText();
      }, hideInSeconds * 1000);
    }
  }
}
