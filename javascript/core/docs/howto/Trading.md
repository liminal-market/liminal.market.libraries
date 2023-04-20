# How To Guide: LiminalMarket Class in JavaScript

## Introduction

In this guide, we will learn how to use the LiminalMarket class in JavaScript to buy and sell security tokens, and call the executeOrder function. The LiminalMarket class provides methods to interact with the market and perform various operations related to security tokens.

## Step-by-Step Instructions

### 1. Instantiate the LiminalMarket class

First, create an instance of the LiminalMarket class. In this example, we will assume that the instance variable is named `liminalMarket`.

```javascript
const liminalMarket = new LiminalMarket();
```

### 2. Buy a security token

To buy a security token, call the `buySecurityToken` method with the symbol of the security and the dollar amount in Wei.

```javascript
const symbol = "AAPL"; // Apple Inc.
const amount = 100 * 10 ** 18; // $100 in Wei

liminalMarket.buySecurityToken(symbol, amount)
  .then(result => {
    console.log("Buy order executed:", result);
  })
  .catch(error => {
    console.error("Error executing buy order:", error);
  });
```

### 3. Sell a security token

To sell a security token, call the `sellSecurityToken` method with the symbol of the security and the quantity of shares in Wei.

```javascript
const symbol = "AAPL"; // Apple Inc.
const quantity = 10 * 10 ** 18; // 10 shares in Wei

liminalMarket.sellSecurityToken(symbol, quantity)
  .then(result => {
    console.log("Sell order executed:", result);
  })
  .catch(error => {
    console.error("Error executing sell order:", error);
  });
```

### 4. Call the executeOrder function

To execute an order, call the `executeOrder` method with the side of the order (either 'buy' or 'sell'), the symbol of the security, and the quantity of shares in Wei.

```javascript
const side = "buy"; // or "sell"
const symbol = "AAPL"; // Apple Inc.
const quantity = 10 * 10 ** 18; // 10 shares in Wei

liminalMarket.executeOrder(side, symbol, quantity)
  .then(result => {
    console.log("Order executed:", result);
  })
  .catch(error => {
    console.error("Error executing order:", error);
  });
```

That's it! You now know how to use the LiminalMarket class in JavaScript to buy and sell security tokens and call the executeOrder function.