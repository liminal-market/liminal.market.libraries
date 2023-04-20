# How To: Check Market Status, Get Account Positions, and Retrieve Symbols and Token Quantity in JavaScript

## Introduction

In this guide, we will walk you through the process of checking if the market is open, retrieving positions for an account, getting all available symbols, and obtaining the token quantity for a specific security (e.g., MSFT) using JavaScript.

## Step-by-Step Instructions

### 1. Check if the market is open

To check if the market is open, you can use the `isMarketOpen` function. Here's an example of how to use it:

```javascript
async function isMarketOpen() {
  // Your implementation here
  // Return true if the market is open, false otherwise
}

isMarketOpen().then((isOpen) => {
  console.log("Is the market open?", isOpen);
});
```

### 2. Get positions for an account

To get the positions for an account, you can use the `positions` function. Here's an example of how to use it:

```javascript
async function positions(accountId) {
  // Your implementation here
  // Return an array of positions for the given account ID
}

const accountId = "your_account_id";
positions(accountId).then((positions) => {
  console.log("Positions for account:", positions);
});
```

### 3. Get all symbols

To get all available symbols, you can use the `getSymbols` function. Here's an example of how to use it:

```javascript
async function getSymbols() {
  // Your implementation here
  // Return an array of all available symbols
}

getSymbols().then((symbols) => {
  console.log("All symbols:", symbols);
});
```

### 4. Get token quantity for a specific security

To get the token quantity for a specific security, such as MSFT, you can use the `getSecurityTokenQuantity` function. Here's an example of how to use it:

```javascript
async function getSecurityTokenQuantity(accountId, symbol) {
  // Your implementation here
  // Return the token quantity for the given symbol and account ID
}

const accountId = "your_account_id";
const symbol = "MSFT";
getSecurityTokenQuantity(accountId, symbol).then((quantity) => {
  console.log(`Token quantity for ${symbol}:`, quantity);
});
```

By following these step-by-step instructions, you can easily check the market status, retrieve account positions, get all available symbols, and obtain the token quantity for a specific security using JavaScript.