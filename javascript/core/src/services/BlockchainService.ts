import {BigNumberish, ethers} from "ethers";
import LiminalMarket from "../index";
import HttpRequest from "../http/HttpRequest";
import ExecuteOrderResult from "../dto/ExecuteOrderResult";

export default class BlockchainService {

    httpRequest: HttpRequest;

    constructor() {
        this.httpRequest = new HttpRequest();
    }
    public async executeOrder(side : string, symbol : string, quantity : BigNumberish) : Promise<ExecuteOrderResult> {
        if (symbol.toLowerCase() == 'ausd') {
            throw new Error('You cannot send order for aUSD.')
        }

        let amountOrQty = 'quantity';
        let qty = ethers.utils.formatEther(quantity);
        if (side == 'buy') {
            amountOrQty = 'amount'
            qty = '$' + qty;
        }

        let time = new Date();
        let signMessage = `I confirm following order:\n${side} ${symbol} for the ${amountOrQty} of ${qty}

---------------
ChainId:${LiminalMarket.Network.ChainId}
ServiceContract:${LiminalMarket.ServiceContractAddress}
Time:${time.toISOString()}
`;
        let signedMessage = await LiminalMarket.Signer.signMessage(signMessage);


        return await this.httpRequest.postAuth('/executeOrder', {
            signedMessage : signedMessage,
            side : side,
            symbol : symbol,
            qty : quantity,
            spender : LiminalMarket.ServiceContractAddress,
            chainId : LiminalMarket.Network.ChainId,
            time : time.getTime()
        }) as ExecuteOrderResult;
    }


}