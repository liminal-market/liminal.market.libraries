# OrderExecutedEvent.ts

This TypeScript file defines an interface called `OrderExecutedEvent`. The interface represents an event that occurs when an order is executed in a trading system. It contains various properties related to the executed order, such as recipient, symbol, tsl, filled quantity, filled average price, side, filled time, total service fee, aUsd balance, spender, and block information.

## Interface Description

The `OrderExecutedEvent` interface contains the following properties:

- `recipient`: (string) The address of the recipient who receives the executed order.
- `symbol`: (string) The symbol of the traded asset.
- `tsl`: (BigNumberish) The time in seconds since the last order execution.
- `filledQty`: (BigNumberish) The quantity of the asset that was filled in the executed order.
- `filledAvgPrice`: (BigNumberish) The average price at which the order was filled.
- `side`: (string) The side of the trade, either "buy" or "sell".
- `filledAt`: (BigNumberish) The timestamp when the order was filled.
- `totalServiceFee`: (BigNumberish) The total service fee charged for the executed order.
- `aUsdBalance`: (BigNumberish) The balance of the recipient in aUSD (a stablecoin) after the order execution.
- `spender`: (string) The address of the spender who executed the order.
- `blockInfo`: (any) Additional information about the block in which the order was executed.

## Usage Example

To use the `OrderExecutedEvent` interface, you can create an object that implements this interface. Here's an example:

```typescript
import { BigNumber } from "ethers";
import OrderExecutedEvent from "./OrderExecutedEvent";

const orderExecutedEvent: OrderExecutedEvent = {
  recipient: "0x123456789abcdef",
  symbol: "ETH",
  tsl: BigNumber.from(60),
  filledQty: BigNumber.from(10),
  filledAvgPrice: BigNumber.from(2000),
  side: "buy",
  filledAt: BigNumber.from(Date.now()),
  totalServiceFee: BigNumber.from(5),
  aUsdBalance: BigNumber.from(10000),
  spender: "0xabcdef123456789",
  blockInfo: { blockNumber: 12345, blockHash: "0xabcdef123456789abcdef" },
};
```

In this example, we import the `OrderExecutedEvent` interface and create an object that implements it. We use the `BigNumber` type from the `ethers` library for the BigNumberish properties.