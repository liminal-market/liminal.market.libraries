import LiminalMarketCore from "liminal.market.core";


async function registerAndTrade() {

    let provider: any = {};
    let liminalMarketCore = new LiminalMarketCore(provider, '');
    await liminalMarketCore.createSandboxAccount('Ron', 'Swanson', 'ron.swanson@parkandrec.org',
        async () => {
            let aUsdBalance = await liminalMarketCore.getAUSDBalance();
            console.log('aUsdBalance:', aUsdBalance.toString());
        });


}

registerAndTrade();