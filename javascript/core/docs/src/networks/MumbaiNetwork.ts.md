# MumbaiNetwork.ts

This is a TypeScript code file that defines a class named `MumbaiNetwork` which extends the `MumbaiNetworkDefaults` class. The `MumbaiNetwork` class is used to manage the addresses of various contracts on the Mumbai test network.

## Table of Contents

- [Class Definition](#class-definition)
- [Constructor](#constructor)
- [Properties](#properties)

## Class Definition

```typescript
export default class MumbaiNetwork extends MumbaiNetworkDefaults {
    ...
}
```

The `MumbaiNetwork` class extends the `MumbaiNetworkDefaults` class, which means it inherits all the properties and methods from the parent class. This class is exported as the default export of the module.

## Constructor

```typescript
constructor() {
    super();
}
```

The constructor of the `MumbaiNetwork` class calls the constructor of the parent class `MumbaiNetworkDefaults` using the `super()` method.

## Properties

The `MumbaiNetwork` class overrides several properties from the parent class. These properties represent the addresses of various contracts on the Mumbai test network.

- `KYC_ADDRESS`: The address of the KYC contract.
- `AUSD_ADDRESS`: The address of the AUSD contract.
- `LIMINAL_MARKET_ADDRESS`: The address of the Liminal Market contract.
- `MARKET_CALENDAR_ADDRESS`: The address of the Market Calendar contract.
- `LM_ADDRESS`: The address of the LM contract.
- `SERVICE_CONTRACT_ADDRESS`: The address of the Service Contract.
- `NO_FEE_SERVICE_CONTRACT_ADDRESS`: The address of the No Fee Service Contract.

```typescript
override KYC_ADDRESS = "0xA5C844558a93590A32D1110D7031531A0bBf0773";
override AUSD_ADDRESS = "0xc4d1f8D35DB0f0d3E91a3fc8485792F4Df60C387";
override LIMINAL_MARKET_ADDRESS = "0x0D8c3D4F4B29EfC3c54172803dA8a7f1CA2E6189";
override MARKET_CALENDAR_ADDRESS = "0x67Dad7E344C6137DF922924a0aAb26bba862BFDe";
override LM_ADDRESS = "0x808C2F1bBE4C7fE72F77e84F57C346603E63291e";
override SERVICE_CONTRACT_ADDRESS = "0x0827C71852ba59661aAd9f1fab25B377B3f39C40";
override NO_FEE_SERVICE_CONTRACT_ADDRESS = "0x3BBc034e9dC74749000fE384eD504E7d58281065";
```

These properties can be accessed and used in other parts of the application to interact with the respective contracts on the Mumbai test network.