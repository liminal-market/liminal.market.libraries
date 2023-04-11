import {OrderSide} from "./OrderSide";

export default class OrderDto {
    confirmed : boolean = false
    status : string = '';
    walletAddress : string = '';
    chainId: number = 0;
    symbol: string = '';
    side: OrderSide = OrderSide.buy;
    amountWei: string = '';
    amount: number = 0;
    accountId: string = '';
    spender: string = '';
    brokerOrderId: string = '';
    clientOrderId: string = '';
    signMessage: string = '';
    signedMessage: string = '';
    signedTime : string = '';
}