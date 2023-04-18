/* global window */
import { ethers } from "ethers";
import AbstractWeb3Connector from "./AbstractWeb3Connector";
import WidgetGlobals from "../WidgetGlobals";

export default class MagicWeb3Connector extends AbstractWeb3Connector {
  type = "MagicLink";
  magic: any | undefined;
  ether: ethers.providers.Web3Provider | null = null;

  async activate() {
    let networkInfo = WidgetGlobals.Network;
    this.ether = new ethers.providers.Web3Provider(WidgetGlobals.User.ether);
    let accounts = await this.ether.listAccounts();
    console.log("accounts after new Magic", accounts);
    // Assign Constants
    this.account = accounts[0];
    this.provider = this.ether.provider;
    this.chainId = networkInfo.ChainId;

    this.subscribeToEvents(this.provider);
    return {
      provider: this.provider,
      account: this.account,
      chainId: this.chainId,
      ether: this.ether,
      magic: this.magic,
      signer: this.ether.getSigner(),
    };
  }

  deactivate = async () => {
    this.unsubscribeToEvents(this.provider);
    if (this.magic) {
      await this.magic.connect.disconnect().catch((e: any) => {
        console.error("error to disconnect:", e);
      });
    }
    this.account = null;
    this.chainId = null;
    this.provider = null;
  };
}
