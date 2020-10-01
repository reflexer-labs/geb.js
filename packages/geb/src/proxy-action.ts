import {
    GebProviderInterface,
    AbiDefinition,
    Inputs,
    ContractList,
    GebDeployment,
    getAddressList,
} from '@reflexer-finance/geb-contract-base'
import { TransactionRequest } from '@reflexer-finance/geb-contract-base'
import { BytesLike } from '@ethersproject/bytes'
import { BigNumberish } from '@ethersproject/bignumber'
import { BigNumber } from '@ethersproject/bignumber'

import {
    GebProxyActions as GebProxyActionsGenerated,
    DsProxy,
} from '@reflexer-finance/geb-contract-api'

/**
 * Convenience class to call functions from [GebProxyActions](https://github.com/reflexer-labs/geb-proxy-actions/blob/master/src/GebProxyActions.sol) through a proxy contract registered in the [GebProxyRegistry](https://github.com/reflexer-labs/geb-proxy-registry/blob/master/src/GebProxyRegistry.sol). These actions bundle multiple actions in one (e.g: open a safe + lock some ETH + draw some RAI).
 */
export class GebProxyActions extends GebProxyActionsGenerated {
    /**
     * Underlying proxy object. Can be use to make custom calls to the proxy using `proxy.execute()` function.
     * For the details of each function
     */
    public proxy: DsProxy

    /**
     * Address of the proxy action contract.
     */
    public proxyActionAddress: string
    private addressList: ContractList

    constructor(
        /**
         * Address of the underlying proxy
         */
        public proxyAddress: string,
        network: GebDeployment,
        chainProvider: GebProviderInterface
    ) {
        super(getAddressList(network).PROXY_ACTIONS, chainProvider)
        this.addressList = getAddressList(network)
        this.proxy = new DsProxy(proxyAddress, this.chainProvider)
        this.proxyActionAddress = this.addressList.PROXY_ACTIONS
        this.address = proxyAddress
    }

    // Override getTransactionRequest to use proxy
    protected getTransactionRequest(
        abiFragment: AbiDefinition,
        params: Inputs,
        ethValue?: BigNumber
    ): TransactionRequest {
        let data = this.chainProvider.encodeFunctionData(params, abiFragment)

        if (!ethValue) {
            ethValue = BigNumber.from('0')
        }

        return this.proxy.execute1(ethValue, this.proxyActionAddress, data)
    }

    allowHandler(usr: string, ok: BigNumberish): TransactionRequest {
        // prettier-ignore

        return super.allowHandler(this.addressList.SAFE_MANAGER, usr, ok)
    }

    allowSAFE(
        safe: BigNumberish,
        usr: string,
        ok: BigNumberish
    ): TransactionRequest {
        // prettier-ignore

        return super.allowSAFE(this.addressList.SAFE_MANAGER, safe, usr, ok)
    }

    approveSAFEModification(obj: string, usr: string): TransactionRequest {
        // prettier-ignore

        return super.approveSAFEModification(obj, usr)
    }

    coinJoin_join(
        apt: string,
        safeHandler: string,
        wad: BigNumberish
    ): TransactionRequest {
        // prettier-ignore

        return super.coinJoin_join(apt, safeHandler, wad)
    }

    denySAFEModification(obj: string, usr: string): TransactionRequest {
        // prettier-ignore

        return super.denySAFEModification(obj, usr)
    }

    enterSystem(src: string, safe: BigNumberish): TransactionRequest {
        // prettier-ignore

        return super.enterSystem(this.addressList.SAFE_MANAGER, src, safe)
    }

    ethJoin_join(
        ethValue: BigNumberish,
        apt: string,
        safe: string
    ): TransactionRequest {
        // prettier-ignore

        return super.ethJoin_join(BigNumber.from(ethValue), apt, safe)
    }

    exitETH(safe: BigNumberish, wad: BigNumberish): TransactionRequest {
        // prettier-ignore

        return super.exitETH(this.addressList.SAFE_MANAGER, this.addressList.GEB_JOIN_ETH_A, safe, wad)
    }

    exitTokenCollateral(
        collateralJoin: string,
        safe: BigNumberish,
        amt: BigNumberish
    ): TransactionRequest {
        // prettier-ignore

        return super.exitTokenCollateral(this.addressList.SAFE_MANAGER, collateralJoin, safe, amt)
    }

    freeETH(safe: BigNumberish, wad: BigNumberish): TransactionRequest {
        // prettier-ignore

        return super.freeETH(this.addressList.SAFE_MANAGER, this.addressList.GEB_JOIN_ETH_A, safe, wad)
    }

    freeTokenCollateral(
        collateralJoin: string,
        safe: BigNumberish,
        amt: BigNumberish
    ): TransactionRequest {
        // prettier-ignore

        return super.freeTokenCollateral(this.addressList.SAFE_MANAGER, collateralJoin, safe, amt)
    }

    generateDebt(safe: BigNumberish, wad: BigNumberish): TransactionRequest {
        // prettier-ignore

        return super.generateDebt(this.addressList.SAFE_MANAGER, this.addressList.GEB_TAX_COLLECTOR, this.addressList.GEB_COIN_JOIN, safe, wad)
    }

    generateDebtAndProtectSAFE(
        safe: BigNumberish,
        wad: BigNumberish,
        saviour: string
    ): TransactionRequest {
        // prettier-ignore

        return super.generateDebtAndProtectSAFE(this.addressList.SAFE_MANAGER, this.addressList.GEB_TAX_COLLECTOR, this.addressList.GEB_COIN_JOIN, safe, wad, this.addressList.GEB_LIQUIDATION_ENGINE, saviour)
    }

    lockETH(ethValue: BigNumberish, safe: BigNumberish): TransactionRequest {
        // prettier-ignore

        return super.lockETH(BigNumber.from(ethValue), this.addressList.SAFE_MANAGER, this.addressList.GEB_JOIN_ETH_A, safe)
    }

    lockETHAndGenerateDebt(
        ethValue: BigNumberish,
        safe: BigNumberish,
        deltaWad: BigNumberish
    ): TransactionRequest {
        // prettier-ignore

        return super.lockETHAndGenerateDebt(BigNumber.from(ethValue), this.addressList.SAFE_MANAGER, this.addressList.GEB_TAX_COLLECTOR, this.addressList.GEB_JOIN_ETH_A, this.addressList.GEB_COIN_JOIN, safe, deltaWad)
    }
    // // @ts-ignore
    // lockTokenCollateral(
    //     collateralJoin: string,
    //     safe: BigNumberish,
    //     amt: BigNumberish,
    //     transferFrom: boolean
    // ): TransactionRequest {
    //     // prettier-ignore

    //     return super.lockTokenCollateral(this.addressList.SAFE_MANAGER, collateralJoin, safe, amt, transferFrom)
    // }
    // // @ts-ignore
    // lockTokenCollateralAndGenerateDebt(
    //     collateralJoin: string,
    //     safe: BigNumberish,
    //     collateralAmount: BigNumberish,
    //     deltaWad: BigNumberish,
    //     transferFrom: boolean
    // ): TransactionRequest {
    //     // prettier-ignore

    //     return super.lockTokenCollateralAndGenerateDebt(this.addressList.SAFE_MANAGER, this.addressList.GEB_TAX_COLLECTOR, collateralJoin, this.addressList.GEB_COIN_JOIN, safe, collateralAmount, deltaWad, transferFrom)
    // }
    // // @ts-ignore
    // lockTokenCollateralGenerateDebtAndProtectSAFE(
    //     collateralJoin: string,
    //     safe: BigNumberish,
    //     collateralAmount: BigNumberish,
    //     deltaWad: BigNumberish,
    //     transferFrom: boolean,
    //     saviour: string
    // ): TransactionRequest {
    //     // prettier-ignore

    //     return super.lockTokenCollateralGenerateDebtAndProtectSAFE(this.addressList.SAFE_MANAGER, this.addressList.GEB_TAX_COLLECTOR, collateralJoin, this.addressList.GEB_COIN_JOIN, safe, collateralAmount, deltaWad, transferFrom, this.addressList.GEB_LIQUIDATION_ENGINE, saviour)
    // }

    makeCollateralBag(collateralJoin: string): TransactionRequest {
        // prettier-ignore

        return super.makeCollateralBag(collateralJoin)
    }

    modifySAFECollateralization(
        safe: BigNumberish,
        deltaCollateral: BigNumberish,
        deltaDebt: BigNumberish
    ): TransactionRequest {
        // prettier-ignore

        return super.modifySAFECollateralization(this.addressList.SAFE_MANAGER, safe, deltaCollateral, deltaDebt)
    }

    moveSAFE(safeSrc: BigNumberish, safeDst: BigNumberish): TransactionRequest {
        // prettier-ignore

        return super.moveSAFE(this.addressList.SAFE_MANAGER, safeSrc, safeDst)
    }

    openLockETHAndGenerateDebt(
        ethValue: BigNumberish,
        collateralType: BytesLike,
        deltaWad: BigNumberish
    ): TransactionRequest {
        // prettier-ignore

        return super.openLockETHAndGenerateDebt(BigNumber.from(ethValue), this.addressList.SAFE_MANAGER, this.addressList.GEB_TAX_COLLECTOR, this.addressList.GEB_JOIN_ETH_A, this.addressList.GEB_COIN_JOIN, collateralType, deltaWad)
    }

    openLockETHGenerateDebtAndProtectSAFE(
        ethValue: BigNumberish,
        collateralType: BytesLike,
        deltaWad: BigNumberish,
        saviour: string
    ): TransactionRequest {
        // prettier-ignore

        return super.openLockETHGenerateDebtAndProtectSAFE(BigNumber.from(ethValue), this.addressList.SAFE_MANAGER, this.addressList.GEB_TAX_COLLECTOR, this.addressList.GEB_JOIN_ETH_A, this.addressList.GEB_COIN_JOIN, collateralType, deltaWad, this.addressList.GEB_LIQUIDATION_ENGINE, saviour)
    }

    openLockGNTAndGenerateDebt(
        gntJoin: string,
        collateralType: BytesLike,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish
    ): TransactionRequest {
        // prettier-ignore

        return super.openLockGNTAndGenerateDebt(this.addressList.SAFE_MANAGER, this.addressList.GEB_TAX_COLLECTOR, gntJoin, this.addressList.GEB_COIN_JOIN, collateralType, collateralAmount, deltaWad)
    }

    openLockGNTGenerateDebtAndProtectSAFE(
        gntJoin: string,
        collateralType: BytesLike,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish,
        saviour: string
    ): TransactionRequest {
        // prettier-ignore

        return super.openLockGNTGenerateDebtAndProtectSAFE(this.addressList.SAFE_MANAGER, this.addressList.GEB_TAX_COLLECTOR, gntJoin, this.addressList.GEB_COIN_JOIN, collateralType, collateralAmount, deltaWad, this.addressList.GEB_LIQUIDATION_ENGINE, saviour)
    }
    // // @ts-ignore
    // openLockTokenCollateralAndGenerateDebt(
    //     collateralJoin: string,
    //     collateralType: BytesLike,
    //     collateralAmount: BigNumberish,
    //     deltaWad: BigNumberish,
    //     transferFrom: boolean
    // ): TransactionRequest {
    //     // prettier-ignore

    //     return super.openLockTokenCollateralAndGenerateDebt(this.addressList.SAFE_MANAGER, this.addressList.GEB_TAX_COLLECTOR, collateralJoin, this.addressList.GEB_COIN_JOIN, collateralType, collateralAmount, deltaWad, transferFrom)
    // }
    // // @ts-ignore
    // openLockTokenCollateralGenerateDebtAndProtectSAFE(
    //     collateralJoin: string,
    //     collateralType: BytesLike,
    //     collateralAmount: BigNumberish,
    //     deltaWad: BigNumberish,
    //     transferFrom: boolean,
    //     saviour: string
    // ): TransactionRequest {
    //     // prettier-ignore

    //     return super.openLockTokenCollateralGenerateDebtAndProtectSAFE(this.addressList.SAFE_MANAGER, this.addressList.GEB_TAX_COLLECTOR, collateralJoin, this.addressList.GEB_COIN_JOIN, collateralType, collateralAmount, deltaWad, transferFrom, this.addressList.GEB_LIQUIDATION_ENGINE, saviour)
    // }

    openSAFE(collateralType: BytesLike, usr: string): TransactionRequest {
        // prettier-ignore

        return super.openSAFE(this.addressList.SAFE_MANAGER, collateralType, usr)
    }

    protectSAFE(safe: BigNumberish, saviour: string): TransactionRequest {
        // prettier-ignore

        return super.protectSAFE(this.addressList.SAFE_MANAGER, safe, this.addressList.GEB_LIQUIDATION_ENGINE, saviour)
    }

    quitSystem(safe: BigNumberish, dst: string): TransactionRequest {
        // prettier-ignore

        return super.quitSystem(this.addressList.SAFE_MANAGER, safe, dst)
    }

    repayAllDebt(safe: BigNumberish): TransactionRequest {
        // prettier-ignore

        return super.repayAllDebt(this.addressList.SAFE_MANAGER, this.addressList.GEB_COIN_JOIN, safe)
    }

    repayAllDebtAndFreeETH(
        safe: BigNumberish,
        collateralWad: BigNumberish
    ): TransactionRequest {
        // prettier-ignore

        return super.repayAllDebtAndFreeETH(this.addressList.SAFE_MANAGER, this.addressList.GEB_JOIN_ETH_A, this.addressList.GEB_COIN_JOIN, safe, collateralWad)
    }

    repayAllDebtAndFreeTokenCollateral(
        collateralJoin: string,
        safe: BigNumberish,
        collateralAmount: BigNumberish
    ): TransactionRequest {
        // prettier-ignore

        return super.repayAllDebtAndFreeTokenCollateral(this.addressList.SAFE_MANAGER, collateralJoin, this.addressList.GEB_COIN_JOIN, safe, collateralAmount)
    }

    repayDebt(safe: BigNumberish, wad: BigNumberish): TransactionRequest {
        // prettier-ignore

        return super.repayDebt(this.addressList.SAFE_MANAGER, this.addressList.GEB_COIN_JOIN, safe, wad)
    }

    repayDebtAndFreeETH(
        safe: BigNumberish,
        collateralWad: BigNumberish,
        deltaWad: BigNumberish
    ): TransactionRequest {
        // prettier-ignore

        return super.repayDebtAndFreeETH(this.addressList.SAFE_MANAGER, this.addressList.GEB_JOIN_ETH_A, this.addressList.GEB_COIN_JOIN, safe, collateralWad, deltaWad)
    }

    repayDebtAndFreeTokenCollateral(
        collateralJoin: string,
        safe: BigNumberish,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish
    ): TransactionRequest {
        // prettier-ignore

        return super.repayDebtAndFreeTokenCollateral(this.addressList.SAFE_MANAGER, collateralJoin, this.addressList.GEB_COIN_JOIN, safe, collateralAmount, deltaWad)
    }

    safeLockETH(
        ethValue: BigNumberish,
        safe: BigNumberish,
        owner: string
    ): TransactionRequest {
        // prettier-ignore

        return super.safeLockETH(BigNumber.from(ethValue), this.addressList.SAFE_MANAGER, this.addressList.GEB_JOIN_ETH_A, safe, owner)
    }
    // // @ts-ignore
    // safeLockTokenCollateral(
    //     collateralJoin: string,
    //     safe: BigNumberish,
    //     amt: BigNumberish,
    //     transferFrom: boolean,
    //     owner: string
    // ): TransactionRequest {
    //     // prettier-ignore

    //     return super.safeLockTokenCollateral(this.addressList.SAFE_MANAGER, collateralJoin, safe, amt, transferFrom, owner)
    // }

    safeRepayAllDebt(safe: BigNumberish, owner: string): TransactionRequest {
        // prettier-ignore

        return super.safeRepayAllDebt(this.addressList.SAFE_MANAGER, this.addressList.GEB_COIN_JOIN, safe, owner)
    }

    safeRepayDebt(
        safe: BigNumberish,
        wad: BigNumberish,
        owner: string
    ): TransactionRequest {
        // prettier-ignore

        return super.safeRepayDebt(this.addressList.SAFE_MANAGER, this.addressList.GEB_COIN_JOIN, safe, wad, owner)
    }

    tokenCollateralJoin_join(
        apt: string,
        safe: string,
        amt: BigNumberish,
        transferFrom: boolean
    ): TransactionRequest {
        // prettier-ignore

        return super.tokenCollateralJoin_join(apt, safe, amt, transferFrom)
    }

    transfer(
        collateral: string,
        dst: string,
        amt: BigNumberish
    ): TransactionRequest {
        // prettier-ignore

        return super.transfer(collateral, dst, amt)
    }

    transferCollateral(
        safe: BigNumberish,
        dst: string,
        wad: BigNumberish
    ): TransactionRequest {
        // prettier-ignore

        return super.transferCollateral(this.addressList.SAFE_MANAGER, safe, dst, wad)
    }

    transferInternalCoins(
        safe: BigNumberish,
        dst: string,
        rad: BigNumberish
    ): TransactionRequest {
        // prettier-ignore

        return super.transferInternalCoins(this.addressList.SAFE_MANAGER, safe, dst, rad)
    }

    transferSAFEOwnership(safe: BigNumberish, usr: string): TransactionRequest {
        // prettier-ignore

        return super.transferSAFEOwnership(this.addressList.SAFE_MANAGER, safe, usr)
    }

    transferSAFEOwnershipToProxy(
        safe: BigNumberish,
        dst: string
    ): TransactionRequest {
        // prettier-ignore

        return super.transferSAFEOwnershipToProxy(this.addressList.PROXY_REGISTRY, this.addressList.SAFE_MANAGER, safe, dst)
    }
}
