# Class: Safe

Represent a GEB safe. Has the safe state and provide helper function to calculate liquidation price, CRatio, etc...

## Hierarchy

-   **Safe**

## Index

### Constructors

-   [constructor](safe.md#constructor)

### Properties

-   [collateral](safe.md#collateral)
-   [collateralType](safe.md#collateraltype)
-   [debt](safe.md#debt)
-   [handler](safe.md#handler)
-   [isManaged](safe.md#ismanaged)

### Methods

-   [getCRatio](safe.md#getcratio)
-   [getLRatio](safe.md#getlratio)
-   [liquidationPrice](safe.md#liquidationprice)

## Constructors

### constructor

\+ **new Safe**(`contracts`: ContractApis, `handler`: string, `debt`: BigNumber, `collateral`: BigNumber, `collateralType`: string, `isManaged`: boolean): _[Safe](safe.md)_

_Defined in [packages/geb/src/schema/safe.ts:8](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/schema/safe.ts#L8)_

**Parameters:**

| Name             | Type         |
| ---------------- | ------------ |
| `contracts`      | ContractApis |
| `handler`        | string       |
| `debt`           | BigNumber    |
| `collateral`     | BigNumber    |
| `collateralType` | string       |
| `isManaged`      | boolean      |

**Returns:** _[Safe](safe.md)_

## Properties

### collateral

• **collateral**: _BigNumber_

_Defined in [packages/geb/src/schema/safe.ts:23](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/schema/safe.ts#L23)_

Amount of collateral of the safe

---

### collateralType

• **collateralType**: _string_

_Defined in [packages/geb/src/schema/safe.ts:27](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/schema/safe.ts#L27)_

Collateral type of the safe (ETH-A only)

---

### debt

• **debt**: _BigNumber_

_Defined in [packages/geb/src/schema/safe.ts:19](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/schema/safe.ts#L19)_

Amount of debt of the safe

---

### handler

• **handler**: _string_

_Defined in [packages/geb/src/schema/safe.ts:15](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/schema/safe.ts#L15)_

Safe handler in safe engine

---

### isManaged

• **isManaged**: _boolean_

_Defined in [packages/geb/src/schema/safe.ts:31](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/schema/safe.ts#L31)_

If the safe was open through the safe manager

## Methods

### getCRatio

▸ **getCRatio**(): _Promise‹FixedNumber | null›_

_Defined in [packages/geb/src/schema/safe.ts:38](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/schema/safe.ts#L38)_

Ratio used to calculate the amount of debt that can be drawn. Returns null is ratio is +Infinity. !! Use unsafe division leading to precision loss.

**Returns:** _Promise‹FixedNumber | null›_

Promise<FixedNumber> CRatio

---

### getLRatio

▸ **getLRatio**(): _Promise‹FixedNumber | null›_

_Defined in [packages/geb/src/schema/safe.ts:61](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/schema/safe.ts#L61)_

Ratio used for liquidation. If LRatio = 1 you can get liquidated, the greater LRatio the safer your safe is. !! Use unsafe division leading to precision loss.

**Returns:** _Promise‹FixedNumber | null›_

Promise<FixedNumber> LRatio

---

### liquidationPrice

▸ **liquidationPrice**(): _Promise‹FixedNumber | null›_

_Defined in [packages/geb/src/schema/safe.ts:84](https://github.com/reflexer-labs/geb.js/blob/fdb2fbc/packages/geb/src/schema/safe.ts#L84)_

Price at which the safe would get liquidated.

**Returns:** _Promise‹FixedNumber | null›_

<FixedNumber> Liquidation price
