import BaseService from "../backend/BaseService";
import Network from "../../networks/Network";
import ContractAddresses from "../../contracts/ContractAddresses";
import BigNumber from "bignumber.js";
export default class BlockchainService extends BaseService {
    network: Network;
    contracts: ContractAddresses;
    constructor();
    protected getBalanceOf(tokenAddress: any, ethAddress: string): Promise<BigNumber>;
    protected transferInner(tokenAddress: string, to: string, qty: BigNumber): Promise<any>;
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
