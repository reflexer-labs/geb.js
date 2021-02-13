/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { BaseContractAPI } from '@reflexer-finance/geb-contract-base'
import { MulticallRequest } from '@reflexer-finance/geb-contract-base'
import { TransactionRequest } from '@reflexer-finance/geb-contract-base'
import { BytesLike } from '@ethersproject/bytes'
import { BigNumberish } from '@ethersproject/bignumber'
import { BigNumber } from '@ethersproject/bignumber'

export class UniswapV2Pair extends BaseContractAPI {
    DOMAIN_SEPARATOR(): Promise<string>
    DOMAIN_SEPARATOR(multicall: true): MulticallRequest<string>
    DOMAIN_SEPARATOR(
        multicall?: true
    ): Promise<string> | MulticallRequest<string> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    MINIMUM_LIQUIDITY(): Promise<BigNumber>
    MINIMUM_LIQUIDITY(multicall: true): MulticallRequest<BigNumber>
    MINIMUM_LIQUIDITY(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    PERMIT_TYPEHASH(): Promise<string>
    PERMIT_TYPEHASH(multicall: true): MulticallRequest<string>
    PERMIT_TYPEHASH(
        multicall?: true
    ): Promise<string> | MulticallRequest<string> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    allowance(address1: string, address2: string): Promise<BigNumber>
    allowance(
        address1: string,
        address2: string,
        multicall: true
    ): MulticallRequest<BigNumber>
    allowance(
        address1: string,
        address2: string,
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [address1, address2], multicall)
    }

    approve(spender: string, value: BigNumberish): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [spender, value])
    }

    balanceOf(address: string): Promise<BigNumber>
    balanceOf(address: string, multicall: true): MulticallRequest<BigNumber>
    balanceOf(
        address: string,
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [address], multicall)
    }

    burn(to: string): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [to])
    }

    decimals(): Promise<number>
    decimals(multicall: true): MulticallRequest<number>
    decimals(multicall?: true): Promise<number> | MulticallRequest<number> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    factory(): Promise<string>
    factory(multicall: true): MulticallRequest<string>
    factory(multicall?: true): Promise<string> | MulticallRequest<string> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    getReserves(): Promise<{
        _reserve0: BigNumber
        _reserve1: BigNumber
        _blockTimestampLast: number
    }>
    getReserves(
        multicall: true
    ): MulticallRequest<{
        _reserve0: BigNumber
        _reserve1: BigNumber
        _blockTimestampLast: number
    }>
    getReserves(
        multicall?: true
    ):
        | Promise<{
              _reserve0: BigNumber
              _reserve1: BigNumber
              _blockTimestampLast: number
          }>
        | MulticallRequest<{
              _reserve0: BigNumber
              _reserve1: BigNumber
              _blockTimestampLast: number
          }> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    initialize(_token0: string, _token1: string): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [_token0, _token1])
    }

    kLast(): Promise<BigNumber>
    kLast(multicall: true): MulticallRequest<BigNumber>
    kLast(multicall?: true): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    mint(to: string): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [to])
    }

    name(): Promise<string>
    name(multicall: true): MulticallRequest<string>
    name(multicall?: true): Promise<string> | MulticallRequest<string> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    nonces(address: string): Promise<BigNumber>
    nonces(address: string, multicall: true): MulticallRequest<BigNumber>
    nonces(
        address: string,
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [address], multicall)
    }

    permit(
        owner: string,
        spender: string,
        value: BigNumberish,
        deadline: BigNumberish,
        v: BigNumberish,
        r: BytesLike,
        s: BytesLike
    ): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [
            owner,
            spender,
            value,
            deadline,
            v,
            r,
            s,
        ])
    }

    price0CumulativeLast(): Promise<BigNumber>
    price0CumulativeLast(multicall: true): MulticallRequest<BigNumber>
    price0CumulativeLast(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    price1CumulativeLast(): Promise<BigNumber>
    price1CumulativeLast(multicall: true): MulticallRequest<BigNumber>
    price1CumulativeLast(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    skim(to: string): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [to])
    }

    swap(
        amount0Out: BigNumberish,
        amount1Out: BigNumberish,
        to: string,
        data: BytesLike
    ): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [
            amount0Out,
            amount1Out,
            to,
            data,
        ])
    }

    symbol(): Promise<string>
    symbol(multicall: true): MulticallRequest<string>
    symbol(multicall?: true): Promise<string> | MulticallRequest<string> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    sync(): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"sync","outputs":[],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [])
    }

    token0(): Promise<string>
    token0(multicall: true): MulticallRequest<string>
    token0(multicall?: true): Promise<string> | MulticallRequest<string> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    token1(): Promise<string>
    token1(multicall: true): MulticallRequest<string>
    token1(multicall?: true): Promise<string> | MulticallRequest<string> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    totalSupply(): Promise<BigNumber>
    totalSupply(multicall: true): MulticallRequest<BigNumber>
    totalSupply(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    transfer(to: string, value: BigNumberish): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [to, value])
    }

    transferFrom(
        from: string,
        to: string,
        value: BigNumberish
    ): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [from, to, value])
    }
}