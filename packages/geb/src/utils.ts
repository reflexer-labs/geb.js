import { BigNumberish, BigNumber, FixedNumber } from '@ethersproject/bignumber'

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
const RAY = BigNumber.from('1000000000000000000000000000')

/**
 * Constant 10^45
 */
const RAD = BigNumber.from('1000000000000000000000000000000000000000000000')

// ==== Utils functions ===

/**
 * Return a fixed number object from a RAD
 * @param  {BigNumberish} rad
 */
const radToFixed = (rad: BigNumberish) => {
    return FixedNumber.fromValue(BigNumber.from(rad), 45, 'fixed256x45')
}

/**
 * Return a fixed number object from a RAD
 * @param  {BigNumberish} rad
 */
const rayToFixed = (ray: BigNumberish) => {
    return FixedNumber.fromValue(BigNumber.from(ray), 27, 'fixed256x27')
}

/**
 * Return a fixed number object from a RAD
 * @param  {BigNumberish} wad
 */
const wadToFixed = (wad: BigNumberish) => {
    return FixedNumber.fromValue(BigNumber.from(wad), 18, 'fixed256x18')
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

const decodeChainError = (error: any): string => {
    let data: string
    if (error?.data) {
        data = error.data
    } else if (error?.error?.data) {
        data = error.error.data
    } else if (error?.error?.stack) {
        return error.error.stack.split('\n')[0]
    } else {
        throw new Error('Unknown error format')
    }

    if (data.startsWith('Reverted 0x08c379a0')) {
        data = data.slice(19)
    } else if (data.startsWith('0x08c379a0')) {
        data = data.slice(10)
    } else if (data === 'Reverted') {
        return 'Reverted'
    } else if (data === 'Reverted 0x') {
        return '0x'
    } else {
        return data
    }

    return decodeURIComponent(data.slice(2).replace(/[0-9a-f]{2}/g, '%$&'))
        .replace(/\0/g, '')
        .slice(2)
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
    decodeChainError,
}
