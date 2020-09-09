# Class: Geb

Main object of the library instantiating all useful GEB contracts and providing all helper functions needed.

## Hierarchy

-   **Geb**

## Index

### Constructors

-   [constructor](geb.md#constructor)

### Properties

-   [contracts](geb.md#contracts)

### Methods

-   [deployProxy](geb.md#deployproxy)
-   [getProxyAction](geb.md#getproxyaction)
-   [getSafe](geb.md#getsafe)

## Constructors

### constructor

\+ **new Geb**(`network`: GebDeployment, `provider`: GebProviderInterface | Provider): _[Geb](geb.md)_

_Defined in [packages/geb/src/geb.ts:45](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/geb.ts#L45)_

**Parameters:**

| Name       | Type                                 | Description                                                                                     |
| ---------- | ------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `network`  | GebDeployment                        | Either `'kovan'`, `'mainnet'` or an actual list of contract address from the deployment script. |
| `provider` | GebProviderInterface &#124; Provider | Either a Ethers.js provider or a Geb provider (Soon support for Web3 will be added)             |

**Returns:** _[Geb](geb.md)_

## Properties

### contracts

• **contracts**: _ContractApis_

_Defined in [packages/geb/src/geb.ts:43](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/geb.ts#L43)_

Object containing all GEB contracts instances for low level interactions. All contracts object offer a one-to-one typed API to the underlying smart-contract.
Currently has the following contracts:

-   SafeEngine
-   AccountingEngine
-   TaxCollector
-   LiquidationEngine
-   OracleRelayer
-   GlobalSettlement
-   DebtAuctionHouse
-   PreSettlementSurplusAuctionHouse
-   PostSettlementSurplusAuctionHouse
-   SettlementSurplusAuctioneer
-   GebSafeManager
-   GetSafes
-   BasicCollateralJoin
-   CoinJoin
-   Coin (RAI ERC20 contract)
-   GebProxyRegistry
-   FixedDiscountCollateralAuctionHouse (For ETH-A)
-   Weth (ERC20)

## Methods

### deployProxy

▸ **deployProxy**(): _TransactionRequest_

_Defined in [packages/geb/src/geb.ts:88](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/geb.ts#L88)_

Deploy a new proxy owned by the sender.

**Returns:** _TransactionRequest_

---

### getProxyAction

▸ **getProxyAction**(`ownerAddress`: string): _Promise‹[GebProxyActions](gebproxyactions.md)‹››_

_Defined in [packages/geb/src/geb.ts:76](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/geb.ts#L76)_

Given an address returns a [[GebProxyAction]] object to execute bundled operations.
Important: This requires the address to have deployed a GEB proxy through the proxy registry contract. It will throw a `DOES_NOT_OWN_HAVE_PROXY` error if the address specified does not have a proxy. Use the [deployProxy](geb.md#deployproxy) function to get a new proxy.

**Parameters:**

| Name           | Type   | Description                                                            |
| -------------- | ------ | ---------------------------------------------------------------------- |
| `ownerAddress` | string | Externally owned user account, Ethereum address that owns a GEB proxy. |

**Returns:** _Promise‹[GebProxyActions](gebproxyactions.md)‹››_

---

### getSafe

▸ **getSafe**(`idOrHandler`: string | number): _Promise‹[Safe](safe.md)‹››_

_Defined in [packages/geb/src/geb.ts:96](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/geb.ts#L96)_

Get the safe object

**Parameters:**

| Name          | Type                 | Description             |
| ------------- | -------------------- | ----------------------- |
| `idOrHandler` | string &#124; number | Safe Id or Safe handler |

**Returns:** _Promise‹[Safe](safe.md)‹››_
