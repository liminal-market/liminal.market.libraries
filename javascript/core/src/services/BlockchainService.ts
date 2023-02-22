import {BigNumberish, ethers} from "ethers";
import LiminalMarket from "../index";
import HttpRequest from "../http/HttpRequest";

export default class BlockchainService {

    httpRequest: HttpRequest;

    constructor() {
        this.httpRequest = new HttpRequest();
    }
    public async executeOrder(side : string, symbol : string, quantity : BigNumberish,
                               orderExecutedEvent? : (event : any) => Promise<void> | undefined
    ) : Promise<any> {
        let amountOrQty = 'quantity';
        let qty = ethers.utils.formatEther(quantity);
        if (side == 'buy') {
            amountOrQty = 'amount'
            qty = '$' + qty;
        }

        let time = new Date();
        let signMessage = 'I confirm following order:\n' + side + ' ' + symbol + ' for the ' + amountOrQty + ' of ' + qty;
        signMessage += '\n\n---------------';
        signMessage += '\nChainId:' + LiminalMarket.Network.ChainId;
        signMessage += '\nServiceContract:' + LiminalMarket.ServiceContractAddress
        signMessage += '\nTime:' + time.toISOString()

        let signedMessage = await LiminalMarket.Signer.signMessage(signMessage);

        let response = await this.httpRequest.postAuth('/executeOrder', {
            signMessage : signMessage,
            signedMessage : signedMessage,
            side : side,
            symbol : symbol,
            qty : qty,
            spender : LiminalMarket.ServiceContractAddress,
            chainId : LiminalMarket.Network.ChainId,
            time : time.getTime()
        })

        console.log('signMessage', response);
        if (orderExecutedEvent) orderExecutedEvent(response);

        return response;
        /*
        let contractAddress = LiminalMarket.Network.AUSD_ADDRESS;

        const lookupContract = new ethers.Contract(LiminalMarket.Network.LIMINAL_MARKET_ADDRESS, Abis.LiminalMarketAbi, LiminalMarket.Provider);
        const securityTokenAddress = await lookupContract['getSecurityToken']!(symbol);

        let sendTo = '';
        if (method == 'buySecurityToken') {
            sendTo = securityTokenAddress;

            if (sendTo == Helper.AddressZero) {
                console.log('Need to create token first');
            }
        } else {
            contractAddress = securityTokenAddress;
            sendTo = LiminalMarket.Network.AUSD_ADDRESS;
        }

        const contract = new ethers.Contract(contractAddress, Abis.TransferAbi, LiminalMarket.Signer);
        if (orderExecutedEvent) {
            console.log('listen to contract event')
            const liminalMarketContract = new ethers.Contract(LiminalMarket.Network.LIMINAL_MARKET_ADDRESS, Abis.LiminalMarketAbi, LiminalMarket.Provider);
            liminalMarketContract.on('OrderExecuted', (recipient: string, symbol: string, tsl: BigNumberish, filledQty: BigNumberish, filledAvgPrice: BigNumberish, side: string, filledAt: BigNumberish, totalServiceFee: BigNumberish, aUsdBalance: BigNumberish, spender: string, blockInfo : any) => {
                let OrderExecutedEvent = {recipient, symbol, tsl, filledQty, filledAvgPrice, side, filledAt, totalServiceFee, aUsdBalance, spender, blockInfo} as OrderExecutedEvent;
                orderExecutedEvent(OrderExecutedEvent)
            })
        }
        try {
            let response = await contract['transfer']!(sendTo, quantity);

            return response;
        } catch (e : any) {
            throw new BlockchainError(e)
        }*/
    }


}