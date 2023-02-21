import LiminalMarket from "../src/index";
import {ethers, Wallet} from "ethers";
import LocalhostNetworkDefaults from "../src/networks/LocalhostNetworkDefaults";
import MumbaiNetworkDefaults from "../src/networks/MumbaiNetworkDefaults";

export default class Test {
    //hardhat private key for account #0. You should change this
    privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'

    async registerAndTrade() {

        /*
        //service contract address we get when signing contract @ https://liminal.market/contract.html - it's free
        let serviceContractAddress = '0x6F7E7238FACeD79371b505399d1B3Ad5AC06c769';

        //hardhat private key for account #0
        let privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
        let providerUrl = MumbaiNetworkDefaults.RpcUrl;
        providerUrl = LocalhostNetworkDefaults.RpcUrl;

        let provider = new ethers.providers.JsonRpcProvider(providerUrl);
        let wallet = new Wallet(privateKey, provider)

        let liminalMarket = await LiminalMarket.getInstance(wallet);
*/
        let liminalMarket = await LiminalMarket.getInstanceUsingPrivateKey(this.privateKey, LocalhostNetworkDefaults.ChainId /* 80001 */)
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
        let isValidKyc = await liminalMarket.kycStatus();
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
                console.log('Error message:', e.message);
            });

            console.log('buy response:', buyResponse)
        }

    }

    public async sameAsReadme() {
        let providerUrl = MumbaiNetworkDefaults.RpcUrl;

        let provider = new ethers.providers.JsonRpcProvider(providerUrl);
        let wallet = new Wallet(this.privateKey, provider)
        let myWalletAddress = wallet.address;
        let firstName = '';
        let lastName = '';
        let email = '';

        //start to load your private key, wallet provider and set variable for you eth address
        // const provider = {}; //window.ethereum or load your private key into web3provider

        //To take service fee, register at https://liminal.market/contract.html
        //After registration you get a contract address you can use.
        const myContractAddress = '0x....';

        //initiate LiminalMarket class
        //myContractAddress is optional
        const liminalMarket = await LiminalMarket.getInstance(wallet);
        if (!liminalMarket.hasAccount()) {
            //start by registering you account, you only need to do this one time
            //you will receive aUSD when you register, so you can trade immediately
            let response = await liminalMarket.createSandboxAccount(firstName, lastName, email, async () => {
                //Wait for about 5 minutes, that is the time it takes to register with the broker and to receive aUSD.
                //You will receive email when your account is ready
            });
            console.log('create account response', response);
        }


        //check if the account has valid KYC. Not trades can be done until it's valid
        let isValidKyc = await liminalMarket.kycStatus();
        console.log('isValidKyc', isValidKyc);

        //we can check the aUSD balance, when we have balance on it, we can trade
        const aUsdBalance = await liminalMarket.getAUSDBalance(myWalletAddress);
        if (aUsdBalance.eq(0)) {
            //Since we are on sandbox we can fund our account with some fake money
            let response = await liminalMarket.fundSandboxAccount(async (obj) => {
                console.log('funded', obj)
            })
        }

        let isOpen = await liminalMarket.isMarketOpen();
        if (isOpen) {
            //lets buy $50 of AAPL stock. Amount is in Wei, so $50 = 50 * 10**18
            let buyTxResult = await liminalMarket.buySecurityToken('AAPL', ethers.utils.parseUnits("50", "ether"))
            console.log('buy tx', buyTxResult);

            //or sell all of my Apple stock
            const aaplQuantity = await liminalMarket.getSecurityTokenQuantity('AAPL');
            if (aaplQuantity.gt(0)) {
                //quantity is in Wei, so 1.23 shares of AAPL = 123 * 10**16
                let sellTxResult = await liminalMarket.sellSecurityToken('AAPL', aaplQuantity);
                console.log('sell tx', sellTxResult)
            }
        }


        //retrieve all available symbols available on Liminal.market
        const securityTokens = await liminalMarket.getSymbols();
        console.log('All symbols available', securityTokens);

        //retrieve my positions
        const positions = await liminalMarket.getPositions();
        console.log('My positions', positions);

        //retrieve the address of a security token
        const securityTokenAddress = await liminalMarket.getSecurityTokenAddress('AAPL')
        console.log('address', securityTokenAddress);

    }
}

let ble = new Test();
ble.sameAsReadme();
