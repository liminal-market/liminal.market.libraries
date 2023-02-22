# Liminal.market core library

This library allows you to interact with liminal.market. Register user,
list available stocks and ETFs, and buy and sell securities on the stock market.

## Documentation
You can find documentation at https://docs.liminal.market

## Install
```
    npm install liminal.market
```

## Example
```javascript
    //import the library into our code
    import LiminalMarket from 'liminal.market';

    //start to load your private key, wallet provider and set variable for you eth address
    const provider = {}; //window.ethereum or load your private key into web3provider
    
    //To take service fee, register at https://liminal.market/contract.html
    //After registration you get a contract address you can use.
    const myContractAddress = '0x....';
    
    //initiate LiminalMarket class. myContractAddress is optional
    const liminalMarket = await LiminalMarket.getInstance(provider, myContractAddress);
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
    let isValidKyc = await liminalMarket.isValidKyc();
    console.log('isValidKyc', isValidKyc);

    //we can check the aUSD balance, when we have balance on it, we can trade
    const aUsdBalance = await liminalMarket.getAUSDBalance(myWalletAddress);
    if (aUsdBalance.eq(0)) {
        //Since we are on sandbox we can fund our account with some fake money
        let response = await liminalMarket.fundSandboxAccount(async (obj) => {
            console.log('funded', obj)
        })
    }

    //check if the market is open
    let isOpen = await liminalMarket.isMarketOpen();
    if (isOpen) {
        //lets buy $50 of AAPL stock. Amount is in Wei, so $50 = 50 * 10**18
        await liminalMarket.buySecurityToken('AAPL', ethers.util.toWei(50));

        //or sell all of my Apple stock
        const aaplQuantity = await liminalMarket.getSecurityTokenQuantity('AAPL');
        if (aaplQuantity.gt(0)) {
            //quantity is in Wei, so 1.23 shares of AAPL = 123 * 10**16
            await liminalMarket.sellSecurityToken('AAPL', aaplQuantity);
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

```