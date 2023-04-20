# MumbaiNetworkDefaults.ts

This is a TypeScript code file that defines the `MumbaiNetworkDefaults` class, which extends the `TestNetwork` class. The `MumbaiNetworkDefaults` class provides default configurations and settings for the Mumbai test network on the Polygon blockchain.

## Table of Contents

- [Class Description](#class-description)
- [Usage Examples](#usage-examples)
- [Methods](#methods)
  - [constructor](#constructor)
- [Properties](#properties)
  - [RpcUrl](#rpcurl)
  - [ChainId](#chainid)

## Class Description

The `MumbaiNetworkDefaults` class is an abstract class that extends the `TestNetwork` class. It sets up the default configurations for the Mumbai test network, such as the network name, chain name, native currency name, native symbol, native decimal, block explorer URL, faucet URL, buy URL, chain ID, and RPC URL.

## Usage Examples

To use the `MumbaiNetworkDefaults` class, you can create a new class that extends it and then instantiate the new class. Here's an example:

```typescript
import MumbaiNetworkDefaults from "./MumbaiNetworkDefaults";

class MyMumbaiNetwork extends MumbaiNetworkDefaults {
  // Add custom methods or properties here
}

const myMumbaiNetwork = new MyMumbaiNetwork();
```

## Methods

### constructor

The `constructor` method is a protected method that initializes the `MumbaiNetworkDefaults` class. It sets the default values for the Mumbai test network properties.

#### Parameters

None.

## Properties

### RpcUrl

The `RpcUrl` property is a static property that holds the default RPC URL for the Mumbai test network. The value is set to `'https://polygon-mumbai.g.alchemy.com/v2/*****'`.

### ChainId

The `ChainId` property is a static property that holds the default chain ID for the Mumbai test network. The value is set to `80001`.