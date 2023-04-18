import BlockchainService from "./BlockchainService";
import { ethers } from "ethers";
import WidgetGlobals from "../../WidgetGlobals";

export default class LiminalMarketService extends BlockchainService {
  constructor() {
    super();
  }

  public async getSymbolContractAddress(symbol: string): Promise<string> {
    await this.loadEther();

    const contract = new ethers.Contract(
      this.contracts.LIMINAL_MARKET_ADDRESS,
      this.getSecurityTokenAbi,
      WidgetGlobals.User.ether
    );
    return await contract.getSecurityToken(symbol);
  }

  getSecurityTokenAbi = [
    {
      inputs: [
        {
          internalType: "string",
          name: "symbol",
          type: "string",
        },
      ],
      name: "getSecurityToken",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  createTokenAbi = [
    {
      inputs: [
        {
          internalType: "string",
          name: "symbol",
          type: "string",
        },
      ],
      name: "createToken",
      outputs: [
        {
          internalType: "contract SecurityToken",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
}
