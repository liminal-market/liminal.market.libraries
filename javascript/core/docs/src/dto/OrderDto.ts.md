# OrderDto.ts

This is a TypeScript code file that defines the `OrderDto` class. The `OrderDto` class is used to represent an order in a trading system. This class contains various properties related to an order, such as its status, wallet address, chain ID, symbol, side, amount, and other related information.

## Usage

To use the `OrderDto` class, you can create a new instance of the class and set its properties as needed. Here are some examples of how to use the `OrderDto` class:

```typescript
import OrderDto from './OrderDto';
import { OrderSide } from './OrderSide';

// Create a new order
const order = new OrderDto();
order.walletAddress = '0x12345...';
order.chainId = 1;
order.symbol = 'ETH';
order.side = OrderSide.buy;
order.amount = 10;
order.accountId = '123';
order.spender = '0x6789...';
order.brokerOrderId = '456';
order.clientOrderId = '789';
```

## Properties

The `OrderDto` class has the following properties:

### confirmed

A boolean value indicating whether the order has been confirmed or not.

### status

A string representing the current status of the order.

### walletAddress

A string representing the wallet address associated with the order.

### chainId

A number representing the blockchain network ID where the order is placed.

### symbol

A string representing the trading symbol of the asset involved in the order.

### side

An `OrderSide` enum value representing the side of the order (buy or sell).

### amountWei

A string representing the amount of the asset in the smallest unit (wei) involved in the order.

### amount

A number representing the amount of the asset involved in the order.

### accountId

A string representing the account ID associated with the order.

### spender

A string representing the spender's address in the order.

### brokerOrderId

A string representing the broker's order ID.

### clientOrderId

A string representing the client's order ID.

### signMessage

A string representing the message to be signed for the order.

### signedMessage

A string representing the signed message for the order.

### signedTime

A string representing the timestamp when the order was signed.

## Technical Concepts

### OrderSide Enum

The `OrderSide` enum is imported from the `OrderSide` module and is used to represent the side of the order (buy or sell). The enum has two values: `OrderSide.buy` and `OrderSide.sell`.