import AUSDService from "../../services/blockchain/AUSDService";
import { roundBigNumber } from "../../util/Helper";
import FakeAUSDFund from "../modals/Funding/FakeAUSDFund";
import AUSDFund from "../modals/Funding/AUSDFund";
import WithdrawModal from "../modals/Funding/WithdrawModal";
import WalletHelper from "../../util/WalletHelper";
import ContractInfo from "../../contracts/ContractInfo";
import Modal from "../modals/Modal";
import AddToWalletHtml from "../../html/elements/AddToWallet.html";
import WidgetGlobals from "../../WidgetGlobals";
import AuthenticateService from "../../services/backend/AuthenticateService";
import BigNumber from "bignumber.js";

export default class AUsdBalance {
  constructor() {}

  public static async forceLoadAUSDBalanceUI() {
    let ui = new AUsdBalance();
    AUSDService.lastUpdate = undefined;
    await ui.loadAUSDBalanceUI();
  }

  public async loadAUSDBalanceUI() {
    if (!WidgetGlobals.User.ether) {
      await AuthenticateService.enableWeb3();
      if (!WidgetGlobals.User.ether) return;
    }

    let aUSDService = new AUSDService();
    let aUsdValueWei = await aUSDService.getAUSDBalanceOf(
      WidgetGlobals.User.address
    );

    this.updateUIBalance(aUsdValueWei);

    this.bindEvents();
  }

  private bindEvents() {
    let networkInfo = WidgetGlobals.Network;
    let add_aUSD_to_wallet = document.querySelectorAll(".add_aUSD_to_wallet");
    add_aUSD_to_wallet.forEach((element) => {
      element.addEventListener("click", async (evt) => {
        evt.preventDefault();

        let contractInfo = ContractInfo.getContractInfo(networkInfo.Name);
        let walletHelper = new WalletHelper();
        await walletHelper.addTokenToWallet(
          contractInfo.AUSD_ADDRESS,
          "aUSD",
          () => {
            let template =
              WidgetGlobals.HandlebarsInstance.compile(AddToWalletHtml);
            let obj = { symbol: "aUSD", address: contractInfo.AUSD_ADDRESS };
            let modal = new Modal();
            modal.showModal("Add aUSD token", template(obj));
          }
        );
      });
    });

    let fund_accountButtons = document.querySelectorAll(".fund_account");
    fund_accountButtons.forEach((element) => {
      let aUSDFundingModal = new FakeAUSDFund();
      if (networkInfo.TestNetwork) {
        element.innerHTML = "Click for some aUSD";
        element.addEventListener("click", (evt) => {
          evt.preventDefault();
          aUSDFundingModal.showAUSDFakeFund();
        });
      } else {
        element.addEventListener("click", async (evt) => {
          evt.preventDefault();
          let aUsdFund = new AUSDFund();
          await aUsdFund.show();
        });
      }
    });

    let withdraw_from_account = document.getElementById(
      "withdraw_from_account"
    );
    withdraw_from_account?.addEventListener("click", async (evt) => {
      evt.preventDefault();

      let withdrawModal = new WithdrawModal();
      await withdrawModal.show();
    });
  }

  public updateUIBalance(aUsdValueWei: BigNumber) {
    let aUsdValue = roundBigNumber(aUsdValueWei);

    let balance_value = document.querySelector(".balance_value") as HTMLElement;
    if (balance_value) {
      balance_value.innerHTML = "$" + aUsdValue.toFixed();
      balance_value.title = aUsdValueWei.toFixed();
      balance_value.dataset["tooltip"] = aUsdValueWei.toFixed();
    }

    if (aUsdValue.isLessThan(10)) {
      let frontpage_fund_account = document.getElementById(
        "frontpage_fund_account"
      );
      frontpage_fund_account?.classList.remove("hidden");
    }

    let userInfoAUsdBalance = document.getElementById("userInfoAUsdBalance");
    let frontpageAUsdBalance = document.getElementById("frontpageAUsdBalance");

    if (!WidgetGlobals.User.alpacaId) {
      frontpageAUsdBalance?.classList.add("hidden");
      userInfoAUsdBalance?.classList.add("hidden");
    } else {
      frontpageAUsdBalance?.classList.remove("hidden");
      userInfoAUsdBalance?.classList.remove("hidden");
    }
    let frontpageAUSDBalance = document.getElementById(
      "front_page_aUSD_balance"
    );
    if (frontpageAUSDBalance)
      frontpageAUSDBalance.innerHTML = "$" + aUsdValue.toString();

    let user_info_ausd_balance = document.getElementById(
      "user_info_ausd_balance"
    );
    if (user_info_ausd_balance)
      user_info_ausd_balance.innerHTML = "$" + aUsdValue.toString();
  }
}
