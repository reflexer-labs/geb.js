/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { BaseContractAPI } from '@reflexer-finance/geb-contract-base'
import { MulticallRequest } from '@reflexer-finance/geb-contract-base'
import { TransactionRequest } from '@reflexer-finance/geb-contract-base'
import { BytesLike } from '@ethersproject/bytes'
import { BigNumberish } from '@ethersproject/bignumber'
import { BigNumber } from '@ethersproject/bignumber'

export class DebtAuctionInitialParameterSetter extends BaseContractAPI {
    RAY(): Promise<BigNumber>
    RAY(multicall: true): MulticallRequest<BigNumber>
    RAY(multicall?: true): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"RAY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    WAD(): Promise<BigNumber>
    WAD(multicall: true): MulticallRequest<BigNumber>
    WAD(multicall?: true): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"WAD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    accountingEngine(): Promise<string>
    accountingEngine(multicall: true): MulticallRequest<string>
    accountingEngine(
        multicall?: true
    ): Promise<string> | MulticallRequest<string> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"accountingEngine","outputs":[{"internalType":"contract AccountingEngineLike","name":"","type":"address"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    addAuthorization(account: string): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addAuthorization","outputs":[],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [account])
    }

    addition(x: BigNumberish, y: BigNumberish): Promise<BigNumber>
    addition(
        x: BigNumberish,
        y: BigNumberish,
        multicall: true
    ): MulticallRequest<BigNumber>
    addition(
        x: BigNumberish,
        y: BigNumberish,
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"y","type":"uint256"}],"name":"addition","outputs":[{"internalType":"uint256","name":"z","type":"uint256"}],"stateMutability":"pure","type":"function"}

        return this.ethCallOrMulticall(abi, [x, y], multicall)
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

    bidTargetValue(): Promise<BigNumber>
    bidTargetValue(multicall: true): MulticallRequest<BigNumber>
    bidTargetValue(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"bidTargetValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    getCallerReward(
        timeOfLastUpdate: BigNumberish,
        defaultDelayBetweenCalls: BigNumberish
    ): Promise<BigNumber>
    getCallerReward(
        timeOfLastUpdate: BigNumberish,
        defaultDelayBetweenCalls: BigNumberish,
        multicall: true
    ): MulticallRequest<BigNumber>
    getCallerReward(
        timeOfLastUpdate: BigNumberish,
        defaultDelayBetweenCalls: BigNumberish,
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"uint256","name":"timeOfLastUpdate","type":"uint256"},{"internalType":"uint256","name":"defaultDelayBetweenCalls","type":"uint256"}],"name":"getCallerReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(
            abi,
            [timeOfLastUpdate, defaultDelayBetweenCalls],
            multicall
        )
    }

    getNewDebtBid(): Promise<BigNumber>
    getNewDebtBid(multicall: true): MulticallRequest<BigNumber>
    getNewDebtBid(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"getNewDebtBid","outputs":[{"internalType":"uint256","name":"debtAuctionBidSize","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    getPremiumAdjustedProtocolTokenAmount(): Promise<BigNumber>
    getPremiumAdjustedProtocolTokenAmount(
        multicall: true
    ): MulticallRequest<BigNumber>
    getPremiumAdjustedProtocolTokenAmount(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"getPremiumAdjustedProtocolTokenAmount","outputs":[{"internalType":"uint256","name":"debtAuctionMintedTokens","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    getRawProtocolTokenAmount(): Promise<BigNumber>
    getRawProtocolTokenAmount(multicall: true): MulticallRequest<BigNumber>
    getRawProtocolTokenAmount(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"getRawProtocolTokenAmount","outputs":[{"internalType":"uint256","name":"debtAuctionMintedTokens","type":"uint256"}],"stateMutability":"view","type":"function"}

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

    manualSetDebtAuctionParameters(
        debtAuctionBidSize: BigNumberish,
        initialDebtAuctionMintedTokens: BigNumberish
    ): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"uint256","name":"debtAuctionBidSize","type":"uint256"},{"internalType":"uint256","name":"initialDebtAuctionMintedTokens","type":"uint256"}],"name":"manualSetDebtAuctionParameters","outputs":[],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [
            debtAuctionBidSize,
            initialDebtAuctionMintedTokens,
        ])
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

    minProtocolTokenAmountOffered(): Promise<BigNumber>
    minProtocolTokenAmountOffered(multicall: true): MulticallRequest<BigNumber>
    minProtocolTokenAmountOffered(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"minProtocolTokenAmountOffered","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    minimum(x: BigNumberish, y: BigNumberish): Promise<BigNumber>
    minimum(
        x: BigNumberish,
        y: BigNumberish,
        multicall: true
    ): MulticallRequest<BigNumber>
    minimum(
        x: BigNumberish,
        y: BigNumberish,
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"y","type":"uint256"}],"name":"minimum","outputs":[{"internalType":"uint256","name":"z","type":"uint256"}],"stateMutability":"pure","type":"function"}

        return this.ethCallOrMulticall(abi, [x, y], multicall)
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

    multiply(x: BigNumberish, y: BigNumberish): Promise<BigNumber>
    multiply(
        x: BigNumberish,
        y: BigNumberish,
        multicall: true
    ): MulticallRequest<BigNumber>
    multiply(
        x: BigNumberish,
        y: BigNumberish,
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"y","type":"uint256"}],"name":"multiply","outputs":[{"internalType":"uint256","name":"z","type":"uint256"}],"stateMutability":"pure","type":"function"}

        return this.ethCallOrMulticall(abi, [x, y], multicall)
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

    protocolTokenOrcl(): Promise<string>
    protocolTokenOrcl(multicall: true): MulticallRequest<string>
    protocolTokenOrcl(
        multicall?: true
    ): Promise<string> | MulticallRequest<string> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"protocolTokenOrcl","outputs":[{"internalType":"contract OracleLike","name":"","type":"address"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    protocolTokenPremium(): Promise<BigNumber>
    protocolTokenPremium(multicall: true): MulticallRequest<BigNumber>
    protocolTokenPremium(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"protocolTokenPremium","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    rad(x: BigNumberish): Promise<BigNumber>
    rad(x: BigNumberish, multicall: true): MulticallRequest<BigNumber>
    rad(
        x: BigNumberish,
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"rad","outputs":[{"internalType":"uint256","name":"z","type":"uint256"}],"stateMutability":"pure","type":"function"}

        return this.ethCallOrMulticall(abi, [x], multicall)
    }

    ray(x: BigNumberish): Promise<BigNumber>
    ray(x: BigNumberish, multicall: true): MulticallRequest<BigNumber>
    ray(
        x: BigNumberish,
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"ray","outputs":[{"internalType":"uint256","name":"z","type":"uint256"}],"stateMutability":"pure","type":"function"}

        return this.ethCallOrMulticall(abi, [x], multicall)
    }

    rdivide(x: BigNumberish, y: BigNumberish): Promise<BigNumber>
    rdivide(
        x: BigNumberish,
        y: BigNumberish,
        multicall: true
    ): MulticallRequest<BigNumber>
    rdivide(
        x: BigNumberish,
        y: BigNumberish,
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"y","type":"uint256"}],"name":"rdivide","outputs":[{"internalType":"uint256","name":"z","type":"uint256"}],"stateMutability":"pure","type":"function"}

        return this.ethCallOrMulticall(abi, [x, y], multicall)
    }

    removeAuthorization(account: string): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"removeAuthorization","outputs":[],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [account])
    }

    rmultiply(x: BigNumberish, y: BigNumberish): Promise<BigNumber>
    rmultiply(
        x: BigNumberish,
        y: BigNumberish,
        multicall: true
    ): MulticallRequest<BigNumber>
    rmultiply(
        x: BigNumberish,
        y: BigNumberish,
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"y","type":"uint256"}],"name":"rmultiply","outputs":[{"internalType":"uint256","name":"z","type":"uint256"}],"stateMutability":"pure","type":"function"}

        return this.ethCallOrMulticall(abi, [x, y], multicall)
    }

    rpower(
        x: BigNumberish,
        n: BigNumberish,
        base: BigNumberish
    ): Promise<BigNumber>
    rpower(
        x: BigNumberish,
        n: BigNumberish,
        base: BigNumberish,
        multicall: true
    ): MulticallRequest<BigNumber>
    rpower(
        x: BigNumberish,
        n: BigNumberish,
        base: BigNumberish,
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"n","type":"uint256"},{"internalType":"uint256","name":"base","type":"uint256"}],"name":"rpower","outputs":[{"internalType":"uint256","name":"z","type":"uint256"}],"stateMutability":"pure","type":"function"}

        return this.ethCallOrMulticall(abi, [x, n, base], multicall)
    }

    setDebtAuctionInitialParameters(feeReceiver: string): TransactionRequest {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"address","name":"feeReceiver","type":"address"}],"name":"setDebtAuctionInitialParameters","outputs":[],"stateMutability":"nonpayable","type":"function"}

        return this.getTransactionRequest(abi, [feeReceiver])
    }

    subtract(x: BigNumberish, y: BigNumberish): Promise<BigNumber>
    subtract(
        x: BigNumberish,
        y: BigNumberish,
        multicall: true
    ): MulticallRequest<BigNumber>
    subtract(
        x: BigNumberish,
        y: BigNumberish,
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"y","type":"uint256"}],"name":"subtract","outputs":[{"internalType":"uint256","name":"z","type":"uint256"}],"stateMutability":"pure","type":"function"}

        return this.ethCallOrMulticall(abi, [x, y], multicall)
    }

    systemCoinOrcl(): Promise<string>
    systemCoinOrcl(multicall: true): MulticallRequest<string>
    systemCoinOrcl(
        multicall?: true
    ): Promise<string> | MulticallRequest<string> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"systemCoinOrcl","outputs":[{"internalType":"contract OracleLike","name":"","type":"address"}],"stateMutability":"view","type":"function"}

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

    updateDelay(): Promise<BigNumber>
    updateDelay(multicall: true): MulticallRequest<BigNumber>
    updateDelay(
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[],"name":"updateDelay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

        return this.ethCallOrMulticall(abi, [], multicall)
    }

    wdivide(x: BigNumberish, y: BigNumberish): Promise<BigNumber>
    wdivide(
        x: BigNumberish,
        y: BigNumberish,
        multicall: true
    ): MulticallRequest<BigNumber>
    wdivide(
        x: BigNumberish,
        y: BigNumberish,
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"y","type":"uint256"}],"name":"wdivide","outputs":[{"internalType":"uint256","name":"z","type":"uint256"}],"stateMutability":"pure","type":"function"}

        return this.ethCallOrMulticall(abi, [x, y], multicall)
    }

    wmultiply(x: BigNumberish, y: BigNumberish): Promise<BigNumber>
    wmultiply(
        x: BigNumberish,
        y: BigNumberish,
        multicall: true
    ): MulticallRequest<BigNumber>
    wmultiply(
        x: BigNumberish,
        y: BigNumberish,
        multicall?: true
    ): Promise<BigNumber> | MulticallRequest<BigNumber> {
        // prettier-ignore
        // @ts-ignore
        const abi = {"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"y","type":"uint256"}],"name":"wmultiply","outputs":[{"internalType":"uint256","name":"z","type":"uint256"}],"stateMutability":"pure","type":"function"}

        return this.ethCallOrMulticall(abi, [x, y], multicall)
    }
}
