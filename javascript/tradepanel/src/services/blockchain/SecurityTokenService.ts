import LiminalMarketService from "./LiminalMarketService";
import { AddressZero } from "../../util/Helper";
import BlockchainService from "./BlockchainService";
import { BigNumber, ethers } from "ethers";

export default class SecurityTokenService extends BlockchainService {
  constructor() {
    super();
  }

  public async transfer(symbolAddress: string, qty: BigNumber) {
    let result = super.transferInner(
      symbolAddress,
      this.contracts.AUSD_ADDRESS,
      qty
    );
    return result;
  }
}
