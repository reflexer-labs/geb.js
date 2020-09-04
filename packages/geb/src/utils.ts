import {
    ContractAddresses,
    ContractList,
    KOVAN_ADDRESSES,
    MAINNET_ADDRESSES,
} from '@reflexer-finance/geb-contract-api'
import { BigNumberish, BigNumber, FixedNumber } from '@ethersproject/bignumber'
import { WAD } from './const'

export const getAddressList = (network: ContractAddresses): ContractList => {
    if (network === 'kovan') {
        return KOVAN_ADDRESSES
    } else if (network === 'mainnet') {
        return MAINNET_ADDRESSES
    } else {
        return network
    }
}

// === Constants ===

/**
 * byte32 value for the "ETH-A" collateral
 */
const ETH_A =
    '0x4554482d41000000000000000000000000000000000000000000000000000000'

/**
 * 0x0 address or burn address
 */
const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'

/**
 * Constant 10^18
 */
const WAD = BigNumber.from('1000000000000000000')

/**
 * Constant 10^27
 */
const RAY = WAD.mul('1000000000')

/**
 * Constant 10^45
 */
const RAD = WAD.pow(2)

// ==== Utils functions ===

/**
 * Return a fixed number object from a RAD
 * @param  {BigNumberish} rad
 */
const radToFixed = (rad: BigNumberish) => {
    return FixedNumber.fromValue(BigNumber.from(rad), -45)
}

/**
 * Return a fixed number object from a RAD
 * @param  {BigNumberish} rad
 */
const rayToFixed = (ray: BigNumberish) => {
    return FixedNumber.fromValue(BigNumber.from(ray), -27)
}

/**
 * Return a fixed number object from a RAD
 * @param  {BigNumberish} wad
 */
const wadToFixed = (wad: BigNumberish) => {
    return FixedNumber.fromValue(BigNumber.from(wad), -45)
}

/**
 * Multiply by the power of 10 !! Precision loss if shift < 0 !!
 * @param val Value to convert
 * @param shift Number of places to shift the decimal
 */
const decimalShift = (val: BigNumberish, shift: number) => {
    if (shift > 0) {
        return BigNumber.from(val).mul(BigNumber.from(10).pow(shift))
    } else if (shift < 0) {
        return BigNumber.from(val).div(BigNumber.from(10).pow(Math.abs(shift)))
    } else {
        BigNumber.from(val)
    }

    return BigNumber.from(val)
}

export {
    // Constants
    ETH_A,
    NULL_ADDRESS,
    WAD,
    RAY,
    RAD,
    //Utils
    wadToFixed,
    rayToFixed,
    radToFixed,
    decimalShift,
}
