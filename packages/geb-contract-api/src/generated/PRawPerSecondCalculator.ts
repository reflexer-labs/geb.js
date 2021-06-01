/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { BaseContractAPI } from '@reflexer-finance/geb-contract-base'
import { MulticallRequest } from '@reflexer-finance/geb-contract-base'
import { TransactionRequest } from '@reflexer-finance/geb-contract-base'
import { BytesLike } from '@ethersproject/bytes'
import { BigNumberish } from '@ethersproject/bignumber'
import { BigNumber } from '@ethersproject/bignumber'

export class PRawPerSecondCalculator extends BaseContractAPI {
    Kp(): Promise<BigNumber>
    Kp(multicall: true): MulticallRequest<BigNumber>
    Kp(multicall?: true): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"Kp","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    adat(): Promise<BigNumber>
    adat(multicall: true): MulticallRequest<BigNumber>
    adat(multicall?: true): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"adat","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    addAuthority(account: string): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addAuthority","outputs":[],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [account])
    }

    addReader(account: string): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addReader","outputs":[],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [account])
    }

    allReaderToggle(): Promise<BigNumber>
    allReaderToggle(multicall: true): MulticallRequest<BigNumber>
    allReaderToggle(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"allReaderToggle","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    authorities(address: string): Promise<BigNumber>
    authorities(address: string, multicall: true): MulticallRequest<BigNumber>
    authorities(
        address: string,
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"authorities","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [address], multicall)
    }

    breaksNoiseBarrier(
        proportionalResult: BigNumberish,
        redemptionPrice: BigNumberish
    ): Promise<boolean>
    breaksNoiseBarrier(
        proportionalResult: BigNumberish,
        redemptionPrice: BigNumberish,
        multicall: true
    ): MulticallRequest<boolean>
    breaksNoiseBarrier(
        proportionalResult: BigNumberish,
        redemptionPrice: BigNumberish,
        multicall?: true
    ): Promise<boolean> | MulticallRequest<boolean> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"uint256","name":"proportionalResult","type":"uint256"},{"internalType":"uint256","name":"redemptionPrice","type":"uint256"}],"name":"breaksNoiseBarrier","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(
            abi,
            [proportionalResult, redemptionPrice],
            multicall
        )
    }

    computeRate(
        marketPrice: BigNumberish,
        redemptionPrice: BigNumberish,
        uinteger: BigNumberish
    ): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"uint256","name":"marketPrice","type":"uint256"},{"internalType":"uint256","name":"redemptionPrice","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"computeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [
            marketPrice,
            redemptionPrice,
            uinteger,
        ])
    }

    dgt(): Promise<BigNumber>
    dgt(multicall: true): MulticallRequest<BigNumber>
    dgt(multicall?: true): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"dgt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    drr(): Promise<BigNumber>
    drr(multicall: true): MulticallRequest<BigNumber>
    drr(multicall?: true): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"drr","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    folb(): Promise<BigNumber>
    folb(multicall: true): MulticallRequest<BigNumber>
    folb(multicall?: true): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"folb","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    foub(): Promise<BigNumber>
    foub(multicall: true): MulticallRequest<BigNumber>
    foub(multicall?: true): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"foub","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    getBoundedRedemptionRate(
        pOutput: BigNumberish
    ): Promise<{
        0: BigNumber
        1: BigNumber
    }>
    getBoundedRedemptionRate(
        pOutput: BigNumberish,
        multicall: true
    ): MulticallRequest<{
        0: BigNumber
        1: BigNumber
    }>
    getBoundedRedemptionRate(
        pOutput: BigNumberish,
        multicall?: true
    ):
        | Promise<{
              0: BigNumber
              1: BigNumber
          }>
        | MulticallRequest<{
              0: BigNumber
              1: BigNumber
          }> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"int256","name":"pOutput","type":"int256"}],"name":"getBoundedRedemptionRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [pOutput], multicall)
    }

    getNextRedemptionRate(
        marketPrice: BigNumberish,
        redemptionPrice: BigNumberish,
        uinteger: BigNumberish
    ): Promise<{
        0: BigNumber
        1: BigNumber
        2: BigNumber
    }>
    getNextRedemptionRate(
        marketPrice: BigNumberish,
        redemptionPrice: BigNumberish,
        uinteger: BigNumberish,
        multicall: true
    ): MulticallRequest<{
        0: BigNumber
        1: BigNumber
        2: BigNumber
    }>
    getNextRedemptionRate(
        marketPrice: BigNumberish,
        redemptionPrice: BigNumberish,
        uinteger: BigNumberish,
        multicall?: true
    ):
        | Promise<{
              0: BigNumber
              1: BigNumber
              2: BigNumber
          }>
        | MulticallRequest<{
              0: BigNumber
              1: BigNumber
              2: BigNumber
          }> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"uint256","name":"marketPrice","type":"uint256"},{"internalType":"uint256","name":"redemptionPrice","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"getNextRedemptionRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"int256","name":"","type":"int256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(
            abi,
            [marketPrice, redemptionPrice, uinteger],
            multicall
        )
    }

    lut(): Promise<BigNumber>
    lut(multicall: true): MulticallRequest<BigNumber>
    lut(multicall?: true): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"lut","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    modifyParameters__Bytes32Int256(
        parameter: BytesLike,
        val: BigNumberish
    ): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"bytes32","name":"parameter","type":"bytes32"},{"internalType":"int256","name":"val","type":"int256"}],"name":"modifyParameters","outputs":[],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [parameter, val])
    }

    modifyParameters__Bytes32Address(
        parameter: BytesLike,
        addr: string
    ): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"bytes32","name":"parameter","type":"bytes32"},{"internalType":"address","name":"addr","type":"address"}],"name":"modifyParameters","outputs":[],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [parameter, addr])
    }

    modifyParameters__Bytes32Uint256(
        parameter: BytesLike,
        val: BigNumberish
    ): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"bytes32","name":"parameter","type":"bytes32"},{"internalType":"uint256","name":"val","type":"uint256"}],"name":"modifyParameters","outputs":[],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [parameter, val])
    }

    nb(): Promise<BigNumber>
    nb(multicall: true): MulticallRequest<BigNumber>
    nb(multicall?: true): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"nb","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    ps(): Promise<BigNumber>
    ps(multicall: true): MulticallRequest<BigNumber>
    ps(multicall?: true): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"ps","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    pscl(): Promise<BigNumber>
    pscl(multicall: true): MulticallRequest<BigNumber>
    pscl(multicall?: true): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"pscl","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    readers(address: string): Promise<BigNumber>
    readers(address: string, multicall: true): MulticallRequest<BigNumber>
    readers(
        address: string,
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"readers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [address], multicall)
    }

    removeAuthority(account: string): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"removeAuthority","outputs":[],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [account])
    }

    removeReader(account: string): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"removeReader","outputs":[],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [account])
    }

    rt(
        marketPrice: BigNumberish,
        redemptionPrice: BigNumberish,
        uinteger: BigNumberish
    ): Promise<BigNumber>
    rt(
        marketPrice: BigNumberish,
        redemptionPrice: BigNumberish,
        uinteger: BigNumberish,
        multicall: true
    ): MulticallRequest<BigNumber>
    rt(
        marketPrice: BigNumberish,
        redemptionPrice: BigNumberish,
        uinteger: BigNumberish,
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"uint256","name":"marketPrice","type":"uint256"},{"internalType":"uint256","name":"redemptionPrice","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"rt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(
            abi,
            [marketPrice, redemptionPrice, uinteger],
            multicall
        )
    }

    seedProposer(): Promise<string>
    seedProposer(multicall: true): MulticallRequest<string>
    seedProposer(multicall?: true): Promise<string> | MulticallRequest<string> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"seedProposer","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    sg(): Promise<BigNumber>
    sg(multicall: true): MulticallRequest<BigNumber>
    sg(multicall?: true): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"sg","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    tlv(): Promise<BigNumber>
    tlv(multicall: true): MulticallRequest<BigNumber>
    tlv(multicall?: true): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"tlv","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }
}