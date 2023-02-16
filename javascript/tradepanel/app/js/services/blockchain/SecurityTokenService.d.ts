import BigNumber from "bignumber.js";
import BlockchainService from "./BlockchainService";
export default class SecurityTokenService extends BlockchainService {
    private static SecurityTokenInfo;
    constructor();
    getQuantityByAddress(symbol: string, ethAddress: string): Promise<BigNumber>;
    transfer(symbolAddress: string, qty: BigNumber): Promise<any>;
}
