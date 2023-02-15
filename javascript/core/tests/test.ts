import LiminalMarketCore from "../src/index";
import {ethers, Wallet} from "ethers";
import LocalhostNetworkDefaults from "../src/networks/LocalhostNetworkDefaults";
import MumbaiNetworkDefaults from "../src/networks/MumbaiNetworkDefaults";

export default class Test {
    async registerAndTrade() {
        //service contract address we get when signing contract @ https://liminal.market/contract.html - it's free
        let serviceContractAddress = '0x6F7E7238FACeD79371b505399d1B3Ad5AC06c769';

        //hardhat private key for account #0
        let privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
        let providerUrl = MumbaiNetworkDefaults.RpcUrl;
        providerUrl = LocalhostNetworkDefaults.RpcUrl;

        let provider = new ethers.providers.JsonRpcProvider(providerUrl);
        let wallet = new Wallet(privateKey, provider)

        let liminalMarketCore = await LiminalMarketCore.getInstance(wallet, serviceContractAddress);
        let account = await liminalMarketCore.login();
        if (!account.brokerId) {
            //Create account with broker
            await liminalMarketCore.createSandboxAccount('Ron', 'Swanson', 'ron.swanson+1@parkandrec.org',
                async () => {
                    let aUsdBalance = await liminalMarketCore.getAUSDBalance();
                    console.log('aUsdBalance:', aUsdBalance.toString());
                });
        }

        let isValidKyc = await liminalMarketCore.isValidKyc();
        console.log('isValidKyc', isValidKyc);

        let aUsdBalance = await liminalMarketCore.getAUSDBalance();
        if (aUsdBalance.eq(0)) {
            let response = await liminalMarketCore.fundSandboxAccount(async (obj) => {
                console.log('funded', obj)
            })

            console.log('response from fundSandbox', response);
        } else {
            console.log('send buy order')
            let amount = '23' + '0'.repeat(18)
            let buyResponse = await liminalMarketCore.buySecurityToken('MSFT', amount, async (recipient, symbol, tsl, filledQty, filledAvgPrice, side, filledAt, totalServiceFee, aUsdBalance, spender) => {
                console.log(recipient, symbol, tsl, filledQty, filledAvgPrice, side, filledAt, totalServiceFee, aUsdBalance, spender);
            }).catch((e: any) => {
                console.log(e.message);
            });

            console.log('buy response:', buyResponse)
        }

    }
}

let ble = new Test();
ble.registerAndTrade();
