# Liminal Market Libraries - Core DTO

This folder contains TypeScript files that define various interfaces and classes related to the core functionality of the Liminal Market Libraries. These files are responsible for handling data transfer objects (DTOs) within the system.

## Table of Contents

1. [Account.ts](#accountts)
2. [ExecuteOrderResult.ts](#executeorderresultts)
3. [KycStatus.ts](#kycstatusts)
4. [OrderDto.ts](#orderdtots)
5. [OrderExecutedEvent.ts](#orderexecutedeventts)
6. [OrderSide.ts](#ordersidets)

## Account.ts

Account.ts is a TypeScript file that provides an overview of the account-related functionality within the system.

[Read more about Account.ts](Account.ts)

## ExecuteOrderResult.ts

This is a TypeScript code file that defines an interface called `ExecuteOrderResult`. The interface is used to represent the result of an order execution operation. It contains three properties: `success`, `message`, and `order`.

[Read more about ExecuteOrderResult.ts](ExecuteOrderResult.ts)

## KycStatus.ts

KycStatus.ts is a TypeScript code file that defines an interface called `KycStatus`. This interface is used to represent the Know Your Customer (KYC) status of a user in a financial application. The KYC process is a standard practice in the finance industry to verify the identity of clients and assess their suitability for financial services.

[Read more about KycStatus.ts](KycStatus.ts)

## OrderDto.ts

This is a TypeScript code file that defines the `OrderDto` class. The `OrderDto` class is used to represent an order in a trading system. This class contains various properties related to an order, such as its status, wallet address, chain ID, symbol, side, amount, and other related information.

[Read more about OrderDto.ts](OrderDto.ts)

## OrderExecutedEvent.ts

This TypeScript file defines an interface called `OrderExecutedEvent`. The interface represents an event that occurs when an order is executed in a trading system. It contains various properties related to the executed order, such as recipient, symbol, tsl, filled quantity, filled average price, side, filled time, total service fee, aUsd balance, spender, and block information.

[Read more about OrderExecutedEvent.ts](OrderExecutedEvent.ts)

## OrderSide.ts

OrderSide.ts is a TypeScript file that provides an overview of the order side-related functionality within the system.

[Read more about OrderSide.ts](OrderSide.ts)

---

[View the repository on GitHub](https://github.com/liminal-market/liminal.market.libraries/tree/main/javascript/core/src/dto)