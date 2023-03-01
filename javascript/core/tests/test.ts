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
            let buyResponse = await liminalMarket.buySecurityToken('MSFT', amount)
                .catch((e: any) => {
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
        const liminalMarket = await LiminalMarket.getInstanceByWallet(wallet);
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

    public async doKyc() {
        let pk = [
            '47b0e063fa8b12adc19b09548f665a757089913a6e7ecb1d8600b9f9ed5de504',
            '63766379421dc92a9a8c99c9f5a9049e702065e7869b99b960c84fa22fae998c',
            '3920c2b328b88e396bbe2044e87d5111de8c53d91b708da92a52c153acf4bcc9',
            'ff0747021dfc5c8e6c1a6b16896b1b398c0f19d6ac9c81b1ce9b14a1922805f7',
            '24d2a3aa667e4f932c6fc6ef26effa7eab79ada93212294c492fcb0190e8665e',
            'd353f599281ceb13d8c199a731a57b032d7ce1225f95904ddf1e8152ac420dc6',
            '85d957cc30e8b37248d88c5d39c88d5972b34f943372640e044a11da2c17d882',
            '8431e156b51498e7529b715ad94cf67957e912cb19444b65b99279eff0fea597',
            '407261e4cd0bbf84fd1f826a173b403d93c73325428db397d109e8f20c70f839',
            'd7cb7083feda2385b38138306cd739dd420d7e7c321a3ac1007ac8b4dde289b6'
        ]
        for (let i=0;i<pk.length;i++) {
            let liminalMarket = await LiminalMarket.getInstanceUsingPrivateKey(pk[i] as string, MumbaiNetworkDefaults.ChainId);
            let result = await liminalMarket.kycStatus();
            console.log('kycStatus:', result);
        }

    }
}

let ble = new Test();
ble.sameAsReadme();
