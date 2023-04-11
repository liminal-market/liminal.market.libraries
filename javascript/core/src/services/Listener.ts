import HttpRequest from "../http/HttpRequest";

export default class Listener {
    static httpRequest: HttpRequest = new HttpRequest();

    public static set onUpdatingAUsdOnChain(action : (event : any) => Promise<void>) {
        this.httpRequest.listen('UpdatingAUsdOnChain', async (event : any) => {
            await action(event);
        })
    }

    public static set onBalanceSet(action : (event : any) => Promise<void>) {
        this.httpRequest.listen('BalanceSet', async (event : any) => {
            await action(event);
        })
    }


    public static set onOrderSentToMarket(action : (event : any) => Promise<void>) {
        this.httpRequest.listen('OrderSentToMarket', async (event : any) => {
            await action(event);
        })
    }

    public static set onOrderExecutedWritingToChain(action : (event : any) => Promise<void>) {
        this.httpRequest.listen('OrderExecutedWritingBlockchain', async (event : any) => {
            await action(event);
        })
    }

    public static set onOrderExecuted(action : (event : any) => Promise<void>) {
        this.httpRequest.listen('OrderExecuted', async (event : any) => {
            await action(event);
        })
    }


}