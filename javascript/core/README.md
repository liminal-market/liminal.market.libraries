# Liminal.market core library

This library allows you to interact with liminal.market, registering using
list available securities, list your securities and buy and sell securities.

## Documentation
You can find documentation at https://liminalmarket.readme.io/reference/overview

## Install
```
    npm install liminal.market.core
```

## Example
```javascript
    //import the library into our code
    import LiminalMarketCore from 'LiminalMarketCore';
    
    //start to load your private key, wallet provider and set variable for you eth address
    const provider = {}; //load your private key into web3provider
    
    //if you take service fee, this is the address you just created. It is optional
    //To take fee, register at https://liminal.market/contract.html
    //After registration you get a contract address you can use.
    const myContractAddress = '0x....';
    
    //initiate LiminalMarketCore class
    //myContractAddress is optional
    const lm = new LiminalMarketCore(provider, myContractAddress);
    
    //start by registering you account, you only need to do this one time
    //you will receive aUSD when you register, so you can trade immediately
    await lm.createSandboxAccount(firstName, lastName, email, () => {
        //account is ready
        //we can now trade
    });
    
    //Wait for about 5 minutes, that is the time it takes to register with the broker and to receive aUSD.
    //You will receive email when your account is ready
    
    //we can check the aUSD balance, when we have balance on it, we can trade
    const aUsdAmount = await lm.getAUSDBalance(myWalletAddress)
    if (aUsdAmount.gt(0)) {
        //lets buy $50 of AAPL stock. Amount is in Wei, so $50 = 50 * 10**18
        await lm.buySecurityToken('AAPL', ethers.util.toWei(50));
    }
    
    //or sell all of my Apple stock
    const aaplQuantity = await lm.getSecurityTokenQuantity('AAPL');
    if (aaplQuantity.gt(0)) {
        //quantity is in Wei, so 1.23 shares of AAPL = 123 * 10**16
        await lm.sellSecurityToken('AAPL', aaplQuantity);
    }
    
    //retrieve all available securities available on Liminal.market
    const securityTokens = await lm.getSecurityTokens();
    console.log(securityTokens);
```