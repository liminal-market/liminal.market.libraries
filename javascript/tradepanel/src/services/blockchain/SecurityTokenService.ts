import LiminalMarketService from "./LiminalMarketService";
import { AddressZero } from "../../util/Helper";
import BigNumber from "bignumber.js";
import BlockchainService from "./BlockchainService";
import { ethers } from "ethers";

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
