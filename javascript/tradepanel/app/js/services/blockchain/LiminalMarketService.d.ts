import BlockchainError from "../../errors/BlockchainError";
import BlockchainService from "./BlockchainService";
export default class LiminalMarketService extends BlockchainService {
    private static LiminalMarketInfo;
    constructor();
    getSymbolContractAddress(symbol: string): Promise<string>;
    createToken(symbol: string, creatingToken: () => void): Promise<string | BlockchainError>;
    getSecurityTokenAbi: {
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
    createTokenAbi: {
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
}
