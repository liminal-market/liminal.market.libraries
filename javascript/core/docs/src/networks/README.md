# Liminal Market Libraries - Networks

This folder contains various TypeScript files responsible for managing different blockchain networks and their configurations. The files define classes for localhost, main network, Mumbai test network, and other network types.

## Table of Contents

- [LocalhostNetwork.ts](#localhostnetworkts)
- [LocalhostNetworkDefaults.ts](#localhostnetworkdefaultsts)
- [MainNetwork.ts](#mainnetworkts)
- [MumbaiNetwork.ts](#mumbainetworkts)
- [MumbaiNetworkDefaults.ts](#mumbainetworkdefaultsts)
- [Network.ts](#networkts)
- [NetworkType.ts](#networktypets)
- [TestNetwork.ts](#testnetworkts)

## LocalhostNetwork.ts

This is a TypeScript code file that defines a class named `LocalhostNetwork`. The class extends another class called `LocalhostNetworkDefaults`. This class is used to manage and override default network addresses for various contracts in a localhost environment.

[LocalhostNetwork.ts Documentation](LocalhostNetwork.ts)

## LocalhostNetworkDefaults.ts

This is a TypeScript code file that defines an abstract class `LocalhostNetworkDefaults` which extends the `TestNetwork` class. The purpose of this class is to provide default configurations for a localhost Ethereum network.

[LocalhostNetworkDefaults.ts Documentation](LocalhostNetworkDefaults.ts)

## MainNetwork.ts

The `MainNetwork.ts` file is a TypeScript code file that defines an abstract class `MainNetwork` which extends the `Network` class. This class is responsible for setting up the main network configuration for the application.

[MainNetwork.ts Documentation](MainNetwork.ts)

## MumbaiNetwork.ts

This is a TypeScript code file that defines a class named `MumbaiNetwork` which extends the `MumbaiNetworkDefaults` class. The `MumbaiNetwork` class is used to manage the addresses of various contracts on the Mumbai test network.

[MumbaiNetwork.ts Documentation](MumbaiNetwork.ts)

## MumbaiNetworkDefaults.ts

This is a TypeScript code file that defines the `MumbaiNetworkDefaults` class, which extends the `TestNetwork` class. The `MumbaiNetworkDefaults` class provides default configurations and settings for the Mumbai test network on the Polygon blockchain.

[MumbaiNetworkDefaults.ts Documentation](MumbaiNetworkDefaults.ts)

## Network.ts

This is a TypeScript code file that defines an abstract class `Network`. The `Network` class serves as a base class for different blockchain networks, providing essential properties and methods for interacting with them.

[Network.ts Documentation](Network.ts)

## NetworkType.ts

This is a TypeScript code file that defines a `NetworkType` class. The class is responsible for managing different network types and providing instances of the appropriate network based on the provided chain ID.

[NetworkType.ts Documentation](NetworkType.ts)

## TestNetwork.ts

This is a TypeScript code file that defines an abstract class `TestNetwork` which extends the `Network` class. The purpose of this class is to provide a base implementation for test networks, with a predefined server URL and a flag indicating that it is a test network.

[TestNetwork.ts Documentation](TestNetwork.ts)

---

[View Repository](https://github.com/liminal-market/liminal.market.libraries/tree/main/javascript/core/src/networks)