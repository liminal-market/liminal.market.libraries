import localhostContractAddresses from "./localhost-contract-addresses";
import mumbaiContractAddresses from "./mumbai-contract-addresses";
import fujiContractAddresses from "./fuji-contract-addresses";
import ContractAddresses from "./ContractAddresses";
import NetworkInfo from "../networks/NetworkInfo";
import polygonContractAddresses from "./polygon-contract-addresses";
import TradePanelWidget from "../TradePanelWidget";

export default class ContractInfo {
  public static getContractInfo(networkName?: string): ContractAddresses {
    let contractInfos: any = {
      localhostContractAddresses,
      mumbaiContractAddresses,
      fujiContractAddresses,
      polygonContractAddresses,
    };

    if (!networkName) {
      networkName = TradePanelWidget.Network.Name;
    }
    const contractInfoType = contractInfos[networkName + "ContractAddresses"];
    return new contractInfoType();
  }
}
