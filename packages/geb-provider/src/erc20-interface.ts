import { BigNumberish, BigNumber } from '@ethersproject/bignumber'
import { TransactionRequest } from './base-contract-api'

export interface ERC20 {
    name(): Promise<string>
    approve(guy: string, wad: BigNumberish): TransactionRequest
    totalSupply(): Promise<BigNumber>
    transferFrom(
        src: string,
        dst: string,
        wad: BigNumberish
    ): TransactionRequest
    decimals(): Promise<number>
    balanceOf(arg0: string): Promise<BigNumber>
    symbol(): Promise<string>
    transfer(dst: string, wad: BigNumberish): TransactionRequest
    allowance(arg0: string, arg1: string): Promise<BigNumber>
}
