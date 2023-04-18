import BaseService from "../backend/BaseService";
import { BigNumber } from "ethers";
import Network from "../../networks/Network";
import ContractAddresses from "../../contracts/ContractAddresses";
export default class BlockchainService extends BaseService {
    network: Network;
    contracts: ContractAddresses;
    constructor();
    protected getBalanceOf(tokenAddress: any, ethAddress: string): Promise<BigNumber>;
    protected loadEther(): Promise<void>;
    getNativeBalance(): Promise<string>;
    balanceOfAbi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    transferAbi: string[];
}
