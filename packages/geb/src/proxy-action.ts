import {
    GebProviderInterface,
    ContractList,
    GebDeployment,
    getAddressList,
} from '@reflexer-finance/geb-contract-base'
import { TransactionRequest } from '@reflexer-finance/geb-contract-base'
import { BytesLike } from '@ethersproject/bytes'
import { BigNumberish } from '@ethersproject/bignumber'
import { BigNumber } from '@ethersproject/bignumber'

import {
    GebProxyActions as GebProxyActionsCore,
    DsProxy,
    GebProxyActionsGlobalSettlement,
    GebProxyLeverageActions,
    GebProxyIncentivesActions,
    GebProxyDebtAuctionActions,
    GebProxySurplusAuctionActions,
    GebProxySaviourActions,
} from '@reflexer-finance/geb-contract-api'
import { NULL_ADDRESS } from './utils'

/**
 * Convenience class to call functions from [GebProxyActions](https://github.com/reflexer-labs/geb-proxy-actions/blob/master/src/GebProxyActions.sol) through a proxy contract registered in the [GebProxyRegistry](https://github.com/reflexer-labs/geb-proxy-registry/blob/master/src/GebProxyRegistry.sol). These actions bundle multiple actions in one (e.g: open a safe + lock some ETH + draw some system coins).
 */
export class GebProxyActions {
    /**
     * Underlying proxy object. Can be use to make custom calls to the proxy using `proxy.execute()` function.
     * For the details of each function
     */
    public proxy: DsProxy

    /**
     * Address of the base proxy actions contract.
     */
    public proxyActionCoreAddress: string

    /**
     * Address of the proxy actions contract for global settlement.
     */
    public proxyActionGlobalSettlementAddress: string

    /**
     * Address of the proxy actions contract for Uniswap LP share staking.
     */
    public proxyActionIncentiveAddress: string

    /**
     * Address of the proxy actions contract used for leverage with flash loans.
     */
    public proxyActionLeverageAddress: string

    /**
     * Address of the proxy actions contract for debt auctions.
     */
    public proxyActionDebtAuctionAddress: string

    /**
     * Address of the proxy actions contract for surplus auctions.
     */
    public proxyActionSurplusAuctionAddress: string

    /**
     * Address of the proxy actions contract for surplus auctions.
     */
    public proxyActionSaviourAddress: string

    private addressList: ContractList
    private proxyActionCore: GebProxyActionsCore
    private proxyActionGlobalSettlement: GebProxyActionsGlobalSettlement
    private proxyActionIncentive: GebProxyIncentivesActions
    private proxyActionLeverage: GebProxyLeverageActions
    private proxyActionDebtAuction: GebProxyDebtAuctionActions
    private proxyActionSurplusAuction: GebProxySurplusAuctionActions
    private proxyActionSaviour: GebProxySaviourActions

    constructor(
        /**
         * Address of the underlying proxy
         */
        public proxyAddress: string,
        network: GebDeployment,
        private chainProvider: GebProviderInterface
    ) {
        this.addressList = getAddressList(network)

        this.proxy = new DsProxy(proxyAddress, this.chainProvider)

        // Set proxy action contract addresses
        this.proxyActionCoreAddress = this.addressList.PROXY_ACTIONS
        this.proxyActionGlobalSettlementAddress = this.addressList.PROXY_ACTIONS_GLOBAL_SETTLEMENT
        this.proxyActionIncentiveAddress = this.addressList.PROXY_ACTIONS_INCENTIVES
        this.proxyActionLeverageAddress = this.addressList.LEVERAGE_PROXY_ACTION
        this.proxyActionDebtAuctionAddress = this.addressList.PROXY_DEBT_AUCTION_ACTIONS
        this.proxyActionSurplusAuctionAddress = this.addressList.PROXY_SURPLUS_AUCTION_ACTIONS
        this.proxyActionSaviourAddress = this.addressList.PROXY_SAVIOUR_ACTIONS

        // Proxy contract APIs
        this.proxyActionCore = new GebProxyActionsCore(
            this.proxyActionCoreAddress,
            this.chainProvider
        )
        this.proxyActionGlobalSettlement = new GebProxyActionsGlobalSettlement(
            this.proxyActionGlobalSettlementAddress,
            this.chainProvider
        )

        this.proxyActionIncentive = new GebProxyIncentivesActions(
            this.proxyActionIncentiveAddress,
            this.chainProvider
        )

        this.proxyActionLeverage = new GebProxyLeverageActions(
            this.proxyActionLeverageAddress,
            this.chainProvider
        )
        this.proxyActionDebtAuction = new GebProxyDebtAuctionActions(
            this.proxyActionDebtAuctionAddress,
            this.chainProvider
        )
        this.proxyActionSurplusAuction = new GebProxySurplusAuctionActions(
            this.proxyActionSurplusAuctionAddress,
            this.chainProvider
        )
        this.proxyActionSaviour = new GebProxySaviourActions(
            this.proxyActionSaviourAddress,
            this.chainProvider
        )
    }

    private getProxiedTransactionRequest(
        tx: TransactionRequest
    ): TransactionRequest {
        let ethValue = tx.value
        if (!ethValue) {
            ethValue = BigNumber.from('0')
        }

        if (tx.to === NULL_ADDRESS) {
            throw Error('This proxy action is not supported on this network')
        }

        return this.proxy.execute__AddressBytes(ethValue, tx.to, tx.data)
    }

    // ==== Proxy Action Core ====

    allowSAFE(
        safe: BigNumberish,
        usr: string,
        ok: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.allowSAFE(
                this.addressList.SAFE_MANAGER,
                safe,
                usr,
                ok
            )
        )
    }

    approveSAFEModification(obj: string, usr: string): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.approveSAFEModification(obj, usr)
        )
    }

    coinJoin_join(
        apt: string,
        safeHandler: string,
        wad: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.coinJoin_join(apt, safeHandler, wad)
        )
    }

    denySAFEModification(obj: string, usr: string): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.denySAFEModification(obj, usr)
        )
    }

    enterSystem(src: string, safe: BigNumberish): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.enterSystem(
                this.addressList.SAFE_MANAGER,
                src,
                safe
            )
        )
    }

    exitETH(safe: BigNumberish, wad: BigNumberish): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.exitETH(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_JOIN_ETH_A,
                safe,
                wad
            )
        )
    }

    exitTokenCollateral(
        collateralJoin: string,
        safe: BigNumberish,
        amt: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.exitTokenCollateral(
                this.addressList.SAFE_MANAGER,
                collateralJoin,
                safe,
                amt
            )
        )
    }

    freeETH(safe: BigNumberish, wad: BigNumberish): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.freeETH(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_JOIN_ETH_A,
                safe,
                wad
            )
        )
    }

    freeTokenCollateral(
        collateralJoin: string,
        safe: BigNumberish,
        amt: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.freeTokenCollateral(
                this.addressList.SAFE_MANAGER,
                collateralJoin,
                safe,
                amt
            )
        )
    }

    generateDebt(safe: BigNumberish, wad: BigNumberish): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.generateDebt(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_COIN_JOIN,
                safe,
                wad
            )
        )
    }

    generateDebtAndProtectSAFE(
        safe: BigNumberish,
        wad: BigNumberish,
        saviour: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.generateDebtAndProtectSAFE(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_COIN_JOIN,
                safe,
                wad,
                this.addressList.GEB_LIQUIDATION_ENGINE,
                saviour
            )
        )
    }

    lockETH(ethValue: BigNumberish, safe: BigNumberish): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.lockETH(
                BigNumber.from(ethValue),
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_JOIN_ETH_A,
                safe
            )
        )
    }

    lockETHAndGenerateDebt(
        ethValue: BigNumberish,
        safe: BigNumberish,
        deltaWad: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.lockETHAndGenerateDebt(
                BigNumber.from(ethValue),
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_COIN_JOIN,
                safe,
                deltaWad
            )
        )
    }

    lockTokenCollateral(
        collateralJoin: string,
        safe: BigNumberish,
        amt: BigNumberish,
        transferFrom: boolean
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.lockTokenCollateral(
                this.addressList.SAFE_MANAGER,
                collateralJoin,
                safe,
                amt,
                transferFrom
            )
        )
    }

    lockTokenCollateralAndGenerateDebt(
        collateralJoin: string,
        safe: BigNumberish,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish,
        transferFrom: boolean
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.lockTokenCollateralAndGenerateDebt(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                collateralJoin,
                this.addressList.GEB_COIN_JOIN,
                safe,
                collateralAmount,
                deltaWad,
                transferFrom
            )
        )
    }

    lockTokenCollateralGenerateDebtAndProtectSAFE(
        collateralJoin: string,
        safe: BigNumberish,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish,
        transferFrom: boolean,
        saviour: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.lockTokenCollateralGenerateDebtAndProtectSAFE(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                collateralJoin,
                this.addressList.GEB_COIN_JOIN,
                safe,
                collateralAmount,
                deltaWad,
                transferFrom,
                this.addressList.GEB_LIQUIDATION_ENGINE,
                saviour
            )
        )
    }

    makeCollateralBag(collateralJoin: string): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.makeCollateralBag(collateralJoin)
        )
    }

    modifySAFECollateralization(
        safe: BigNumberish,
        deltaCollateral: BigNumberish,
        deltaDebt: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.modifySAFECollateralization(
                this.addressList.SAFE_MANAGER,
                safe,
                deltaCollateral,
                deltaDebt
            )
        )
    }

    moveSAFE(safeSrc: BigNumberish, safeDst: BigNumberish): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.moveSAFE(
                this.addressList.SAFE_MANAGER,
                safeSrc,
                safeDst
            )
        )
    }

    openLockETHAndGenerateDebt(
        ethValue: BigNumberish,
        collateralType: BytesLike,
        deltaWad: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.openLockETHAndGenerateDebt(
                BigNumber.from(ethValue),
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_COIN_JOIN,
                collateralType,
                deltaWad
            )
        )
    }

    openLockETHGenerateDebtAndProtectSAFE(
        ethValue: BigNumberish,
        collateralType: BytesLike,
        deltaWad: BigNumberish,
        saviour: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.openLockETHGenerateDebtAndProtectSAFE(
                BigNumber.from(ethValue),
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_COIN_JOIN,
                collateralType,
                deltaWad,
                this.addressList.GEB_LIQUIDATION_ENGINE,
                saviour
            )
        )
    }

    openLockGNTAndGenerateDebt(
        gntJoin: string,
        collateralType: BytesLike,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.openLockGNTAndGenerateDebt(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                gntJoin,
                this.addressList.GEB_COIN_JOIN,
                collateralType,
                collateralAmount,
                deltaWad
            )
        )
    }

    openLockGNTGenerateDebtAndProtectSAFE(
        gntJoin: string,
        collateralType: BytesLike,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish,
        saviour: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.openLockGNTGenerateDebtAndProtectSAFE(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                gntJoin,
                this.addressList.GEB_COIN_JOIN,
                collateralType,
                collateralAmount,
                deltaWad,
                this.addressList.GEB_LIQUIDATION_ENGINE,
                saviour
            )
        )
    }

    openLockTokenCollateralAndGenerateDebt(
        collateralJoin: string,
        collateralType: BytesLike,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish,
        transferFrom: boolean
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.openLockTokenCollateralAndGenerateDebt(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                collateralJoin,
                this.addressList.GEB_COIN_JOIN,
                collateralType,
                collateralAmount,
                deltaWad,
                transferFrom
            )
        )
    }

    openLockTokenCollateralGenerateDebtAndProtectSAFE(
        collateralJoin: string,
        collateralType: BytesLike,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish,
        transferFrom: boolean,
        saviour: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.openLockTokenCollateralGenerateDebtAndProtectSAFE(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                collateralJoin,
                this.addressList.GEB_COIN_JOIN,
                collateralType,
                collateralAmount,
                deltaWad,
                transferFrom,
                this.addressList.GEB_LIQUIDATION_ENGINE,
                saviour
            )
        )
    }

    openSAFE(collateralType: BytesLike, usr: string): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.openSAFE(
                this.addressList.SAFE_MANAGER,
                collateralType,
                usr
            )
        )
    }

    quitSystem(safe: BigNumberish, dst: string): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.quitSystem(
                this.addressList.SAFE_MANAGER,
                safe,
                dst
            )
        )
    }

    repayAllDebt(safe: BigNumberish): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.repayAllDebt(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_COIN_JOIN,
                safe
            )
        )
    }

    repayAllDebtAndFreeETH(
        safe: BigNumberish,
        collateralWad: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.repayAllDebtAndFreeETH(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_COIN_JOIN,
                safe,
                collateralWad
            )
        )
    }

    repayAllDebtAndFreeTokenCollateral(
        collateralJoin: string,
        safe: BigNumberish,
        collateralAmount: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.repayAllDebtAndFreeTokenCollateral(
                this.addressList.SAFE_MANAGER,
                collateralJoin,
                this.addressList.GEB_COIN_JOIN,
                safe,
                collateralAmount
            )
        )
    }

    repayDebt(safe: BigNumberish, wad: BigNumberish): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.repayDebt(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_COIN_JOIN,
                safe,
                wad
            )
        )
    }

    repayDebtAndFreeETH(
        safe: BigNumberish,
        collateralWad: BigNumberish,
        deltaWad: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.repayDebtAndFreeETH(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_COIN_JOIN,
                safe,
                collateralWad,
                deltaWad
            )
        )
    }

    repayDebtAndFreeTokenCollateral(
        collateralJoin: string,
        safe: BigNumberish,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.repayDebtAndFreeTokenCollateral(
                this.addressList.SAFE_MANAGER,
                collateralJoin,
                this.addressList.GEB_COIN_JOIN,
                safe,
                collateralAmount,
                deltaWad
            )
        )
    }

    safeLockETH(
        ethValue: BigNumberish,
        safe: BigNumberish,
        owner: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.safeLockETH(
                BigNumber.from(ethValue),
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_JOIN_ETH_A,
                safe,
                owner
            )
        )
    }

    safeLockTokenCollateral(
        collateralJoin: string,
        safe: BigNumberish,
        amt: BigNumberish,
        transferFrom: boolean,
        owner: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.safeLockTokenCollateral(
                this.addressList.SAFE_MANAGER,
                collateralJoin,
                safe,
                amt,
                transferFrom,
                owner
            )
        )
    }

    safeRepayAllDebt(safe: BigNumberish, owner: string): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.safeRepayAllDebt(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_COIN_JOIN,
                safe,
                owner
            )
        )
    }

    safeRepayDebt(
        safe: BigNumberish,
        wad: BigNumberish,
        owner: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.safeRepayDebt(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_COIN_JOIN,
                safe,
                wad,
                owner
            )
        )
    }

    tokenCollateralJoin_join(
        apt: string,
        safe: string,
        amt: BigNumberish,
        transferFrom: boolean
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.tokenCollateralJoin_join(
                apt,
                safe,
                amt,
                transferFrom
            )
        )
    }

    transfer(
        collateral: string,
        dst: string,
        amt: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.transfer(collateral, dst, amt)
        )
    }

    transferCollateral(
        safe: BigNumberish,
        dst: string,
        wad: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.transferCollateral(
                this.addressList.SAFE_MANAGER,
                safe,
                dst,
                wad
            )
        )
    }

    transferInternalCoins(
        safe: BigNumberish,
        dst: string,
        rad: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.transferInternalCoins(
                this.addressList.SAFE_MANAGER,
                safe,
                dst,
                rad
            )
        )
    }

    transferSAFEOwnership(safe: BigNumberish, usr: string): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.transferSAFEOwnership(
                this.addressList.SAFE_MANAGER,
                safe,
                usr
            )
        )
    }

    transferSAFEOwnershipToProxy(
        safe: BigNumberish,
        dst: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.transferSAFEOwnershipToProxy(
                this.addressList.PROXY_REGISTRY,
                this.addressList.SAFE_MANAGER,
                safe,
                dst
            )
        )
    }

    // ==== Proxy Actions Global Settlement ====

    prepareCoinsForRedeemingGlobalSettlement(
        wad: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionGlobalSettlement.prepareCoinsForRedeeming(
                this.addressList.GEB_COIN_JOIN,
                this.addressList.GEB_GLOBAL_SETTLEMENT,
                wad
            )
        )
    }

    freeTokenCollateralGlobalSettlement(
        collateralJoin: string,
        safe: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionGlobalSettlement.freeTokenCollateral(
                this.addressList.SAFE_MANAGER,
                collateralJoin,
                this.addressList.GEB_GLOBAL_SETTLEMENT,
                safe
            )
        )
    }

    redeemETHGlobalSettlement(
        ethJoin: string,
        collateralType: BytesLike,
        wad: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionGlobalSettlement.redeemETH(
                ethJoin,
                this.addressList.GEB_GLOBAL_SETTLEMENT,
                collateralType,
                wad
            )
        )
    }

    redeemTokenCollateralGlobalSettlement(
        collateralJoin: string,
        collateralType: BytesLike,
        wad: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionGlobalSettlement.redeemTokenCollateral(
                collateralJoin,
                this.addressList.GEB_GLOBAL_SETTLEMENT,
                collateralType,
                wad
            )
        )
    }

    // ==== Proxy Actions Incentive ====

    exitAndRemoveLiquidity(
        minTokenAmounts: [BigNumberish, BigNumberish],
        campaignAddress: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.exitAndRemoveLiquidity(
                this.addressList.GEB_COIN_JOIN,
                campaignAddress,
                this.addressList.UNISWAP_ROUTER,
                minTokenAmounts
            )
        )
    }

    exitMine(campaignAddress: string): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.exitMine(campaignAddress)
        )
    }

    exitRemoveLiquidityRepayDebt(
        safe: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish],
        campaignAddress: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.exitRemoveLiquidityRepayDebt(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_COIN_JOIN,
                safe,
                campaignAddress,
                this.addressList.UNISWAP_ROUTER,
                minTokenAmounts
            )
        )
    }

    generateDebtAndProvideLiquidityStake(
        ethValue: BigNumberish,
        safe: BigNumberish,
        wad: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish],
        campaignAddress: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.generateDebtAndProvideLiquidityStake(
                BigNumber.from(ethValue),
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_COIN_JOIN,
                this.addressList.UNISWAP_ROUTER,
                campaignAddress,
                safe,
                wad,
                minTokenAmounts
            )
        )
    }

    generateDebtAndProvideLiquidityUniswap(
        ethValue: BigNumberish,
        safe: BigNumberish,
        wad: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish],
        campaignAddress: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.generateDebtAndProvideLiquidityUniswap(
                BigNumber.from(ethValue),
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_COIN_JOIN,
                this.addressList.UNISWAP_ROUTER,
                safe,
                wad,
                minTokenAmounts
            )
        )
    }

    lockETHGenerateDebtProvideLiquidityStake(
        ethValue: BigNumberish,
        safe: BigNumberish,
        deltaWad: BigNumberish,
        liquidityWad: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish],
        campaignAddress: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.lockETHGenerateDebtProvideLiquidityStake(
                BigNumber.from(ethValue),
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_COIN_JOIN,
                this.addressList.UNISWAP_ROUTER,
                campaignAddress,
                safe,
                deltaWad,
                liquidityWad,
                minTokenAmounts
            )
        )
    }

    lockETHGenerateDebtProvideLiquidityUniswap(
        ethValue: BigNumberish,
        safe: BigNumberish,
        deltaWad: BigNumberish,
        liquidityWad: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish]
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.lockETHGenerateDebtProvideLiquidityUniswap(
                BigNumber.from(ethValue),
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_COIN_JOIN,
                this.addressList.UNISWAP_ROUTER,
                safe,
                deltaWad,
                liquidityWad,
                minTokenAmounts
            )
        )
    }

    openLockETHGenerateDebtProvideLiquidityStake(
        ethValue: BigNumberish,
        deltaWad: BigNumberish,
        collateralType: string,
        liquidityWad: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish],
        campaignAddress: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.openLockETHGenerateDebtProvideLiquidityStake(
                BigNumber.from(ethValue),
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_COIN_JOIN,
                this.addressList.UNISWAP_ROUTER,
                campaignAddress,
                collateralType,
                deltaWad,
                liquidityWad,
                minTokenAmounts
            )
        )
    }

    openLockETHGenerateDebtProvideLiquidityUniswap(
        ethValue: BigNumberish,
        deltaWad: BigNumberish,
        collateralType: string,
        liquidityWad: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish]
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.openLockETHGenerateDebtProvideLiquidityUniswap(
                BigNumber.from(ethValue),
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_COIN_JOIN,
                this.addressList.UNISWAP_ROUTER,
                collateralType,
                deltaWad,
                liquidityWad,
                minTokenAmounts
            )
        )
    }

    provideLiquidityUniswap(
        ethValue: BigNumberish,
        wad: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish]
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.provideLiquidityUniswap(
                BigNumber.from(ethValue),
                this.addressList.GEB_COIN_JOIN,
                this.addressList.UNISWAP_ROUTER,
                wad,
                minTokenAmounts
            )
        )
    }

    removeLiquidityUniswap(
        systemCoin: string,
        value: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish]
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.removeLiquidityUniswap(
                this.addressList.UNISWAP_ROUTER,
                systemCoin,
                value,
                minTokenAmounts
            )
        )
    }

    stakeInMine(
        wad: BigNumberish,
        campaignAddress: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.stakeInMine(campaignAddress, wad)
        )
    }

    withdrawAndHarvest(
        value: BigNumberish,
        campaignAddress: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.withdrawAndHarvest(campaignAddress, value)
        )
    }

    withdrawAndRemoveLiquidity(
        value: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish],
        campaignAddress: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.withdrawAndRemoveLiquidity(
                this.addressList.GEB_COIN_JOIN,
                campaignAddress,
                value,
                this.addressList.UNISWAP_ROUTER,
                minTokenAmounts
            )
        )
    }

    withdrawFromMine(
        value: BigNumberish,
        campaignAddress: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.withdrawFromMine(campaignAddress, value)
        )
    }

    withdrawRemoveLiquidityRepayDebt(
        safe: BigNumberish,
        value: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish],
        campaignAddress: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.withdrawRemoveLiquidityRepayDebt(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_COIN_JOIN,
                safe,
                campaignAddress,
                value,
                this.addressList.UNISWAP_ROUTER,
                minTokenAmounts
            )
        )
    }

    getRewards(campaignAddress: string): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.getRewards(campaignAddress)
        )
    }

    provideLiquidityStake(
        ethValue: BigNumberish,
        wad: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish],
        campaignAddress: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.provideLiquidityStake(
                ethValue,
                this.addressList.GEB_COIN_JOIN,
                this.addressList.UNISWAP_ROUTER,
                campaignAddress,
                wad,
                minTokenAmounts
            )
        )
    }

    withdrawHarvestRemoveLiquidity(
        amount: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish],
        campaignAddress: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.withdrawHarvestRemoveLiquidity(
                campaignAddress,
                this.addressList.UNISWAP_ROUTER,
                this.addressList.GEB_COIN,
                amount,
                minTokenAmounts
            )
        )
    }

    migrateCampaign(
        oldCampaignAddress: string,
        newCampaignAddress: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.migrateCampaign(
                oldCampaignAddress,
                newCampaignAddress
            )
        )
    }

    // ==== Proxy Actions Leverage ====

    flashDeleverage(
        uniswapV2Pair: string,
        callbackProxy: string,
        collateralType: BytesLike,
        safe: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionLeverage.flashDeleverage(
                uniswapV2Pair,
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_COIN_JOIN,
                this.addressList.ETH,
                callbackProxy,
                collateralType,
                safe
            )
        )
    }

    flashDeleverageFreeETH(
        uniswapV2Pair: string,
        callbackProxy: string,
        collateralType: BytesLike,
        safe: BigNumberish,
        amountToFree: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionLeverage.flashDeleverageFreeETH(
                uniswapV2Pair,
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_COIN_JOIN,
                this.addressList.ETH,
                callbackProxy,
                collateralType,
                safe,
                amountToFree
            )
        )
    }

    flashLeverage(
        uniswapV2Pair: string,
        callbackProxy: string,
        collateralType: BytesLike,
        safe: BigNumberish,
        leverage: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionLeverage.flashLeverage(
                uniswapV2Pair,
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_COIN_JOIN,
                this.addressList.ETH,
                callbackProxy,
                collateralType,
                safe,
                leverage
            )
        )
    }

    lockETHLeverage(
        ethValue: BigNumberish,
        uniswapV2Pair: string,
        callbackProxy: string,
        collateralType: BytesLike,
        safe: BigNumberish,
        leverage: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionLeverage.lockETHLeverage(
                BigNumber.from(ethValue),
                uniswapV2Pair,
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_COIN_JOIN,
                this.addressList.ETH,
                callbackProxy,
                collateralType,
                safe,
                leverage
            )
        )
    }

    openLockETHLeverage(
        ethValue: BigNumberish,
        uniswapV2Pair: string,
        callbackProxy: string,
        collateralType: BytesLike,
        leverage: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionLeverage.openLockETHLeverage(
                BigNumber.from(ethValue),
                uniswapV2Pair,
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_COIN_JOIN,
                this.addressList.ETH,
                callbackProxy,
                collateralType,
                leverage
            )
        )
    }

    uniswapV2Call(
        _sender: string,
        _amount0: BigNumberish,
        _amount1: BigNumberish,
        _data: BytesLike
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionLeverage.uniswapV2Call(
                _sender,
                _amount0,
                _amount1,
                _data
            )
        )
    }

    // ==== Proxy Actions Debt Auctions ====

    debtAuctionStartAndDecreaseSoldAmount(
        amountToBuy: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionDebtAuction.startAndDecreaseSoldAmount(
                this.addressList.GEB_COIN_JOIN,
                this.addressList.GEB_ACCOUNTING_ENGINE,
                amountToBuy
            )
        )
    }

    debtAuctionDecreaseSoldAmount(
        amountToBuy: BigNumberish,
        auctionId: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionDebtAuction.decreaseSoldAmount(
                this.addressList.GEB_COIN_JOIN,
                this.addressList.GEB_DEBT_AUCTION_HOUSE,
                auctionId,
                amountToBuy
            )
        )
    }

    debtAuctionSettleAuction(auctionId: BigNumberish): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionDebtAuction.settleAuction(
                this.addressList.GEB_COIN_JOIN,
                this.addressList.GEB_DEBT_AUCTION_HOUSE,
                auctionId
            )
        )
    }

    exitAllCoin(): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionDebtAuction.exitAllCoin(
                this.addressList.GEB_COIN_JOIN
            )
        )
    }

    exitCoin(amount: BigNumberish): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionDebtAuction.exitCoin(
                this.addressList.GEB_COIN_JOIN,
                amount
            )
        )
    }

    // ==== Proxy Actions Surplus Auctions ====

    surplusStartAndIncreaseBidSize(bidSize: BigNumberish): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionSurplusAuction.startAndIncreaseBidSize(
                this.addressList.GEB_ACCOUNTING_ENGINE,
                bidSize
            )
        )
    }

    surplusIncreaseBidSize(
        bidSize: BigNumberish,
        auctionId: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionSurplusAuction.increaseBidSize(
                this.addressList.GEB_SURPLUS_AUCTION_HOUSE,
                auctionId,
                bidSize
            )
        )
    }

    surplusSettleAuction(auctionId: BigNumberish): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionSurplusAuction.settleAuction(
                this.addressList.GEB_COIN_JOIN,
                this.addressList.GEB_SURPLUS_AUCTION_HOUSE,
                auctionId
            )
        )
    }

    // ==== Proxy Actions Saviour ====

    transferTokensToCaller(tokens: string[]): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.transferTokensToCaller(tokens)
        )
    }

    protectSAFE(saviour: string, safe: BigNumberish): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.protectSAFE(
                saviour,
                this.addressList.SAFE_MANAGER,
                safe,
                this.addressList.GEB_LIQUIDATION_ENGINE
            )
        )
    }

    setDesiredCollateralizationRatio(
        collateralType: string,
        safe: BigNumberish,
        cRatio: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.setDesiredCollateralizationRatio(
                this.addressList.GEB_SAVIOUR_CRATIO_SETTER,
                collateralType,
                safe,
                cRatio
            )
        )
    }
    deposit(
        collateralSpecific: boolean,
        saviour: string,
        token: string,
        safe: BigNumberish,
        tokenAmount: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.deposit(
                collateralSpecific,
                saviour,
                this.addressList.SAFE_MANAGER,
                token,
                safe,
                tokenAmount
            )
        )
    }
    setDesiredCRatioDeposit(
        collateralSpecific: boolean,
        saviour: string,
        token: string,
        safe: BigNumberish,
        tokenAmount: BigNumberish,
        cRatio: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.setDesiredCRatioDeposit(
                collateralSpecific,
                saviour,
                this.addressList.GEB_SAVIOUR_CRATIO_SETTER,
                this.addressList.SAFE_MANAGER,
                token,
                safe,
                tokenAmount,
                cRatio
            )
        )
    }
    withdraw(
        collateralSpecific: boolean,
        saviour: string,
        safe: BigNumberish,
        tokenAmount: BigNumberish,
        dst: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.withdraw(
                collateralSpecific,
                saviour,
                this.addressList.SAFE_MANAGER,
                safe,
                tokenAmount,
                dst
            )
        )
    }
    setDesiredCRatioWithdraw(
        collateralSpecific: boolean,
        saviour: string,
        safe: BigNumberish,
        tokenAmount: BigNumberish,
        cRatio: BigNumberish,
        dst: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.setDesiredCRatioWithdraw(
                collateralSpecific,
                saviour,
                this.addressList.GEB_SAVIOUR_CRATIO_SETTER,
                this.addressList.SAFE_MANAGER,
                safe,
                tokenAmount,
                cRatio,
                dst
            )
        )
    }
    protectSAFEDeposit(
        collateralSpecific: boolean,
        saviour: string,
        token: string,
        safe: BigNumberish,
        tokenAmount: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.protectSAFEDeposit(
                collateralSpecific,
                saviour,
                this.addressList.SAFE_MANAGER,
                token,
                this.addressList.GEB_LIQUIDATION_ENGINE,
                safe,
                tokenAmount
            )
        )
    }
    protectSAFESetDesiredCRatioDeposit(
        collateralSpecific: boolean,
        saviour: string,
        token: string,
        safe: BigNumberish,
        tokenAmount: BigNumberish,
        cRatio: BigNumberish
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.protectSAFESetDesiredCRatioDeposit(
                collateralSpecific,
                saviour,
                this.addressList.GEB_SAVIOUR_CRATIO_SETTER,
                this.addressList.SAFE_MANAGER,
                token,
                this.addressList.GEB_LIQUIDATION_ENGINE,
                safe,
                tokenAmount,
                cRatio
            )
        )
    }
    withdrawUncoverSAFE(
        collateralSpecific: boolean,
        saviour: string,
        token: string,
        safe: BigNumberish,
        tokenAmount: BigNumberish,
        dst: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.withdrawUncoverSAFE(
                collateralSpecific,
                saviour,
                this.addressList.SAFE_MANAGER,
                token,
                this.addressList.GEB_LIQUIDATION_ENGINE,
                safe,
                tokenAmount,
                dst
            )
        )
    }
    withdrawProtectSAFEDeposit(
        withdrawCollateralSpecific: boolean,
        depositCollateralSpecific: boolean,
        withdrawSaviour: string,
        depositSaviour: string,
        depositToken: string,
        safe: BigNumberish,
        withdrawTokenAmount: BigNumberish,
        depositTokenAmount: BigNumberish,
        withdrawDst: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.withdrawProtectSAFEDeposit(
                withdrawCollateralSpecific,
                depositCollateralSpecific,
                withdrawSaviour,
                depositSaviour,
                this.addressList.SAFE_MANAGER,
                depositToken,
                this.addressList.GEB_LIQUIDATION_ENGINE,
                safe,
                withdrawTokenAmount,
                depositTokenAmount,
                withdrawDst
            )
        )
    }
    getReserves(
        saviour: string,
        safe: BigNumberish,
        dst: string
    ): TransactionRequest {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.getReserves(saviour, safe, dst)
        )
    }
}
