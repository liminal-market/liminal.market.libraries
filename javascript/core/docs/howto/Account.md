# How to Create and Manage an Account with LiminalMarket

## Introduction

This guide will walk you through the process of creating an account, checking if an account exists, verifying the KYC status, funding the account on the test network, and getting the aUSD balance using the LiminalMarket class.

## Step-by-Step Instructions

### Step 1: Create a Sandbox Account

To create a new account, you need to call the `createSandboxAccount` function with the required parameters.

```javascript
const liminalMarket = new LiminalMarket();

const firstName = "John";
const lastName = "Doe";
const email = "john.doe@example.com";

const accountReadyEvent = async () => {
  console.log("Account is ready");
};

const accountId = await liminalMarket.createSandboxAccount(firstName, lastName, email, accountReadyEvent);
console.log("Account ID:", accountId);
```

### Step 2: Check if Account Exists

To check if an account exists, you can call the `hasAccount` function.

```javascript
const accountExists = liminalMarket.hasAccount();
console.log("Account exists:", accountExists);
```

### Step 3: Check KYC Status

To check the KYC status of an account, you can call the `kycStatus` function.

```javascript
const kycStatus = await liminalMarket.kycStatus();
console.log("KYC Status:", kycStatus);
```

### Step 4: Fund the Account on Test Network

To fund the account on the test network, you can call the `fundSandboxAccount` function.

```javascript
const accountFunded = async (obj) => {
  console.log("Account funded:", obj);
};

await liminalMarket.fundSandboxAccount(accountFunded);
```

### Step 5: Get the aUSD Balance

To get the aUSD balance of an account, you can call the `getAUSDBalance` function.

```javascript
const address = "*****"; // Replace with the account address
const balance = await liminalMarket.getAUSDBalance(address);
console.log("aUSD Balance:", balance.toString());
```

By following these steps, you can create and manage an account using the LiminalMarket class.