# abis.ts

This is a TypeScript code file that exports a class named `Abis`. The class contains three static properties: `LiminalMarketExternalServiceAbi`, `LiminalMarketAbi`, and `BalanceOfAbi`. These properties store the ABI (Application Binary Interface) of different smart contracts. The ABI is an interface used to interact with the smart contracts on the Ethereum blockchain.

## Class: Abis

### LiminalMarketExternalServiceAbi

This property contains the ABI for the `LiminalMarketExternalService` smart contract. It has two functions:

#### buySecurityToken(walletAddress: address, symbol: string, amount: uint256)

This function allows a user to buy a security token.

- `walletAddress`: The address of the user's wallet.
- `symbol`: The symbol of the security token to be bought.
- `amount`: The amount of the security token to be bought.

#### sellSecurityToken(walletAddress: address, symbol: string, quantity: uint256)

This function allows a user to sell a security token.

- `walletAddress`: The address of the user's wallet.
- `symbol`: The symbol of the security token to be sold.
- `quantity`: The quantity of the security token to be sold.

### LiminalMarketAbi

This property contains the ABI for the `LiminalMarket` smart contract. It has one event and one function:

#### Event: OrderExecuted

This event is emitted when an order is executed.

- `orderId`: The ID of the executed order.
- `recipient`: The address of the recipient.
- `symbol`: The symbol of the security token.
- `tsl`: The timestamp of the order.
- `filledQty`: The filled quantity of the order.
- `filledAvgPrice`: The average filled price of the order.
- `side`: The side of the order (buy or sell).
- `filledAt`: The timestamp when the order was filled.
- `serviceFee`: The service fee for the order.
- `aUsdBalance`: The aUSD balance of the user.
- `spender`: The address of the spender.

#### getSecurityToken(symbol: string)

This function returns the address of a security token.

- `symbol`: The symbol of the security token.

### BalanceOfAbi

This property contains the ABI for the `BalanceOf` smart contract. It has one function:

#### balanceOf(account: address)

This function returns the balance of an account.

- `account`: The address of the account.

## Usage Examples

```typescript
import Abis from './abis';

// Instantiate a contract with the LiminalMarketExternalServiceAbi
const liminalMarketExternalService = new web3.eth.Contract(Abis.LiminalMarketExternalServiceAbi, contractAddress);

// Call the buySecurityToken function
liminalMarketExternalService.methods.buySecurityToken(walletAddress, symbol, amount).send({ from: senderAddress });

// Instantiate a contract with the LiminalMarketAbi
const liminalMarket = new web3.eth.Contract(Abis.LiminalMarketAbi, contractAddress);

// Call the getSecurityToken function
liminalMarket.methods.getSecurityToken(symbol).call();

// Instantiate a contract with the BalanceOfAbi
const balanceOf = new web3.eth.Contract(Abis.BalanceOfAbi, contractAddress);

// Call the balanceOf function
balanceOf.methods.balanceOf(account).call();
```