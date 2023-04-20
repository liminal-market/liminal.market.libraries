# Listener.ts

The `Listener.ts` file is a TypeScript code file that defines a `Listener` class. This class is responsible for listening to various events and executing the corresponding actions. It uses the `HttpRequest` class to handle the event listening and action execution.

## Usage

To use the `Listener` class, you need to import it and set the appropriate event handlers. Here's an example of how to use the `Listener` class:

```typescript
import Listener from "./Listener";

Listener.onUpdatingAUsdOnChain = async (event) => {
    console.log("Updating A-USD on-chain event:", event);
    // Perform your desired action here
};

Listener.onBalanceSet = async (event) => {
    console.log("Balance set event:", event);
    // Perform your desired action here
};
```

## Methods

### onUpdatingAUsdOnChain

This method sets the action to be executed when the `UpdatingAUsdOnChain` event is triggered.

- Parameters:
  - `action`: A function that takes an `event` object as a parameter and returns a `Promise<void>`.

### onBalanceSet

This method sets the action to be executed when the `BalanceSet` event is triggered.

- Parameters:
  - `action`: A function that takes an `event` object as a parameter and returns a `Promise<void>`.

### onOrderSentToMarket

This method sets the action to be executed when the `OrderSentToMarket` event is triggered.

- Parameters:
  - `action`: A function that takes an `event` object as a parameter and returns a `Promise<void>`.

### onOrderExecutedWritingToChain

This method sets the action to be executed when the `OrderExecutedWritingBlockchain` event is triggered.

- Parameters:
  - `action`: A function that takes an `event` object as a parameter and returns a `Promise<void>`.

### onOrderExecuted

This method sets the action to be executed when the `OrderExecuted` event is triggered.

- Parameters:
  - `action`: A function that takes an `event` object as a parameter and returns a `Promise<void>`.

## Technical Concepts

### Event Handling

The `Listener` class uses the `HttpRequest` class to listen for events and execute the corresponding actions. This is done using the `listen` method of the `HttpRequest` class, which takes an event name and a callback function as parameters. The callback function is executed when the specified event is triggered.

### Promises

The `Listener` class methods return a `Promise<void>`, which indicates that the action will be executed asynchronously. This allows for non-blocking execution of the action, ensuring that the application remains responsive while the action is being performed.