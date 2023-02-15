import NetworkInfo from "../../../networks/NetworkInfo";
import UserService from "../../../services/backend/UserService";
import AuthenticateService from "../../../services/backend/AuthenticateService";
import ConnectWallet from "../ConnectWallet";
import KYCService from "../../../services/blockchain/KYCService";
import AUSDService from "../../../services/blockchain/AUSDService";
import FakeAUSDFund from "../../modals/Funding/FakeAUSDFund";
import SecurityTokenService from "../../../services/blockchain/SecurityTokenService";
import LiminalMarketService from "../../../services/blockchain/LiminalMarketService";
import { AddressZero, showBar } from "../../../util/Helper";
import TradePanelInput from "./TradePanelInput";
import ExecuteOrderButtonHtml from "../../../html/elements/tradepanel/ExecuteOrderButton.html";
import BlockchainError from "../../../errors/BlockchainError";
import NativeTokenNeeded from "../../modals/NativeTokenNeeded";
import BigNumber from "bignumber.js";
import KycStatusHandler from "../../modals/KYC/KycStatusHandler";
import AUsdBalance from "../AUsdBalance";
import KycApproved from "../../modals/KYC/KycApproved";
import OrderProgress from "./OrderProgress";
import TradePanelWidget from "../../../TradePanelWidget";

export default class ExecuteOrderButton {
  authenticateService: AuthenticateService;
  sellTradeInput: TradePanelInput;
  buyTradeInput: TradePanelInput;
  template: any;
  button: HTMLInputElement;
  static Instance: ExecuteOrderButton;

  constructor(sellTradeInput: TradePanelInput, buyTradeInput: TradePanelInput) {
    this.sellTradeInput = sellTradeInput;
    this.buyTradeInput = buyTradeInput;
    this.authenticateService = new AuthenticateService();
    this.template = Handlebars.compile(ExecuteOrderButtonHtml);
    this.button = document.getElementById(
      "liminal_market_execute_order"
    ) as HTMLInputElement;

    ExecuteOrderButton.Instance = this;
  }

  public renderToString(): string {
    return this.template(this);
  }

  public async renderButton() {
    this.button.outerHTML = this.button.outerHTML;
    this.button = document.getElementById(
      "liminal_market_execute_order"
    ) as HTMLInputElement;

    this.loadingButton(this.button);

    //wallet connected
    if (!this.walletIsConnected(this.button)) {
      return;
    }
    //user logged in
    if (!(await this.userIsLoggedIn(this.button))) {
      return;
    }
    //chain id correct
    if (!this.chainIdIsCorrect(this.button)) {
      return;
    }
    //native token is available
    if (!(await this.userHasNativeToken(this.button))) {
      return;
    }
    //kyc is done
    if (!(await this.kycIsDone(this.button))) {
      return;
    }
    //ausd is setup
    if (!(await this.userHasAUSD(this.button))) {
      return;
    }

    //ausd > buy amount
    if (!(await this.userHasEnoughQty(this.button))) {
      return;
    }

    if (!this.hasQuantityAndSymbol(this.button)) {
      return;
    }

    if (!(await this.isMarketOpen(this.button))) {
      return;
    }

    this.enableExecuteOrder(this.button);
  }

  private enableExecuteOrder(button: HTMLElement) {
    //if (this.sellTradeInput.quantity.eq(0)) return;

    //execute trade can be done
    button.innerHTML = "Execute trade";
    button.classList.replace("disabled", "enabled");
    this.stopLoadingButton(button);

    button.addEventListener("click", async () => {
      this.loadingButton(button);

      button.innerHTML = "Confirm transaction in your wallet";

      if (this.sellTradeInput.symbol == "aUSD") {
        let liminalMarketService = new LiminalMarketService();
        let symbolAddress = await liminalMarketService.getSymbolContractAddress(
          this.buyTradeInput.symbol
        );

        if (symbolAddress === AddressZero) {
          let result = await liminalMarketService
            .createToken(this.buyTradeInput.symbol, () => {
              button.innerHTML = "Creating token. Give it few seconds";
            })
            .finally(() => {
              this.stopLoadingButton(button);
              button.innerHTML = "Execute trade";
            });
          if (result instanceof BlockchainError) {
            showBar("Error:" + result.message);
            console.error(result);
            return;
          }
          symbolAddress = result as string;
        }

        await this.executeTransfer(
          symbolAddress,
          this.sellTradeInput.quantity,
          new AUSDService(),
          button
        );
      } else {
        let liminalMarketService = new LiminalMarketService();
        let symbolAddress = await liminalMarketService.getSymbolContractAddress(
          this.sellTradeInput.symbol
        );

        await this.executeTransfer(
          symbolAddress,
          this.sellTradeInput.quantity,
          new SecurityTokenService(),
          button
        );
      }
    });
  }

  private async executeTransfer(
    symbolAddress: string,
    quantity: BigNumber,
    service: AUSDService | SecurityTokenService,
    button: HTMLElement
  ) {
    await service
      .transfer(symbolAddress, quantity)
      .then((transaction) => {
        button.innerHTML = "Execute trade";
        if (!transaction) return;
        OrderProgress.getInstance().setProgressText(
          0,
          "Sending to blockchain",
          transaction.hash
        );
      })
      .catch((reason) => {
        let msg = reason.toString();
        console.log("CATCH - contract.transfer", reason);
        if (msg.indexOf("Market is closed") != -1) {
          this.button.innerHTML = "Market is closed";
        } else {
          button.innerHTML = "Execute trade";
        }
      })
      .finally(() => {
        this.stopLoadingButton(button);
      });
  }

  private loadingButton(button: HTMLElement) {
    button.setAttribute("aria-busy", "true");
  }

  private stopLoadingButton(button: HTMLElement) {
    button.removeAttribute("aria-busy");
  }

  private walletIsConnected(button: HTMLElement) {
    if (TradePanelWidget.User.provider) return true;

    button.innerHTML = "Connect wallet";
    button.addEventListener("click", async (evt) => {
      let connectWallet = new ConnectWallet();
      await connectWallet.connectWallet(evt.target as HTMLElement);
    });
    this.stopLoadingButton(button);
    return false;
  }

  private async userIsLoggedIn(button: HTMLElement) {
    if (TradePanelWidget.User.isLoggedIn) return true;

    button.innerHTML = "Login";
    button.addEventListener("click", async () => {
      await this.authenticateService.authenticateUser();
    });
    this.stopLoadingButton(button);
    return false;
  }

  private chainIdIsCorrect(button: HTMLElement) {
    let chainId = TradePanelWidget.User.chainId;
    if (chainId === TradePanelWidget.Network.ChainId) return true;

    let usersWalletNetwork = NetworkInfo.getNetworkInfoByChainId(chainId);
    if (usersWalletNetwork) {
      NetworkInfo.setNetworkByChainId(chainId);
      return true;
    }

    button.innerHTML = "Switch Network";
    button.addEventListener("click", async () => {
      await TradePanelWidget.Network.addNetworkToWallet();
    });
    this.stopLoadingButton(button);
    return false;
  }

  private async userHasNativeToken(button: HTMLElement): Promise<boolean> {
    let networkInfo = TradePanelWidget.Network;
    let hasEnoughNativeTokens = await networkInfo.hasEnoughNativeTokens();
    if (hasEnoughNativeTokens) return true;

    button.classList.replace("enabled", "disabled");

    button.innerHTML =
      "You need " +
      networkInfo.NativeCurrencyName +
      " tokens. Click me for some tokens";
    button.addEventListener("click", () => {
      let nativeTokenNeededModal = new NativeTokenNeeded(() => {
        this.renderButton();
      });
      nativeTokenNeededModal.show();
    });

    this.stopLoadingButton(button);
    return false;
  }

  kycIdDoneTimeout: any;

  private async kycIsDone(button: HTMLElement) {
    let kycService = new KYCService();
    let kycResponse = await kycService.hasValidKYC();

    if (!kycResponse.isValidKyc) {
      let kycStatusHandler = new KycStatusHandler(kycResponse, this);
      button.innerHTML = kycStatusHandler.getButtonText();
      button.addEventListener(
        "click",
        kycStatusHandler.getButtonClickEvent(this)
      );

      if (kycResponse.status == "ACTIVE") {
        this.loadingButton(button);

        this.kycIdDoneTimeout = setInterval(async () => {
          kycResponse = await kycService.hasValidKYC();
          if (kycResponse.isValidKyc) {
            this.hasBuyingPower = kycResponse.hasBuyingPower;
            if (!this.hasBuyingPower) {
              let kycApproved = new KycApproved();
              kycApproved.show();
            }
            clearInterval(this.kycIdDoneTimeout);
            await this.renderButton();
          }
        }, 30 * 1000);
      } else {
        this.stopLoadingButton(button);
      }

      return false;
    }

    this.stopLoadingButton(button);

    return true;
  }

  checkBalanceInterval: any;
  hasBuyingPower = false;

  private async userHasAUSD(button: HTMLElement): Promise<boolean> {
    let ausdService = new AUSDService();
    let balance = await ausdService.getAUSDBalanceOf(
      TradePanelWidget.User.address
    );
    if (balance.isGreaterThan(0)) return true;

    if (this.hasBuyingPower) {
      button.innerHTML = "We are funding your aUSD token";
      this.checkBalanceInterval = setInterval(async () => {
        AUSDService.lastUpdate = undefined;

        let balance = await ausdService.getAUSDBalanceOf(
          TradePanelWidget.User.address
        );
        if (balance.isGreaterThan(0)) {
          await AUsdBalance.forceLoadAUSDBalanceUI();

          clearInterval(this.checkBalanceInterval);
          await this.renderButton();
        }
      }, 10 * 1000);

      return false;
    }

    if (TradePanelWidget.Network.TestNetwork) {
      button.innerHTML = "You need aUSD. Click here to get some";
    } else {
      button.innerHTML = "You need aUSD. Click here for instructions";
    }
    button.addEventListener("click", () => {
      let ausdFund = new FakeAUSDFund();
      ausdFund.showAUSDFakeFund();
    });

    this.stopLoadingButton(button);
    return false;
  }

  private async userHasEnoughQty(button: HTMLElement) {
    let ausdService = new AUSDService();
    if (this.sellTradeInput.symbol == "aUSD") {
      let balance = await ausdService.getAUSDBalanceOf(
        TradePanelWidget.User.address
      );
      if (balance.isGreaterThanOrEqualTo(this.sellTradeInput.quantity))
        return true;

      button.innerHTML = "You don't have enough aUSD. Click for more funding";
      button.addEventListener("click", () => {
        let ausdFund = new FakeAUSDFund();
        ausdFund.showAUSDFakeFund();
      });
    } else {
      let securityTokenService = new SecurityTokenService();
      let userQuantity = await securityTokenService.getQuantityByAddress(
        this.sellTradeInput.symbol,
        TradePanelWidget.User.address
      );
      if (this.sellTradeInput.quantity <= userQuantity) return true;

      button.innerHTML = "You don't have enough " + this.sellTradeInput.symbol;
      button.classList.replace("disable", "enable");
    }
    this.stopLoadingButton(button);
    return false;
  }

  private async isMarketOpen(button: HTMLElement): Promise<boolean> {
    let userService = new UserService();
    let isMarketOpen = await userService.isMarketOpenOrUserOffHours();
    if (isMarketOpen) return true;

    button.innerHTML = "Market is closed";
    button.classList.replace("enabled", "disabled");

    this.stopLoadingButton(button);

    return false;
  }

  private hasQuantityAndSymbol(button: HTMLElement) {
    if (this.sellTradeInput.quantity.eq(0)) {
      button.innerHTML = "Type in quantity";
      this.stopLoadingButton(button);
      return false;
    }

    if (this.buyTradeInput.name == "") {
      button.innerHTML = "Select stock to buy";
      this.stopLoadingButton(button);
      return false;
    }
    return true;
  }
}
