import LiminalMarket from "../src/index";
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

        let liminalMarket = await LiminalMarket.getInstance(wallet);

        //lets check if this wallet has an account.
        if (!liminalMarket.hasAccount()) {
            //Create account with broker
            await liminalMarket.createSandboxAccount('Ron', 'Swanson', 'ron.swanson+1@parkandrec.org',
                async () => {
                    let aUsdBalance = await liminalMarket.getAUSDBalance();
                    console.log('aUsdBalance:', aUsdBalance.toString());
                });
        }

        //check if the account has valid KYC. Not trades can be done until it's valid
        let isValidKyc = await liminalMarket.isValidKyc();
        console.log('isValidKyc', isValidKyc);

        //check the USD balance amount at the broker, represented in the aUSD token.
        let aUsdBalance = await liminalMarket.getAUSDBalance();
        if (aUsdBalance.eq(0)) {
            //Since we are on sandbox we can fund our account with some fake money
            let response = await liminalMarket.fundSandboxAccount(async (obj) => {
                console.log('funded', obj)
            })

            console.log('response from fundSandbox', response);
        } else {
            console.log('send buy order')
            let amount = '23' + '0'.repeat(18)
            let buyResponse = await liminalMarket.buySecurityToken('MSFT', amount, async (recipient, symbol, tsl, filledQty, filledAvgPrice, side, filledAt, totalServiceFee, aUsdBalance, spender) => {
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
