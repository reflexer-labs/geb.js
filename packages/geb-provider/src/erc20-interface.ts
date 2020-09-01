import { BigNumberish, BigNumber } from '@ethersproject/bignumber'

export interface ERC20<TX_OBJ> {
    name(): Promise<string>
    approve(guy: string, wad: BigNumberish): Promise<TX_OBJ>
    totalSupply(): Promise<BigNumber>
    transferFrom(src: string, dst: string, wad: BigNumberish): Promise<TX_OBJ>
    decimals(): Promise<number>
    balanceOf(arg0: string): Promise<BigNumber>
    symbol(): Promise<string>
    transfer(dst: string, wad: BigNumberish): Promise<TX_OBJ>
    allowance(arg0: string, arg1: string): Promise<BigNumber>
}
