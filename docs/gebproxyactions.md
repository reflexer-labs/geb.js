# Class: GebProxyActions

Convenience class to call function from Proxy Action contract through a proxy registered in the proxy registry. These action allow to bundle non-view calls. i.g: Open a safe + Lock some ETH + draw some RAI in one single transaction.

## Hierarchy

-   GebProxyActions

    ↳ **GebProxyActions**

## Index

### Constructors

-   [constructor](gebproxyactions.md#constructor)

### Properties

-   [address](gebproxyactions.md#address)
-   [chainProvider](gebproxyactions.md#chainprovider)
-   [proxy](gebproxyactions.md#proxy)
-   [proxyActionAddress](gebproxyactions.md#proxyactionaddress)
-   [proxyAddress](gebproxyactions.md#proxyaddress)

### Methods

-   [allowHandler](gebproxyactions.md#allowhandler)
-   [allowSAFE](gebproxyactions.md#allowsafe)
-   [approveSAFEModification](gebproxyactions.md#approvesafemodification)
-   [coinJoin_join](gebproxyactions.md#coinjoin_join)
-   [denySAFEModification](gebproxyactions.md#denysafemodification)
-   [enterSystem](gebproxyactions.md#entersystem)
-   [ethJoin_join](gebproxyactions.md#ethjoin_join)
-   [exitETH](gebproxyactions.md#exiteth)
-   [exitTokenCollateral](gebproxyactions.md#exittokencollateral)
-   [freeETH](gebproxyactions.md#freeeth)
-   [freeTokenCollateral](gebproxyactions.md#freetokencollateral)
-   [generateDebt](gebproxyactions.md#generatedebt)
-   [generateDebtAndProtectSAFE](gebproxyactions.md#generatedebtandprotectsafe)
-   [lockETH](gebproxyactions.md#locketh)
-   [lockETHAndGenerateDebt](gebproxyactions.md#lockethandgeneratedebt)
-   [lockTokenCollateral](gebproxyactions.md#locktokencollateral)
-   [lockTokenCollateralAndGenerateDebt](gebproxyactions.md#locktokencollateralandgeneratedebt)
-   [lockTokenCollateralGenerateDebtAndProtectSAFE](gebproxyactions.md#locktokencollateralgeneratedebtandprotectsafe)
-   [makeCollateralBag](gebproxyactions.md#makecollateralbag)
-   [modifySAFECollateralization](gebproxyactions.md#modifysafecollateralization)
-   [moveSAFE](gebproxyactions.md#movesafe)
-   [openLockETHAndGenerateDebt](gebproxyactions.md#openlockethandgeneratedebt)
-   [openLockETHGenerateDebtAndProtectSAFE](gebproxyactions.md#openlockethgeneratedebtandprotectsafe)
-   [openLockGNTAndGenerateDebt](gebproxyactions.md#openlockgntandgeneratedebt)
-   [openLockGNTGenerateDebtAndProtectSAFE](gebproxyactions.md#openlockgntgeneratedebtandprotectsafe)
-   [openLockTokenCollateralAndGenerateDebt](gebproxyactions.md#openlocktokencollateralandgeneratedebt)
-   [openLockTokenCollateralGenerateDebtAndProtectSAFE](gebproxyactions.md#openlocktokencollateralgeneratedebtandprotectsafe)
-   [openSAFE](gebproxyactions.md#opensafe)
-   [protectSAFE](gebproxyactions.md#protectsafe)
-   [quitSystem](gebproxyactions.md#quitsystem)
-   [repayAllDebt](gebproxyactions.md#repayalldebt)
-   [repayAllDebtAndFreeETH](gebproxyactions.md#repayalldebtandfreeeth)
-   [repayAllDebtAndFreeTokenCollateral](gebproxyactions.md#repayalldebtandfreetokencollateral)
-   [repayDebt](gebproxyactions.md#repaydebt)
-   [repayDebtAndFreeETH](gebproxyactions.md#repaydebtandfreeeth)
-   [repayDebtAndFreeTokenCollateral](gebproxyactions.md#repaydebtandfreetokencollateral)
-   [safeLockETH](gebproxyactions.md#safelocketh)
-   [safeLockTokenCollateral](gebproxyactions.md#safelocktokencollateral)
-   [safeRepayAllDebt](gebproxyactions.md#saferepayalldebt)
-   [safeRepayDebt](gebproxyactions.md#saferepaydebt)
-   [tokenCollateralJoin_join](gebproxyactions.md#tokencollateraljoin_join)
-   [transfer](gebproxyactions.md#transfer)
-   [transferCollateral](gebproxyactions.md#transfercollateral)
-   [transferInternalCoins](gebproxyactions.md#transferinternalcoins)
-   [transferSAFEOwnership](gebproxyactions.md#transfersafeownership)
-   [transferSAFEOwnershipToProxy](gebproxyactions.md#transfersafeownershiptoproxy)

## Constructors

### constructor

\+ **new GebProxyActions**(`proxyAddress`: string, `network`: GebDeployment, `chainProvider`: GebProviderInterface): _[GebProxyActions](gebproxyactions.md)_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:33](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L33)_

**Parameters:**

| Name            | Type                 |
| --------------- | -------------------- |
| `proxyAddress`  | string               |
| `network`       | GebDeployment        |
| `chainProvider` | GebProviderInterface |

**Returns:** _[GebProxyActions](gebproxyactions.md)_

## Properties

### address

• **address**: _string_

_Inherited from [GebProxyActions](gebproxyactions.md).[address](gebproxyactions.md#address)_

Defined in packages/geb-contract-base/lib/base-contract-api.d.ts:19

---

### chainProvider

• **chainProvider**: _GebProviderInterface_

_Inherited from [GebProxyActions](gebproxyactions.md).[chainProvider](gebproxyactions.md#chainprovider)_

Defined in packages/geb-contract-base/lib/base-contract-api.d.ts:20

---

### proxy

• **proxy**: _DsProxy_

_Defined in [packages/geb/src/proxy-action.ts:27](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L27)_

Underlying proxy object. Can be use to make custom calls to the proxy using `proxy.execute()` function.
For the details of each function

---

### proxyActionAddress

• **proxyActionAddress**: _string_

_Defined in [packages/geb/src/proxy-action.ts:32](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L32)_

Address of the proxy action contract.

---

### proxyAddress

• **proxyAddress**: _string_

_Defined in [packages/geb/src/proxy-action.ts:39](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L39)_

Address of the underlying proxy

## Methods

### allowHandler

▸ **allowHandler**(`usr`: string, `ok`: BigNumberish): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:65](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L65)_

**Parameters:**

| Name  | Type         |
| ----- | ------------ |
| `usr` | string       |
| `ok`  | BigNumberish |

**Returns:** _TransactionRequest_

---

### allowSAFE

▸ **allowSAFE**(`safe`: BigNumberish, `usr`: string, `ok`: BigNumberish): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:71](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L71)_

**Parameters:**

| Name   | Type         |
| ------ | ------------ |
| `safe` | BigNumberish |
| `usr`  | string       |
| `ok`   | BigNumberish |

**Returns:** _TransactionRequest_

---

### approveSAFEModification

▸ **approveSAFEModification**(`obj`: string, `usr`: string): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:81](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L81)_

**Parameters:**

| Name  | Type   |
| ----- | ------ |
| `obj` | string |
| `usr` | string |

**Returns:** _TransactionRequest_

---

### coinJoin_join

▸ **coinJoin_join**(`apt`: string, `safeHandler`: string, `wad`: BigNumberish): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:87](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L87)_

**Parameters:**

| Name          | Type         |
| ------------- | ------------ |
| `apt`         | string       |
| `safeHandler` | string       |
| `wad`         | BigNumberish |

**Returns:** _TransactionRequest_

---

### denySAFEModification

▸ **denySAFEModification**(`obj`: string, `usr`: string): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:97](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L97)_

**Parameters:**

| Name  | Type   |
| ----- | ------ |
| `obj` | string |
| `usr` | string |

**Returns:** _TransactionRequest_

---

### enterSystem

▸ **enterSystem**(`src`: string, `safe`: BigNumberish): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:103](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L103)_

**Parameters:**

| Name   | Type         |
| ------ | ------------ |
| `src`  | string       |
| `safe` | BigNumberish |

**Returns:** _TransactionRequest_

---

### ethJoin_join

▸ **ethJoin_join**(`ethValue`: BigNumberish, `apt`: string, `safe`: string): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:109](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L109)_

**Parameters:**

| Name       | Type         |
| ---------- | ------------ |
| `ethValue` | BigNumberish |
| `apt`      | string       |
| `safe`     | string       |

**Returns:** _TransactionRequest_

---

### exitETH

▸ **exitETH**(`safe`: BigNumberish, `wad`: BigNumberish): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:119](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L119)_

**Parameters:**

| Name   | Type         |
| ------ | ------------ |
| `safe` | BigNumberish |
| `wad`  | BigNumberish |

**Returns:** _TransactionRequest_

---

### exitTokenCollateral

▸ **exitTokenCollateral**(`collateralJoin`: string, `safe`: BigNumberish, `amt`: BigNumberish): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:125](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L125)_

**Parameters:**

| Name             | Type         |
| ---------------- | ------------ |
| `collateralJoin` | string       |
| `safe`           | BigNumberish |
| `amt`            | BigNumberish |

**Returns:** _TransactionRequest_

---

### freeETH

▸ **freeETH**(`safe`: BigNumberish, `wad`: BigNumberish): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:135](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L135)_

**Parameters:**

| Name   | Type         |
| ------ | ------------ |
| `safe` | BigNumberish |
| `wad`  | BigNumberish |

**Returns:** _TransactionRequest_

---

### freeTokenCollateral

▸ **freeTokenCollateral**(`collateralJoin`: string, `safe`: BigNumberish, `amt`: BigNumberish): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:141](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L141)_

**Parameters:**

| Name             | Type         |
| ---------------- | ------------ |
| `collateralJoin` | string       |
| `safe`           | BigNumberish |
| `amt`            | BigNumberish |

**Returns:** _TransactionRequest_

---

### generateDebt

▸ **generateDebt**(`safe`: BigNumberish, `wad`: BigNumberish): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:151](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L151)_

**Parameters:**

| Name   | Type         |
| ------ | ------------ |
| `safe` | BigNumberish |
| `wad`  | BigNumberish |

**Returns:** _TransactionRequest_

---

### generateDebtAndProtectSAFE

▸ **generateDebtAndProtectSAFE**(`safe`: BigNumberish, `wad`: BigNumberish, `saviour`: string): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:157](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L157)_

**Parameters:**

| Name      | Type         |
| --------- | ------------ |
| `safe`    | BigNumberish |
| `wad`     | BigNumberish |
| `saviour` | string       |

**Returns:** _TransactionRequest_

---

### lockETH

▸ **lockETH**(`ethValue`: BigNumberish, `safe`: BigNumberish): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:167](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L167)_

**Parameters:**

| Name       | Type         |
| ---------- | ------------ |
| `ethValue` | BigNumberish |
| `safe`     | BigNumberish |

**Returns:** _TransactionRequest_

---

### lockETHAndGenerateDebt

▸ **lockETHAndGenerateDebt**(`ethValue`: BigNumberish, `safe`: BigNumberish, `deltaWad`: BigNumberish): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:173](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L173)_

**Parameters:**

| Name       | Type         |
| ---------- | ------------ |
| `ethValue` | BigNumberish |
| `safe`     | BigNumberish |
| `deltaWad` | BigNumberish |

**Returns:** _TransactionRequest_

---

### lockTokenCollateral

▸ **lockTokenCollateral**(`manager`: string, `collateralJoin`: string, `safe`: BigNumberish, `amt`: BigNumberish, `transferFrom`: boolean): _TransactionRequest_

_Inherited from [GebProxyActions](gebproxyactions.md).[lockTokenCollateral](gebproxyactions.md#locktokencollateral)_

Defined in packages/geb-contract-api/lib/generated/GebProxyActions.d.ts:21

**Parameters:**

| Name             | Type         |
| ---------------- | ------------ |
| `manager`        | string       |
| `collateralJoin` | string       |
| `safe`           | BigNumberish |
| `amt`            | BigNumberish |
| `transferFrom`   | boolean      |

**Returns:** _TransactionRequest_

---

### lockTokenCollateralAndGenerateDebt

▸ **lockTokenCollateralAndGenerateDebt**(`manager`: string, `taxCollector`: string, `collateralJoin`: string, `coinJoin`: string, `safe`: BigNumberish, `collateralAmount`: BigNumberish, `deltaWad`: BigNumberish, `transferFrom`: boolean): _TransactionRequest_

_Inherited from [GebProxyActions](gebproxyactions.md).[lockTokenCollateralAndGenerateDebt](gebproxyactions.md#locktokencollateralandgeneratedebt)_

Defined in packages/geb-contract-api/lib/generated/GebProxyActions.d.ts:22

**Parameters:**

| Name               | Type         |
| ------------------ | ------------ |
| `manager`          | string       |
| `taxCollector`     | string       |
| `collateralJoin`   | string       |
| `coinJoin`         | string       |
| `safe`             | BigNumberish |
| `collateralAmount` | BigNumberish |
| `deltaWad`         | BigNumberish |
| `transferFrom`     | boolean      |

**Returns:** _TransactionRequest_

---

### lockTokenCollateralGenerateDebtAndProtectSAFE

▸ **lockTokenCollateralGenerateDebtAndProtectSAFE**(`manager`: string, `taxCollector`: string, `collateralJoin`: string, `coinJoin`: string, `safe`: BigNumberish, `collateralAmount`: BigNumberish, `deltaWad`: BigNumberish, `transferFrom`: boolean, `liquidationEngine`: string, `saviour`: string): _TransactionRequest_

_Inherited from [GebProxyActions](gebproxyactions.md).[lockTokenCollateralGenerateDebtAndProtectSAFE](gebproxyactions.md#locktokencollateralgeneratedebtandprotectsafe)_

Defined in packages/geb-contract-api/lib/generated/GebProxyActions.d.ts:23

**Parameters:**

| Name                | Type         |
| ------------------- | ------------ |
| `manager`           | string       |
| `taxCollector`      | string       |
| `collateralJoin`    | string       |
| `coinJoin`          | string       |
| `safe`              | BigNumberish |
| `collateralAmount`  | BigNumberish |
| `deltaWad`          | BigNumberish |
| `transferFrom`      | boolean      |
| `liquidationEngine` | string       |
| `saviour`           | string       |

**Returns:** _TransactionRequest_

---

### makeCollateralBag

▸ **makeCollateralBag**(`collateralJoin`: string): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:219](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L219)_

**Parameters:**

| Name             | Type   |
| ---------------- | ------ |
| `collateralJoin` | string |

**Returns:** _TransactionRequest_

---

### modifySAFECollateralization

▸ **modifySAFECollateralization**(`safe`: BigNumberish, `deltaCollateral`: BigNumberish, `deltaDebt`: BigNumberish): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:225](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L225)_

**Parameters:**

| Name              | Type         |
| ----------------- | ------------ |
| `safe`            | BigNumberish |
| `deltaCollateral` | BigNumberish |
| `deltaDebt`       | BigNumberish |

**Returns:** _TransactionRequest_

---

### moveSAFE

▸ **moveSAFE**(`safeSrc`: BigNumberish, `safeDst`: BigNumberish): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:235](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L235)_

**Parameters:**

| Name      | Type         |
| --------- | ------------ |
| `safeSrc` | BigNumberish |
| `safeDst` | BigNumberish |

**Returns:** _TransactionRequest_

---

### openLockETHAndGenerateDebt

▸ **openLockETHAndGenerateDebt**(`ethValue`: BigNumberish, `collateralType`: BytesLike, `deltaWad`: BigNumberish): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:241](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L241)_

**Parameters:**

| Name             | Type         |
| ---------------- | ------------ |
| `ethValue`       | BigNumberish |
| `collateralType` | BytesLike    |
| `deltaWad`       | BigNumberish |

**Returns:** _TransactionRequest_

---

### openLockETHGenerateDebtAndProtectSAFE

▸ **openLockETHGenerateDebtAndProtectSAFE**(`ethValue`: BigNumberish, `collateralType`: BytesLike, `deltaWad`: BigNumberish, `saviour`: string): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:251](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L251)_

**Parameters:**

| Name             | Type         |
| ---------------- | ------------ |
| `ethValue`       | BigNumberish |
| `collateralType` | BytesLike    |
| `deltaWad`       | BigNumberish |
| `saviour`        | string       |

**Returns:** _TransactionRequest_

---

### openLockGNTAndGenerateDebt

▸ **openLockGNTAndGenerateDebt**(`gntJoin`: string, `collateralType`: BytesLike, `collateralAmount`: BigNumberish, `deltaWad`: BigNumberish): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:262](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L262)_

**Parameters:**

| Name               | Type         |
| ------------------ | ------------ |
| `gntJoin`          | string       |
| `collateralType`   | BytesLike    |
| `collateralAmount` | BigNumberish |
| `deltaWad`         | BigNumberish |

**Returns:** _TransactionRequest_

---

### openLockGNTGenerateDebtAndProtectSAFE

▸ **openLockGNTGenerateDebtAndProtectSAFE**(`gntJoin`: string, `collateralType`: BytesLike, `collateralAmount`: BigNumberish, `deltaWad`: BigNumberish, `saviour`: string): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:273](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L273)_

**Parameters:**

| Name               | Type         |
| ------------------ | ------------ |
| `gntJoin`          | string       |
| `collateralType`   | BytesLike    |
| `collateralAmount` | BigNumberish |
| `deltaWad`         | BigNumberish |
| `saviour`          | string       |

**Returns:** _TransactionRequest_

---

### openLockTokenCollateralAndGenerateDebt

▸ **openLockTokenCollateralAndGenerateDebt**(`manager`: string, `taxCollector`: string, `collateralJoin`: string, `coinJoin`: string, `collateralType`: BytesLike, `collateralAmount`: BigNumberish, `deltaWad`: BigNumberish, `transferFrom`: boolean): _TransactionRequest_

_Inherited from [GebProxyActions](gebproxyactions.md).[openLockTokenCollateralAndGenerateDebt](gebproxyactions.md#openlocktokencollateralandgeneratedebt)_

Defined in packages/geb-contract-api/lib/generated/GebProxyActions.d.ts:31

**Parameters:**

| Name               | Type         |
| ------------------ | ------------ |
| `manager`          | string       |
| `taxCollector`     | string       |
| `collateralJoin`   | string       |
| `coinJoin`         | string       |
| `collateralType`   | BytesLike    |
| `collateralAmount` | BigNumberish |
| `deltaWad`         | BigNumberish |
| `transferFrom`     | boolean      |

**Returns:** _TransactionRequest_

---

### openLockTokenCollateralGenerateDebtAndProtectSAFE

▸ **openLockTokenCollateralGenerateDebtAndProtectSAFE**(`manager`: string, `taxCollector`: string, `collateralJoin`: string, `coinJoin`: string, `collateralType`: BytesLike, `collateralAmount`: BigNumberish, `deltaWad`: BigNumberish, `transferFrom`: boolean, `liquidationEngine`: string, `saviour`: string): _TransactionRequest_

_Inherited from [GebProxyActions](gebproxyactions.md).[openLockTokenCollateralGenerateDebtAndProtectSAFE](gebproxyactions.md#openlocktokencollateralgeneratedebtandprotectsafe)_

Defined in packages/geb-contract-api/lib/generated/GebProxyActions.d.ts:32

**Parameters:**

| Name                | Type         |
| ------------------- | ------------ |
| `manager`           | string       |
| `taxCollector`      | string       |
| `collateralJoin`    | string       |
| `coinJoin`          | string       |
| `collateralType`    | BytesLike    |
| `collateralAmount`  | BigNumberish |
| `deltaWad`          | BigNumberish |
| `transferFrom`      | boolean      |
| `liquidationEngine` | string       |
| `saviour`           | string       |

**Returns:** _TransactionRequest_

---

### openSAFE

▸ **openSAFE**(`collateralType`: BytesLike, `usr`: string): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:310](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L310)_

**Parameters:**

| Name             | Type      |
| ---------------- | --------- |
| `collateralType` | BytesLike |
| `usr`            | string    |

**Returns:** _TransactionRequest_

---

### protectSAFE

▸ **protectSAFE**(`safe`: BigNumberish, `saviour`: string): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:316](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L316)_

**Parameters:**

| Name      | Type         |
| --------- | ------------ |
| `safe`    | BigNumberish |
| `saviour` | string       |

**Returns:** _TransactionRequest_

---

### quitSystem

▸ **quitSystem**(`safe`: BigNumberish, `dst`: string): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:322](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L322)_

**Parameters:**

| Name   | Type         |
| ------ | ------------ |
| `safe` | BigNumberish |
| `dst`  | string       |

**Returns:** _TransactionRequest_

---

### repayAllDebt

▸ **repayAllDebt**(`safe`: BigNumberish): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:328](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L328)_

**Parameters:**

| Name   | Type         |
| ------ | ------------ |
| `safe` | BigNumberish |

**Returns:** _TransactionRequest_

---

### repayAllDebtAndFreeETH

▸ **repayAllDebtAndFreeETH**(`safe`: BigNumberish, `collateralWad`: BigNumberish): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:334](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L334)_

**Parameters:**

| Name            | Type         |
| --------------- | ------------ |
| `safe`          | BigNumberish |
| `collateralWad` | BigNumberish |

**Returns:** _TransactionRequest_

---

### repayAllDebtAndFreeTokenCollateral

▸ **repayAllDebtAndFreeTokenCollateral**(`collateralJoin`: string, `safe`: BigNumberish, `collateralAmount`: BigNumberish): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:343](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L343)_

**Parameters:**

| Name               | Type         |
| ------------------ | ------------ |
| `collateralJoin`   | string       |
| `safe`             | BigNumberish |
| `collateralAmount` | BigNumberish |

**Returns:** _TransactionRequest_

---

### repayDebt

▸ **repayDebt**(`safe`: BigNumberish, `wad`: BigNumberish): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:353](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L353)_

**Parameters:**

| Name   | Type         |
| ------ | ------------ |
| `safe` | BigNumberish |
| `wad`  | BigNumberish |

**Returns:** _TransactionRequest_

---

### repayDebtAndFreeETH

▸ **repayDebtAndFreeETH**(`safe`: BigNumberish, `collateralWad`: BigNumberish, `deltaWad`: BigNumberish): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:359](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L359)_

**Parameters:**

| Name            | Type         |
| --------------- | ------------ |
| `safe`          | BigNumberish |
| `collateralWad` | BigNumberish |
| `deltaWad`      | BigNumberish |

**Returns:** _TransactionRequest_

---

### repayDebtAndFreeTokenCollateral

▸ **repayDebtAndFreeTokenCollateral**(`collateralJoin`: string, `safe`: BigNumberish, `collateralAmount`: BigNumberish, `deltaWad`: BigNumberish): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:369](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L369)_

**Parameters:**

| Name               | Type         |
| ------------------ | ------------ |
| `collateralJoin`   | string       |
| `safe`             | BigNumberish |
| `collateralAmount` | BigNumberish |
| `deltaWad`         | BigNumberish |

**Returns:** _TransactionRequest_

---

### safeLockETH

▸ **safeLockETH**(`ethValue`: BigNumberish, `safe`: BigNumberish, `owner`: string): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:380](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L380)_

**Parameters:**

| Name       | Type         |
| ---------- | ------------ |
| `ethValue` | BigNumberish |
| `safe`     | BigNumberish |
| `owner`    | string       |

**Returns:** _TransactionRequest_

---

### safeLockTokenCollateral

▸ **safeLockTokenCollateral**(`manager`: string, `collateralJoin`: string, `safe`: BigNumberish, `amt`: BigNumberish, `transferFrom`: boolean, `owner`: string): _TransactionRequest_

_Inherited from [GebProxyActions](gebproxyactions.md).[safeLockTokenCollateral](gebproxyactions.md#safelocktokencollateral)_

Defined in packages/geb-contract-api/lib/generated/GebProxyActions.d.ts:43

**Parameters:**

| Name             | Type         |
| ---------------- | ------------ |
| `manager`        | string       |
| `collateralJoin` | string       |
| `safe`           | BigNumberish |
| `amt`            | BigNumberish |
| `transferFrom`   | boolean      |
| `owner`          | string       |

**Returns:** _TransactionRequest_

---

### safeRepayAllDebt

▸ **safeRepayAllDebt**(`safe`: BigNumberish, `owner`: string): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:402](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L402)_

**Parameters:**

| Name    | Type         |
| ------- | ------------ |
| `safe`  | BigNumberish |
| `owner` | string       |

**Returns:** _TransactionRequest_

---

### safeRepayDebt

▸ **safeRepayDebt**(`safe`: BigNumberish, `wad`: BigNumberish, `owner`: string): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:408](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L408)_

**Parameters:**

| Name    | Type         |
| ------- | ------------ |
| `safe`  | BigNumberish |
| `wad`   | BigNumberish |
| `owner` | string       |

**Returns:** _TransactionRequest_

---

### tokenCollateralJoin_join

▸ **tokenCollateralJoin_join**(`apt`: string, `safe`: string, `amt`: BigNumberish, `transferFrom`: boolean): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:418](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L418)_

**Parameters:**

| Name           | Type         |
| -------------- | ------------ |
| `apt`          | string       |
| `safe`         | string       |
| `amt`          | BigNumberish |
| `transferFrom` | boolean      |

**Returns:** _TransactionRequest_

---

### transfer

▸ **transfer**(`collateral`: string, `dst`: string, `amt`: BigNumberish): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:429](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L429)_

**Parameters:**

| Name         | Type         |
| ------------ | ------------ |
| `collateral` | string       |
| `dst`        | string       |
| `amt`        | BigNumberish |

**Returns:** _TransactionRequest_

---

### transferCollateral

▸ **transferCollateral**(`safe`: BigNumberish, `dst`: string, `wad`: BigNumberish): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:439](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L439)_

**Parameters:**

| Name   | Type         |
| ------ | ------------ |
| `safe` | BigNumberish |
| `dst`  | string       |
| `wad`  | BigNumberish |

**Returns:** _TransactionRequest_

---

### transferInternalCoins

▸ **transferInternalCoins**(`safe`: BigNumberish, `dst`: string, `rad`: BigNumberish): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:449](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L449)_

**Parameters:**

| Name   | Type         |
| ------ | ------------ |
| `safe` | BigNumberish |
| `dst`  | string       |
| `rad`  | BigNumberish |

**Returns:** _TransactionRequest_

---

### transferSAFEOwnership

▸ **transferSAFEOwnership**(`safe`: BigNumberish, `usr`: string): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:459](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L459)_

**Parameters:**

| Name   | Type         |
| ------ | ------------ |
| `safe` | BigNumberish |
| `usr`  | string       |

**Returns:** _TransactionRequest_

---

### transferSAFEOwnershipToProxy

▸ **transferSAFEOwnershipToProxy**(`safe`: BigNumberish, `dst`: string): _TransactionRequest_

_Overrides void_

_Defined in [packages/geb/src/proxy-action.ts:465](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/proxy-action.ts#L465)_

**Parameters:**

| Name   | Type         |
| ------ | ------------ |
| `safe` | BigNumberish |
| `dst`  | string       |

**Returns:** _TransactionRequest_
