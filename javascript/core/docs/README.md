# Liminal.market

## Description

Main package for liminal.market. Use this package to register user, trade securities, get symbols, prices, and positions.

## Getting Started

1. Install the npm package:

```bash
npm install liminal.market
```

2. Include it in your browser:

```html
<script src="node_modules/liminal.market/dist/index.js"></script>
```

3. Initiate the LiminalMarket class:

```javascript
import { LiminalMarket } from 'liminal.market';

// Use one of the following methods to initiate the LiminalMarket class:
const liminalMarket = LiminalMarket.getInstanceUsingPrivateKey(privateKey, chainId, serviceContractAddress);
const liminalMarket = LiminalMarket.getInstance(provider, serviceContractAddress);
const liminalMarket = LiminalMarket.getInstanceByWallet(wallet, serviceContractAddress);
```

:::note
For testing, use the Mumbai network with chain id 80001.
:::

:::info
The main class to use for LiminalMarket. Users should use this to communicate with Liminal.market.
:::

4. Check out the HowTo guides on how to use the library.

## Reporting Bugs

- Repository: [https://github.com/liminal-market/liminal.market.libraries/tree/main/javascript/core](https://github.com/liminal-market/liminal.market.libraries/tree/main/javascript/core)
- Homepage: [https://liminal.market](https://liminal.market)
- Bugs: [https://github.com/liminal-market/liminal.market.libraries/issues](https://github.com/liminal-market/liminal.market.libraries/issues)

## Versioning

Current version: 1.0.3

## Authors

- Author: [*****](mailto:*****)

## License

ISC

:::caution
Make sure to replace any secret information, such as private keys, with ***** in your response.
:::

:::tip
You can use the Listener property to access the Listener class.
:::

:::danger
Ensure that the provider has a signer and an account can be accessed, otherwise an error will be thrown.
:::