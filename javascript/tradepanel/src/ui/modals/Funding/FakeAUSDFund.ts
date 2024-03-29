import FakeFundingHtml from "../../../html/modal/Funding/FakeFunding.html";
import Modal from "../Modal";
import WalletHelper from "../../../util/WalletHelper";
import ContractInfo from "../../../contracts/ContractInfo";
import UserService from "../../../services/backend/UserService";
import { roundBigNumber } from "../../../util/Helper";
import AUSDFund from "./AUSDFund";
import { BigNumber } from "ethers";
import WidgetGlobals from "../../../WidgetGlobals";

export default class FakeAUSDFund {
  currentBalance: BigNumber;
  modal: Modal;

  constructor() {
    this.currentBalance = BigNumber.from(-1);
    this.modal = new Modal();
  }

  public showAUSDFund() {
    let aUsdFund = new AUSDFund();
    aUsdFund.show();
  }

  public static writingToChain() {
    let element = document.getElementById("fake_funding_writing_to_ausd");
    element?.classList.remove("hidden");
  }

  public showAUSDFakeFund() {
    let networkInfo = WidgetGlobals.Network;
    if (!networkInfo.TestNetwork) {
      this.showAUSDFund();
      return;
    }

    let template = WidgetGlobals.HandlebarsInstance.compile(FakeFundingHtml);

    let contractInfo = ContractInfo.getContractInfo();
    let content = template({ aUSDAddress: contractInfo.AUSD_ADDRESS });

    this.modal.showModal("Fund my account (Fake money)", content);

    let addToWallet = document.getElementById("addTokenToWallet");
    addToWallet?.addEventListener("click", async (evt) => {
      let contractInfo = ContractInfo.getContractInfo();

      let walletHelper = new WalletHelper();
      let result = await walletHelper.addTokenToWallet(
        contractInfo.AUSD_ADDRESS,
        "aUSD",
        () => {
          this.showCopyField();
        }
      );
      if (!result) this.showCopyField();
    });

    let registerBankInfo = document.getElementById("registerBankInfo");
    registerBankInfo?.addEventListener("click", (evt) => {
      this.modal.hideModal();

      let aUsdFund = new AUSDFund();
      aUsdFund.show();
    });

    let requestFakeAUSD = document.getElementById("requestFakeAUSD");
    requestFakeAUSD?.addEventListener("click", async (evt) => {
      requestFakeAUSD!.setAttribute("aria-busy", "true");

      let result = await WidgetGlobals.LiminalMarket!.fundSandboxAccount(
        async (obj) => {
          console.log("Funding is done", obj);
        }
      );
      if (!result) return;

      if (!result.success) {
        let fundingError = document.getElementById("fundingError");
        if (fundingError) {
          requestFakeAUSD!.removeAttribute("aria-busy");
          fundingError.classList.remove("d-none");
          fundingError.innerHTML = result.message;
          setTimeout(() => {
            fundingError!.classList.add("d-none");
          }, 10 * 1000);
        }
      } else if (result.success) {
        let beforeFunding = document.getElementById("beforeFunding");
        let afterFunding = document.getElementById("afterFunding");
        if (!beforeFunding || !afterFunding) return;

        await this.loadAUSDBalance();
        beforeFunding.classList.add("d-none");
        afterFunding.classList.remove("d-none");
      } else {
        this.errorWhileFunding(result);
      }
      //callback();
    });
  }

  private async loadAUSDBalance() {
    let currentAUSDBalance = document.getElementById("currentAUSDBalance");
    if (!currentAUSDBalance) return;

    let userService = new UserService();
    let ethAddress = userService.getEthAddress();

    let amount = BigNumber.from(0);
    if (ethAddress) {
      amount = await WidgetGlobals.LiminalMarket.getAUSDBalance(ethAddress);
    }
    currentAUSDBalance.innerHTML = "$" + roundBigNumber(amount).toString();

    if (this.currentBalance.eq(-1)) {
      this.currentBalance = amount;
    }

    if (this.currentBalance.eq(amount)) {
      setTimeout(async () => {
        await this.loadAUSDBalance();
      }, 5 * 1000);
    } else {
      window.location.reload();
    }
  }

  private showCopyField() {
    let needToCopy = document.getElementById("needToCopy");
    if (!needToCopy) return;

    needToCopy.classList.remove("d-none");
  }

  private errorWhileFunding(result: any) {
    let beforeFunding = document.getElementById("beforeFunding");
    let errorAfterFunding = document.getElementById("errorAfterTryFunding");
    if (!beforeFunding || !errorAfterFunding) return;

    if (result.message) {
      errorAfterFunding.innerHTML = result.message;
    }
    beforeFunding.classList.add("d-none");
    errorAfterFunding.classList.remove("d-none");
  }
}
