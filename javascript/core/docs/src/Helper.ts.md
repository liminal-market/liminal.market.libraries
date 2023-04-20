# Helper.ts

The `Helper.ts` file is a TypeScript module that exports a `Helper` class. This class provides utility functions for managing cookies and loading the LiminalMarket instance. The class also contains a static property `AddressZero` which represents the Ethereum address with all zeros.

## Table of Contents

- [Static Properties](#static-properties)
- [Methods](#methods)
  - [setCookie](#setcookie)
  - [getCookieValue](#getcookievalue)
  - [deleteCookie](#deletecookie)
  - [loadLiminalMarket](#loadliminalmarket)

## Static Properties

- `AddressZero`: A string representing the Ethereum address with all zeros.

## Methods

### setCookie

Sets a cookie with the given name and value.

```typescript
public static setCookie(name: string, value: string): void
```

**Parameters:**

- `name` (string): The name of the cookie.
- `value` (string): The value of the cookie.

**Example:**

```typescript
Helper.setCookie("username", "JohnDoe");
```

### getCookieValue

Returns the value of the cookie with the given name.

```typescript
public static getCookieValue(name: string): string
```

**Parameters:**

- `name` (string): The name of the cookie.

**Returns:**

- (string): The value of the cookie.

**Example:**

```typescript
const username = Helper.getCookieValue("username");
```

### deleteCookie

Deletes the cookie with the given name.

```typescript
public static deleteCookie(name: string): void
```

**Parameters:**

- `name` (string): The name of the cookie.

**Example:**

```typescript
Helper.deleteCookie("username");
```

### loadLiminalMarket

Loads the LiminalMarket instance with the given parameters.

```typescript
public static async loadLiminalMarket(walletAddress: string, provider: Provider, signer: Signer, chainId: number, serviceContractAddress: string | undefined): Promise<void>
```

**Parameters:**

- `walletAddress` (string): The wallet address.
- `provider` (Provider): The Ethereum provider.
- `signer` (Signer): The Ethereum signer.
- `chainId` (number): The chain ID of the Ethereum network.
- `serviceContractAddress` (string | undefined): The service contract address (optional).

**Example:**

```typescript
await Helper.loadLiminalMarket("0x1234...", provider, signer, 80001, "0x5678...");
```

**Note:**

If the `serviceContractAddress` is not provided, the `NO_FEE_SERVICE_CONTRACT_ADDRESS` from the network instance will be used. If the network is not supported, an error will be thrown.