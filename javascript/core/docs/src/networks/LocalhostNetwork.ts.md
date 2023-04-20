# LocalhostNetwork.ts

This is a TypeScript code file that defines a class named `LocalhostNetwork`. The class extends another class called `LocalhostNetworkDefaults`. This class is used to manage and override default network addresses for various contracts in a localhost environment.

## Table of Contents

- [Class Definition](#class-definition)
- [Examples](#examples)
- [Methods](#methods)
- [Properties](#properties)

## Class Definition

```typescript
export default class LocalhostNetwork extends LocalhostNetworkDefaults {
    constructor() {
        super();
    }
}
```

The `LocalhostNetwork` class extends the `LocalhostNetworkDefaults` class and has a constructor that calls the parent class's constructor using `super()`.

## Examples

To use the `LocalhostNetwork` class, you can create an instance of the class and access its properties:

```typescript
import LocalhostNetwork from "./LocalhostNetwork";

const localhostNetwork = new LocalhostNetwork();

console.log(localhostNetwork.KYC_ADDRESS);
console.log(localhostNetwork.AUSD_ADDRESS);
```

## Methods

There are no methods defined in the `LocalhostNetwork` class.

## Properties

The `LocalhostNetwork` class has the following properties, which are used to override the default network addresses for various contracts:

- `KYC_ADDRESS`: The address of the KYC contract. Default value: `"0xA700528a2B9Bd3126c96378b76f2c99f5F0e0F76"`
- `AUSD_ADDRESS`: The address of the AUSD contract. Default value: `"0x7ad1630b2E9F0e5401f220A33B473C7E5551dd3e"`
- `LIMINAL_MARKET_ADDRESS`: The address of the Liminal Market contract. Default value: `"0x19d5ABE7854b01960D4911e6536b26F8A38C3a18"`
- `MARKET_CALENDAR_ADDRESS`: The address of the Market Calendar contract. Default value: `"0x12bA221061255c11EA4895C363633bD43F28F9c3"`
- `LM_ADDRESS`: The address of the LM contract. Default value: `"0x012c686711d9532f7fD68fe6a40d86477288F1dc"`
- `SERVICE_CONTRACT_ADDRESS`: The address of the Service Contract. Default value: `"0x9B946889657e8f2D943A3841282fBf5751241E85"`
- `NO_FEE_SERVICE_CONTRACT_ADDRESS`: The address of the No Fee Service Contract. Default value: `"0x0d82EF4e843c1ca7bd2aa9B2Aa4239bd70b306df"`

Each property is marked with the `override` keyword, indicating that it overrides the corresponding property in the parent class `LocalhostNetworkDefaults`.