import {
  roundBigNumberDecimal,
  roundNumberDecimal,
  shortEth,
} from "../../../util/Helper";
import AUsdBalance from "../AUsdBalance";
import ProviderInfo from "../../../wallet/ProviderInfo";
import WidgetGlobals from "../../../WidgetGlobals";
import Modal from "../../modals/Modal";
import WalletHelper from "../../../util/WalletHelper";
import TradeExecutedHtml from "../../../html/elements/tradepanel/TradeExecuted.html";
import OrderProgress from "./OrderProgress";
import * as confetti from "canvas-confetti";
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";

export default class OrderExecutedModal {
  public async show(object: any) {
    await AUsdBalance.forceLoadAUSDBalanceUI();

    OrderProgress.getInstance().clearProgressText();

    let providerInfo = ProviderInfo.Instance;
    let networkInfo = WidgetGlobals.Network;
    let isBuy = object.side == "buy";

    let obj = isBuy
      ? this.getBuyingSharesObj(object)
      : this.getSellSharesObj(object);
    obj.walletName = providerInfo?.WalletName ?? "";
    obj.blockExplorerLink =
      networkInfo.BlockExplorer + "/tx/" + object.transaction_hash;

    let template = WidgetGlobals.HandlebarsInstance.compile(TradeExecutedHtml);
    let content = template(obj);
    let modal = new Modal();
    modal.showModal("Trade executed", content);

    let myCanvas = document.createElement("canvas");
    myCanvas.id = "confetti";
    document.querySelector(".trade_executed")!.appendChild(myCanvas);

    let myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true,
    });
    myConfetti({ particleCount: 200, spread: 200 });

    let addTokenToWallet = document.getElementById("addTokenToWallet");
    if (!addTokenToWallet) return;

    addTokenToWallet.addEventListener("click", (evt) => {
      let address = (evt.target as HTMLElement).dataset.address as string;
      let walletHelper = new WalletHelper();
      walletHelper.addTokenToWallet(address, obj.buyingSymbol, () => {
        let addTokenToWalletFailed = document.getElementById(
          "addTokenToWalletFailed"
        );
        if (!addTokenToWalletFailed) return;

        addTokenToWalletFailed.classList.remove("d-none");
      });
    });
  }

  public getBuyingSharesObj(object: any): any {
    let ethAddress = object.walletAddress;
    let tokenAddress = object.tokenAddress;
    let buyingQuantity = object.filled_qty;
    let sellingAmount = "$" + object.amount;

    return {
      sellingLogo: "/img/logos/aUSD.png",
      sellingSymbol: "aUSD",
      sellingAmount: sellingAmount,
      buyingLogo: "/img/logos/" + object.symbol + ".png",
      buyingSymbol: object.symbol,
      buyingQuantity: buyingQuantity,
      buyingRoundQuantity: roundNumberDecimal(buyingQuantity, 6) + " shares",
      shortEthAddress: shortEth(ethAddress),
      ethAddress: ethAddress,
      tokenAddress: tokenAddress,
      chainId: WidgetGlobals.Network.ChainId,
    };
  }

  public getSellSharesObj(object: any): any {
    let ethAddress = object.sender;
    let tokenAddress = object.recipient;
    let buyingQuantity = BigNumber.from(object.filled_avg_price).mul(
      BigNumber.from(object.filled_qty)
    );
    let sellingAmount = object.filled_qty;

    return {
      sellingLogo: "/img/logos/" + object.symbol + ".png",
      sellingSymbol: object.symbol,
      sellingAmount: sellingAmount + " shares",
      buyingLogo: "/img/logos/aUSD.png",
      buyingSymbol: "aUSD",
      buyingQuantity: formatUnits(buyingQuantity),
      buyingRoundQuantity:
        "$" + formatUnits(roundBigNumberDecimal(buyingQuantity, 6)),
      shortEthAddress: shortEth(ethAddress),
      ethAddress: ethAddress,
      tokenAddress: tokenAddress,
      chainId: WidgetGlobals.Network.ChainId,
    };
  }
}
