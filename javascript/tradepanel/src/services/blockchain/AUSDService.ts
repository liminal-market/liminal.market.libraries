import { BigNumber } from "ethers";
import BlockchainService from "./BlockchainService";

type ListenerAction = (...args: Array<any>) => void;

export default class AUSDService extends BlockchainService {
  private static AUSDInfo: any;
  public static lastUpdate?: Date;
  static onAUsdLoad: Array<ListenerAction> = [];

  constructor() {
    super();
  }

  public async transfer(symbolAddress: string, qty: BigNumber) {
    let result = await super.transferInner(
      this.contracts.AUSD_ADDRESS,
      symbolAddress,
      qty
    );
    AUSDService.lastUpdate = undefined;
    return result;
  }

  public async getAUsdAbi() {
    if (AUSDService.AUSDInfo) return AUSDService.AUSDInfo.abi;

    let response = await fetch("https://app.liminal.market/abi/aUSD.json");
    AUSDService.AUSDInfo = await response.json();
    return AUSDService.AUSDInfo.abi;
  }
}
