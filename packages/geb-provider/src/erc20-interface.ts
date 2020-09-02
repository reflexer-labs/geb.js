import { BigNumberish, BigNumber } from '@ethersproject/bignumber'
import { TransactionRequest } from './base-contract-api'

export interface ERC20 {
    name(): Promise<string>
    approve(guy: string, wad: BigNumberish): Promise<TransactionRequest>
    totalSupply(): Promise<BigNumber>
    transferFrom(
        src: string,
        dst: string,
        wad: BigNumberish
    ): Promise<TransactionRequest>
    decimals(): Promise<number>
    balanceOf(arg0: string): Promise<BigNumber>
    symbol(): Promise<string>
    transfer(dst: string, wad: BigNumberish): Promise<TransactionRequest>
    allowance(arg0: string, arg1: string): Promise<BigNumber>
}
