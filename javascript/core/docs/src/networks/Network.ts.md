# Network.ts

This is a TypeScript code file that defines an abstract class `Network`. The `Network` class serves as a base class for different blockchain networks, providing essential properties and methods for interacting with them.

## Class Description

The `Network` class contains properties such as server URL, chain ID, network name, native currency details, and various contract addresses. It also includes a method to get the hexadecimal representation of the chain ID.

## Usage Examples

To use this class, you can create a new class that extends the `Network` class and provide the necessary details for the specific network.

```typescript
class ExampleNetwork extends Network {
  constructor() {
    super();
    this.ServerUrl = "https://example.com";
    this.ChainId = 1;
    this.Name = "Example Network";
    // ... other properties
  }
}
```

Then, you can create an instance of the `ExampleNetwork` class and access its properties and methods:

```typescript
const exampleNetwork = new ExampleNetwork();
console.log(exampleNetwork.ChainIdHex); // Output: 0x1
```

## Methods

### ChainIdHex

- Description: This getter method returns the hexadecimal representation of the chain ID.
- Parameters: None
- Returns: A string representing the hexadecimal value of the chain ID.

## Properties

- ServerUrl: The server URL for the network.
- ChainId: The chain ID of the network.
- Name: The name of the network.
- ChainName: The name of the blockchain.
- NativeCurrencyName: The name of the native currency.
- NativeSymbol: The symbol of the native currency.
- NativeDecimal: The number of decimals for the native currency.
- RpcUrl: The URL for the RPC endpoint.
- BlockExplorer: The URL for the block explorer.
- TestNetwork: A boolean indicating if the network is a test network.
- FaucetUrl: The URL for the faucet.
- BuyUrl: The URL for purchasing the native currency.
- KYC_ADDRESS: The address of the KYC contract.
- AUSD_ADDRESS: The address of the AUSD contract.
- LIMINAL_MARKET_ADDRESS: The address of the Liminal Market contract.
- MARKET_CALENDAR_ADDRESS: The address of the Market Calendar contract.
- LM_ADDRESS: The address of the LM contract.
- SERVICE_CONTRACT_ADDRESS: The address of the Service contract.
- NO_FEE_SERVICE_CONTRACT_ADDRESS: The address of the No Fee Service contract (default: "0x0d82EF4e843c1ca7bd2aa9B2Aa4239bd70b306df").

## Static Properties

- RpcUrl: The static URL for the RPC endpoint.
- ChainId: The static chain ID of the network.

## Constructor

The constructor is protected, which means it can only be called from within the class or its subclasses. This is to ensure that the `Network` class is only used as a base class and not instantiated directly.