# BlockchainService.ts

This is a TypeScript code file that defines a `BlockchainService` class. The class is responsible for interacting with the LiminalMarket blockchain and executing orders. It uses the HttpRequest class to make HTTP requests to the LiminalMarket API.

## Table of Contents

- [Class: BlockchainService](#class-blockchainservice)
  - [Constructor](#constructor)
  - [Method: executeOrder](#method-executeorder)
- [Examples](#examples)

## Class: BlockchainService

### Constructor

The constructor initializes a new instance of the `BlockchainService` class. It creates a new instance of the `HttpRequest` class and assigns it to the `httpRequest` property.

```typescript
constructor() {
    this.httpRequest = new HttpRequest();
}
```

### Method: executeOrder

This method is responsible for executing an order on the LiminalMarket blockchain. It takes three parameters:

- `side` (string): The side of the order, either "buy" or "sell".
- `symbol` (string): The symbol of the asset being traded.
- `quantity` (BigNumberish): The quantity of the asset being traded.

The method returns a Promise that resolves to an `ExecuteOrderResult` object.

```typescript
public async executeOrder(side : string, symbol : string, quantity : BigNumberish) : Promise<ExecuteOrderResult> {
    // ...
}
```

The method first checks if the symbol is 'ausd' and throws an error if it is. Then, it formats the quantity using the `ethers.utils.formatEther` function. If the side is "buy", it updates the `amountOrQty` variable to "amount" and adds a dollar sign to the quantity.

Next, it creates a signMessage string containing the order details, including the chain ID, service contract address, and current time. It then signs the message using the `LiminalMarket.Signer.signMessage` function.

Finally, it sends a POST request to the '/executeOrder' endpoint with the signed message and other order details. The response is cast to an `ExecuteOrderResult` object and returned.

## Examples

Here's an example of how to use the `BlockchainService` class to execute a buy order:

```typescript
import BlockchainService from './BlockchainService';

const blockchainService = new BlockchainService();
const side = 'buy';
const symbol = 'eth';
const quantity = ethers.utils.parseEther('1');

blockchainService.executeOrder(side, symbol, quantity)
    .then((result) => {
        console.log('Order executed successfully:', result);
    })
    .catch((error) => {
        console.error('Error executing order:', error);
    });
```

And here's an example of how to use the `BlockchainService` class to execute a sell order:

```typescript
import BlockchainService from './BlockchainService';

const blockchainService = new BlockchainService();
const side = 'sell';
const symbol = 'eth';
const quantity = ethers.utils.parseEther('1');

blockchainService.executeOrder(side, symbol, quantity)
    .then((result) => {
        console.log('Order executed successfully:', result);
    })
    .catch((error) => {
        console.error('Error executing order:', error);
    });
```