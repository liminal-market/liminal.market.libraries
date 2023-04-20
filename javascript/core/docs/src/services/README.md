# Liminal Market Libraries - Services

This folder contains the core services for the Liminal Market Libraries. These services are responsible for handling various operations such as account management, interacting with the LiminalMarket blockchain, and listening to events.

## Table of Contents

- [AccountService.ts](#accountservicets)
- [BlockchainService.ts](#blockchainservicets)
- [Listener.ts](#listenerts)

## AccountService.ts

This is a TypeScript code file that defines the `AccountService` class. The class is responsible for handling account-related operations such as KYC status, login, and sandbox account management. The class uses the `HttpRequest` class for making HTTP requests and the `Helper` class for managing cookies.

[Read more about AccountService.ts](AccountService.ts)

## BlockchainService.ts

This is a TypeScript code file that defines a `BlockchainService` class. The class is responsible for interacting with the LiminalMarket blockchain and executing orders. It uses the HttpRequest class to make HTTP requests to the LiminalMarket API.

[Read more about BlockchainService.ts](BlockchainService.ts)

## Listener.ts

The `Listener.ts` file is a TypeScript code file that defines a `Listener` class. This class is responsible for listening to various events and executing the corresponding actions. It uses the `HttpRequest` class to handle the event listening and action execution.

[Read more about Listener.ts](Listener.ts)

---

[View the repository on GitHub](https://github.com/liminal-market/liminal.market.libraries/tree/main/javascript/core/src/services)