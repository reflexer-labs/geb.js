/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { BaseContractAPI } from '@reflexer-finance/geb-contract-base'
import { MulticallRequest } from '@reflexer-finance/geb-contract-base'
import { TransactionRequest } from '@reflexer-finance/geb-contract-base'
import { BytesLike } from '@ethersproject/bytes'
import { BigNumberish } from '@ethersproject/bignumber'
import { BigNumber } from '@ethersproject/bignumber'

export class UniswapMedianFlxusd extends BaseContractAPI {
    addAuthorization(account: string): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addAuthorization","outputs":[],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [account])
    }

    authorizedAccounts(address: string): Promise<BigNumber>
    authorizedAccounts(
        address: string,
        multicall: true
    ): MulticallRequest<BigNumber>
    authorizedAccounts(
        address: string,
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"authorizedAccounts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [address], multicall)
    }

    baseUpdateCallerReward(): Promise<BigNumber>
    baseUpdateCallerReward(multicall: true): MulticallRequest<BigNumber>
    baseUpdateCallerReward(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"baseUpdateCallerReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    converterComputeAmountOut(amountIn: BigNumberish): Promise<BigNumber>
    converterComputeAmountOut(
        amountIn: BigNumberish,
        multicall: true
    ): MulticallRequest<BigNumber>
    converterComputeAmountOut(
        amountIn: BigNumberish,
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"name":"converterComputeAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [amountIn], multicall)
    }

    converterFeed(): Promise<string>
    converterFeed(multicall: true): MulticallRequest<string>
    converterFeed(
        multicall?: true
    ): Promise<string> | MulticallRequest<string> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"converterFeed","outputs":[{"internalType":"contract ConverterFeedLike","name":"","type":"address"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    converterFeedObservations(
        uinteger: BigNumberish
    ): Promise<{
        timestamp: BigNumber
        price: BigNumber
    }>
    converterFeedObservations(
        uinteger: BigNumberish,
        multicall: true
    ): MulticallRequest<{
        timestamp: BigNumber
        price: BigNumber
    }>
    converterFeedObservations(
        uinteger: BigNumberish,
        multicall?: true
    ):
        | Promise<{
              timestamp: BigNumber
              price: BigNumber
          }>
        | MulticallRequest<{
              timestamp: BigNumber
              price: BigNumber
          }> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"converterFeedObservations","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [uinteger], multicall)
    }

    converterFeedScalingFactor(): Promise<BigNumber>
    converterFeedScalingFactor(multicall: true): MulticallRequest<BigNumber>
    converterFeedScalingFactor(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"converterFeedScalingFactor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    converterPriceCumulative(): Promise<BigNumber>
    converterPriceCumulative(multicall: true): MulticallRequest<BigNumber>
    converterPriceCumulative(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"converterPriceCumulative","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    defaultAmountIn(): Promise<BigNumber>
    defaultAmountIn(multicall: true): MulticallRequest<BigNumber>
    defaultAmountIn(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"defaultAmountIn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    denominationToken(): Promise<string>
    denominationToken(multicall: true): MulticallRequest<string>
    denominationToken(
        multicall?: true
    ): Promise<string> | MulticallRequest<string> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"denominationToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    getCallerReward(): Promise<BigNumber>
    getCallerReward(multicall: true): MulticallRequest<BigNumber>
    getCallerReward(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"getCallerReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    getObservationListLength(): Promise<{
        0: BigNumber
        1: BigNumber
    }>
    getObservationListLength(
        multicall: true
    ): MulticallRequest<{
        0: BigNumber
        1: BigNumber
    }>
    getObservationListLength(
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
        const abi = {"inputs":[],"name":"getObservationListLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    getResultWithValidity(): Promise<{
        0: BigNumber
        1: boolean
    }>
    getResultWithValidity(
        multicall: true
    ): MulticallRequest<{
        0: BigNumber
        1: boolean
    }>
    getResultWithValidity(
        multicall?: true
    ):
        | Promise<{
              0: BigNumber
              1: boolean
          }>
        | MulticallRequest<{
              0: BigNumber
              1: boolean
          }> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"getResultWithValidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    granularity(): Promise<number>
    granularity(multicall: true): MulticallRequest<number>
    granularity(multicall?: true): Promise<number> | MulticallRequest<number> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"granularity","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    lastUpdateTime(): Promise<BigNumber>
    lastUpdateTime(multicall: true): MulticallRequest<BigNumber>
    lastUpdateTime(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    maxRewardIncreaseDelay(): Promise<BigNumber>
    maxRewardIncreaseDelay(multicall: true): MulticallRequest<BigNumber>
    maxRewardIncreaseDelay(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"maxRewardIncreaseDelay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    maxUpdateCallerReward(): Promise<BigNumber>
    maxUpdateCallerReward(multicall: true): MulticallRequest<BigNumber>
    maxUpdateCallerReward(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"maxUpdateCallerReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    modifyParameters1(parameter: BytesLike, data: string): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"bytes32","name":"parameter","type":"bytes32"},{"internalType":"address","name":"data","type":"address"}],"name":"modifyParameters","outputs":[],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [parameter, data])
    }

    modifyParameters2(
        parameter: BytesLike,
        data: BigNumberish
    ): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"bytes32","name":"parameter","type":"bytes32"},{"internalType":"address","name":"data","type":"address"}],"name":"modifyParameters","outputs":[],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [parameter, data])
    }

    observationIndexOf(timestamp: BigNumberish): Promise<number>
    observationIndexOf(
        timestamp: BigNumberish,
        multicall: true
    ): MulticallRequest<number>
    observationIndexOf(
        timestamp: BigNumberish,
        multicall?: true
    ): Promise<number> | MulticallRequest<number> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"observationIndexOf","outputs":[{"internalType":"uint8","name":"index","type":"uint8"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [timestamp], multicall)
    }

    perSecondCallerRewardIncrease(): Promise<BigNumber>
    perSecondCallerRewardIncrease(multicall: true): MulticallRequest<BigNumber>
    perSecondCallerRewardIncrease(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"perSecondCallerRewardIncrease","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    periodSize(): Promise<BigNumber>
    periodSize(multicall: true): MulticallRequest<BigNumber>
    periodSize(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"periodSize","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    read(): Promise<BigNumber>
    read(multicall: true): MulticallRequest<BigNumber>
    read(multicall?: true): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"read","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    removeAuthorization(account: string): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"removeAuthorization","outputs":[],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [account])
    }

    symbol(): Promise<string>
    symbol(multicall: true): MulticallRequest<string>
    symbol(multicall?: true): Promise<string> | MulticallRequest<string> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"symbol","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    targetToken(): Promise<string>
    targetToken(multicall: true): MulticallRequest<string>
    targetToken(multicall?: true): Promise<string> | MulticallRequest<string> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"targetToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    treasury(): Promise<string>
    treasury(multicall: true): MulticallRequest<string>
    treasury(multicall?: true): Promise<string> | MulticallRequest<string> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"treasury","outputs":[{"internalType":"contract StabilityFeeTreasuryLike","name":"","type":"address"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    treasuryAllowance(): Promise<BigNumber>
    treasuryAllowance(multicall: true): MulticallRequest<BigNumber>
    treasuryAllowance(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"treasuryAllowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    uniswapComputeAmountOut(
        priceCumulativeStart: BigNumberish,
        priceCumulativeEnd: BigNumberish,
        timeElapsed: BigNumberish,
        amountIn: BigNumberish
    ): Promise<BigNumber>
    uniswapComputeAmountOut(
        priceCumulativeStart: BigNumberish,
        priceCumulativeEnd: BigNumberish,
        timeElapsed: BigNumberish,
        amountIn: BigNumberish,
        multicall: true
    ): MulticallRequest<BigNumber>
    uniswapComputeAmountOut(
        priceCumulativeStart: BigNumberish,
        priceCumulativeEnd: BigNumberish,
        timeElapsed: BigNumberish,
        amountIn: BigNumberish,
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"uint256","name":"priceCumulativeStart","type":"uint256"},{"internalType":"uint256","name":"priceCumulativeEnd","type":"uint256"},{"internalType":"uint256","name":"timeElapsed","type":"uint256"},{"internalType":"uint256","name":"amountIn","type":"uint256"}],"name":"uniswapComputeAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"}

        return this.ethCallOrMulticall(
            abi,
            [priceCumulativeStart, priceCumulativeEnd, timeElapsed, amountIn],
            multicall
        )
    }

    uniswapFactory(): Promise<string>
    uniswapFactory(multicall: true): MulticallRequest<string>
    uniswapFactory(
        multicall?: true
    ): Promise<string> | MulticallRequest<string> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"uniswapFactory","outputs":[{"internalType":"contract IUniswapV2Factory","name":"","type":"address"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    uniswapObservations(
        uinteger: BigNumberish
    ): Promise<{
        timestamp: BigNumber
        price0Cumulative: BigNumber
        price1Cumulative: BigNumber
    }>
    uniswapObservations(
        uinteger: BigNumberish,
        multicall: true
    ): MulticallRequest<{
        timestamp: BigNumber
        price0Cumulative: BigNumber
        price1Cumulative: BigNumber
    }>
    uniswapObservations(
        uinteger: BigNumberish,
        multicall?: true
    ):
        | Promise<{
              timestamp: BigNumber
              price0Cumulative: BigNumber
              price1Cumulative: BigNumber
          }>
        | MulticallRequest<{
              timestamp: BigNumber
              price0Cumulative: BigNumber
              price1Cumulative: BigNumber
          }> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"uniswapObservations","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"price0Cumulative","type":"uint256"},{"internalType":"uint256","name":"price1Cumulative","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [uinteger], multicall)
    }

    uniswapPair(): Promise<string>
    uniswapPair(multicall: true): MulticallRequest<string>
    uniswapPair(multicall?: true): Promise<string> | MulticallRequest<string> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"uniswapPair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    updateResult(feeReceiver: string): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"address","name":"feeReceiver","type":"address"}],"name":"updateResult","outputs":[],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [feeReceiver])
    }

    updates(): Promise<BigNumber>
    updates(multicall: true): MulticallRequest<BigNumber>
    updates(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"updates","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    windowSize(): Promise<BigNumber>
    windowSize(multicall: true): MulticallRequest<BigNumber>
    windowSize(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"windowSize","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }
}
