# MainNetwork.ts

The `MainNetwork.ts` file is a TypeScript code file that defines an abstract class `MainNetwork` which extends the `Network` class. This class is responsible for setting up the main network configuration for the application.

## Table of Contents

- [Overview](#overview)
- [Usage](#usage)
- [Methods](#methods)
  - [constructor](#constructor)
- [Technical Concepts](#technical-concepts)

## Overview

The `MainNetwork` class is an abstract class that extends the `Network` class. It is used to set up the main network configuration for the application, including the server URL and the test network flag.

## Usage

To use the `MainNetwork` class, you need to create a new class that extends it and implement the required methods. Here's an example:

```typescript
import MainNetwork from "./MainNetwork";

class MyNetwork extends MainNetwork {
  // Implement required methods here
}

const myNetwork = new MyNetwork();
```

## Methods

### constructor

The `constructor` method is a protected method that initializes the `MainNetwork` class. It sets the `ServerUrl` property to the main network server URL and the `TestNetwork` property to `false`.

#### Parameters

None.

## Technical Concepts

- **Abstract Class**: An abstract class is a class that cannot be instantiated directly. Instead, it serves as a base class for other classes that can be instantiated. In this case, the `MainNetwork` class is an abstract class that extends the `Network` class, and it must be extended by another class to be used.

- **TypeScript**: TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds optional static types to the language, which can help with code quality and maintainability. The `MainNetwork.ts` file is written in TypeScript, and it uses features like classes, inheritance, and abstract classes that are not available in standard JavaScript.

- **ServerUrl**: The `ServerUrl` property is a string that represents the URL of the main network server. In this case, it is set to "https://mainnet.liminal.market".

- **TestNetwork**: The `TestNetwork` property is a boolean that indicates whether the network is a test network or not. In this case, it is set to `false`, meaning that the `MainNetwork` class is intended for use with the main network, not a test network.