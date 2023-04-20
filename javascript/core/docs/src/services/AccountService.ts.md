# AccountService.ts

This is a TypeScript code file that defines the `AccountService` class. The class is responsible for handling account-related operations such as KYC status, login, and sandbox account management. The class uses the `HttpRequest` class for making HTTP requests and the `Helper` class for managing cookies.

## Usage

To use the `AccountService` class, first import it and create a new instance:

```typescript
import AccountService from "./AccountService";

const accountService = new AccountService();
```

Then, you can call the available methods on the `accountService` instance.

## Methods

### kycStatus()

This method returns the KYC (Know Your Customer) status of the user's account. It returns a `Promise<KycStatus>` object containing the KYC status information.

**Example:**

```typescript
const kycStatus = await accountService.kycStatus();
console.log(kycStatus);
```

### login()

This method logs the user into their account. It returns a `Promise<Account>` object containing the account information.

**Example:**

```typescript
const account = await accountService.login();
console.log(account);
```

### fundSandboxAccount(accountFunded?: (obj: any) => Promise<void> | undefined)

This method funds the user's sandbox account. It takes an optional callback function `accountFunded` that will be called when the account is funded.

**Example:**

```typescript
await accountService.fundSandboxAccount((obj) => {
  console.log("Account funded:", obj);
});
```

### createSandboxAccount(firstName: string, lastName: string, email: string, accountReadyEvent?: (event : any) => Promise<void> | undefined)

This method creates a new sandbox account for the user. It takes the user's first name, last name, and email address as parameters. It also takes an optional callback function `accountReadyEvent` that will be called when the account is ready.

**Example:**

```typescript
const response = await accountService.createSandboxAccount("John", "Doe", "john.doe@example.com", (event) => {
  console.log("Account ready:", event);
});
console.log(response);
```

### autoLogin()

This private method attempts to automatically log the user in using a stored token. It returns a `Promise<Account>` object containing the account information if the auto-login is successful, or `undefined` if it fails.

**Example:**

```typescript
// This method is private and should not be called directly.
```

## Technical Concepts

### Nonce

A nonce is a random number used in cryptographic operations to ensure that old communications cannot be reused in replay attacks. In this code, a nonce is used as part of the login process to ensure secure authentication.

### JWT (JSON Web Token)

A JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. In this code, JWT is used for authentication purposes.