import AuthenticateService from "../backend/AuthenticateService";
import BaseService from "../backend/BaseService";
import WidgetGlobals from "../../WidgetGlobals";
import { ethers } from "ethers";
import ContractInfo from "../../contracts/ContractInfo";
import Network from "../../networks/Network";
import ContractAddresses from "../../contracts/ContractAddresses";

export default class BlockchainService extends BaseService {
  network: Network;
  contracts: ContractAddresses;

  constructor() {
    super();
    this.network = WidgetGlobals.Network;
    this.contracts = ContractInfo.getContractInfo(this.network.Name);
  }

  protected async loadEther() {
    if (WidgetGlobals.User.ether) return;
    await AuthenticateService.enableWeb3();
  }

  public async getNativeBalance() {
    const balanceInWei = await WidgetGlobals.User.ether.getBalance(
      WidgetGlobals.User.address
    );

    const balanceInEther = ethers.utils.formatEther(balanceInWei);
    return balanceInEther;
  }

  balanceOfAbi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  transferAbi = ["function transfer(address to, uint amount)"];
}
