import {
    GebProviderInterface,
    AbiDefinition,
    Inputs,
} from '@reflexer-finance/geb-provider'
import { TransactionRequest } from '@reflexer-finance/geb-provider'
import { BytesLike } from '@ethersproject/bytes'
import { BigNumberish } from '@ethersproject/bignumber'
import { BigNumber } from '@ethersproject/bignumber'

import {
    GebProxyActions as GebProxyActionsGenerated,
    DsProxy,
    ContractAddresses,
    ContractList,
} from '@reflexer-finance/geb-contract-api'
import { getAddressList } from './utils'

export class GebProxyActions extends GebProxyActionsGenerated {
    public proxy: DsProxy
    public proxyActionAddress: string
    private addressList: ContractList

    constructor(
        public proxyAddress: string,
        network: ContractAddresses,
        chainProvider: GebProviderInterface
    ) {
        super(getAddressList(network).PROXY_ACTIONS, chainProvider)
        this.addressList = getAddressList(network)
        this.proxy = new DsProxy(proxyAddress, this.chainProvider)
        this.proxyActionAddress = this.addressList.PROXY_ACTIONS
        this.address = proxyAddress
    }

    // Override ETH send to use proxy
    async ethSend(
        abiFragment: AbiDefinition,
        params: Inputs,
        ethValue?: BigNumber
    ): Promise<TransactionRequest> {
        let { data } = await this.chainProvider.ethSend(
            this.proxyActionAddress,
            abiFragment,
            params,
            ethValue
        )

        if (!ethValue) {
            ethValue = BigNumber.from('0')
        }

        return this.proxy.execute(ethValue, this.proxyActionAddress, data)
    }

    async ethCall(abiFragment: AbiDefinition, params: Inputs): Promise<any> {
        return this.chainProvider.ethCall(
            this.proxyActionAddress,
            abiFragment,
            params
        )
    }

    allowHandler(usr: string, ok: BigNumberish): Promise<TransactionRequest> {
        // prettier-ignore

        return super.allowHandler(this.addressList.SAFE_MANAGER, usr, ok)
    }

    allowSAFE(
        safe: BigNumberish,
        usr: string,
        ok: BigNumberish
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.allowSAFE(this.addressList.SAFE_MANAGER, safe, usr, ok)
    }

    approveSAFEModification(
        obj: string,
        usr: string
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.approveSAFEModification(obj, usr)
    }

    coinJoin_join(
        apt: string,
        safeHandler: string,
        wad: BigNumberish
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.coinJoin_join(apt, safeHandler, wad)
    }

    denySAFEModification(
        obj: string,
        usr: string
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.denySAFEModification(obj, usr)
    }

    enterSystem(src: string, safe: BigNumberish): Promise<TransactionRequest> {
        // prettier-ignore

        return super.enterSystem(this.addressList.SAFE_MANAGER, src, safe)
    }

    ethJoin_join(
        ethValue: BigNumberish,
        apt: string,
        safe: string
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.ethJoin_join(BigNumber.from(ethValue), apt, safe)
    }

    exitETH(
        safe: BigNumberish,
        wad: BigNumberish
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.exitETH(this.addressList.SAFE_MANAGER, this.addressList.GEB_JOIN_ETH_A, safe, wad)
    }

    exitTokenCollateral(
        collateralJoin: string,
        safe: BigNumberish,
        amt: BigNumberish
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.exitTokenCollateral(this.addressList.SAFE_MANAGER, collateralJoin, safe, amt)
    }

    freeETH(
        safe: BigNumberish,
        wad: BigNumberish
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.freeETH(this.addressList.SAFE_MANAGER, this.addressList.GEB_JOIN_ETH_A, safe, wad)
    }

    freeTokenCollateral(
        collateralJoin: string,
        safe: BigNumberish,
        amt: BigNumberish
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.freeTokenCollateral(this.addressList.SAFE_MANAGER, collateralJoin, safe, amt)
    }

    generateDebt(
        safe: BigNumberish,
        wad: BigNumberish
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.generateDebt(this.addressList.SAFE_MANAGER, this.addressList.GEB_TAX_COLLECTOR, this.addressList.GEB_COIN_JOIN, safe, wad)
    }

    generateDebtAndProtectSAFE(
        safe: BigNumberish,
        wad: BigNumberish,
        saviour: string
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.generateDebtAndProtectSAFE(this.addressList.SAFE_MANAGER, this.addressList.GEB_TAX_COLLECTOR, this.addressList.GEB_COIN_JOIN, safe, wad, this.addressList.GEB_LIQUIDATION_ENGINE, saviour)
    }

    lockETH(
        ethValue: BigNumberish,
        safe: BigNumberish
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.lockETH(BigNumber.from(ethValue), this.addressList.SAFE_MANAGER, this.addressList.GEB_JOIN_ETH_A, safe)
    }

    lockETHAndGenerateDebt(
        ethValue: BigNumberish,
        safe: BigNumberish,
        deltaWad: BigNumberish
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.lockETHAndGenerateDebt(BigNumber.from(ethValue), this.addressList.SAFE_MANAGER, this.addressList.GEB_TAX_COLLECTOR, this.addressList.GEB_JOIN_ETH_A, this.addressList.GEB_COIN_JOIN, safe, deltaWad)
    }
    // // @ts-ignore
    // lockTokenCollateral(
    //     collateralJoin: string,
    //     safe: BigNumberish,
    //     amt: BigNumberish,
    //     transferFrom: boolean
    // ): Promise<TransactionRequest> {
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
    // ): Promise<TransactionRequest> {
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
    // ): Promise<TransactionRequest> {
    //     // prettier-ignore

    //     return super.lockTokenCollateralGenerateDebtAndProtectSAFE(this.addressList.SAFE_MANAGER, this.addressList.GEB_TAX_COLLECTOR, collateralJoin, this.addressList.GEB_COIN_JOIN, safe, collateralAmount, deltaWad, transferFrom, this.addressList.GEB_LIQUIDATION_ENGINE, saviour)
    // }

    makeCollateralBag(collateralJoin: string): Promise<TransactionRequest> {
        // prettier-ignore

        return super.makeCollateralBag(collateralJoin)
    }

    modifySAFECollateralization(
        safe: BigNumberish,
        deltaCollateral: BigNumberish,
        deltaDebt: BigNumberish
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.modifySAFECollateralization(this.addressList.SAFE_MANAGER, safe, deltaCollateral, deltaDebt)
    }

    moveSAFE(
        safeSrc: BigNumberish,
        safeDst: BigNumberish
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.moveSAFE(this.addressList.SAFE_MANAGER, safeSrc, safeDst)
    }

    openLockETHAndGenerateDebt(
        ethValue: BigNumberish,
        collateralType: BytesLike,
        deltaWad: BigNumberish
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.openLockETHAndGenerateDebt(BigNumber.from(ethValue), this.addressList.SAFE_MANAGER, this.addressList.GEB_TAX_COLLECTOR, this.addressList.GEB_JOIN_ETH_A, this.addressList.GEB_COIN_JOIN, collateralType, deltaWad)
    }

    openLockETHGenerateDebtAndProtectSAFE(
        ethValue: BigNumberish,
        collateralType: BytesLike,
        deltaWad: BigNumberish,
        saviour: string
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.openLockETHGenerateDebtAndProtectSAFE(BigNumber.from(ethValue), this.addressList.SAFE_MANAGER, this.addressList.GEB_TAX_COLLECTOR, this.addressList.GEB_JOIN_ETH_A, this.addressList.GEB_COIN_JOIN, collateralType, deltaWad, this.addressList.GEB_LIQUIDATION_ENGINE, saviour)
    }

    openLockGNTAndGenerateDebt(
        gntJoin: string,
        collateralType: BytesLike,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.openLockGNTAndGenerateDebt(this.addressList.SAFE_MANAGER, this.addressList.GEB_TAX_COLLECTOR, gntJoin, this.addressList.GEB_COIN_JOIN, collateralType, collateralAmount, deltaWad)
    }

    openLockGNTGenerateDebtAndProtectSAFE(
        gntJoin: string,
        collateralType: BytesLike,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish,
        saviour: string
    ): Promise<TransactionRequest> {
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
    // ): Promise<TransactionRequest> {
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
    // ): Promise<TransactionRequest> {
    //     // prettier-ignore

    //     return super.openLockTokenCollateralGenerateDebtAndProtectSAFE(this.addressList.SAFE_MANAGER, this.addressList.GEB_TAX_COLLECTOR, collateralJoin, this.addressList.GEB_COIN_JOIN, collateralType, collateralAmount, deltaWad, transferFrom, this.addressList.GEB_LIQUIDATION_ENGINE, saviour)
    // }

    openSAFE(
        collateralType: BytesLike,
        usr: string
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.openSAFE(this.addressList.SAFE_MANAGER, collateralType, usr)
    }

    protectSAFE(
        safe: BigNumberish,
        saviour: string
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.protectSAFE(this.addressList.SAFE_MANAGER, safe, this.addressList.GEB_LIQUIDATION_ENGINE, saviour)
    }

    quitSystem(safe: BigNumberish, dst: string): Promise<TransactionRequest> {
        // prettier-ignore

        return super.quitSystem(this.addressList.SAFE_MANAGER, safe, dst)
    }

    repayAllDebt(safe: BigNumberish): Promise<TransactionRequest> {
        // prettier-ignore

        return super.repayAllDebt(this.addressList.SAFE_MANAGER, this.addressList.GEB_COIN_JOIN, safe)
    }

    repayAllDebtAndFreeETH(
        safe: BigNumberish,
        collateralWad: BigNumberish
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.repayAllDebtAndFreeETH(this.addressList.SAFE_MANAGER, this.addressList.GEB_JOIN_ETH_A, this.addressList.GEB_COIN_JOIN, safe, collateralWad)
    }

    repayAllDebtAndFreeTokenCollateral(
        collateralJoin: string,
        safe: BigNumberish,
        collateralAmount: BigNumberish
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.repayAllDebtAndFreeTokenCollateral(this.addressList.SAFE_MANAGER, collateralJoin, this.addressList.GEB_COIN_JOIN, safe, collateralAmount)
    }

    repayDebt(
        safe: BigNumberish,
        wad: BigNumberish
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.repayDebt(this.addressList.SAFE_MANAGER, this.addressList.GEB_COIN_JOIN, safe, wad)
    }

    repayDebtAndFreeETH(
        safe: BigNumberish,
        collateralWad: BigNumberish,
        deltaWad: BigNumberish
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.repayDebtAndFreeETH(this.addressList.SAFE_MANAGER, this.addressList.GEB_JOIN_ETH_A, this.addressList.GEB_COIN_JOIN, safe, collateralWad, deltaWad)
    }

    repayDebtAndFreeTokenCollateral(
        collateralJoin: string,
        safe: BigNumberish,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.repayDebtAndFreeTokenCollateral(this.addressList.SAFE_MANAGER, collateralJoin, this.addressList.GEB_COIN_JOIN, safe, collateralAmount, deltaWad)
    }

    safeLockETH(
        ethValue: BigNumberish,
        safe: BigNumberish,
        owner: string
    ): Promise<TransactionRequest> {
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
    // ): Promise<TransactionRequest> {
    //     // prettier-ignore

    //     return super.safeLockTokenCollateral(this.addressList.SAFE_MANAGER, collateralJoin, safe, amt, transferFrom, owner)
    // }

    safeRepayAllDebt(
        safe: BigNumberish,
        owner: string
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.safeRepayAllDebt(this.addressList.SAFE_MANAGER, this.addressList.GEB_COIN_JOIN, safe, owner)
    }

    safeRepayDebt(
        safe: BigNumberish,
        wad: BigNumberish,
        owner: string
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.safeRepayDebt(this.addressList.SAFE_MANAGER, this.addressList.GEB_COIN_JOIN, safe, wad, owner)
    }

    tokenCollateralJoin_join(
        apt: string,
        safe: string,
        amt: BigNumberish,
        transferFrom: boolean
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.tokenCollateralJoin_join(apt, safe, amt, transferFrom)
    }

    transfer(
        collateral: string,
        dst: string,
        amt: BigNumberish
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.transfer(collateral, dst, amt)
    }

    transferCollateral(
        safe: BigNumberish,
        dst: string,
        wad: BigNumberish
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.transferCollateral(this.addressList.SAFE_MANAGER, safe, dst, wad)
    }

    transferInternalCoins(
        safe: BigNumberish,
        dst: string,
        rad: BigNumberish
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.transferInternalCoins(this.addressList.SAFE_MANAGER, safe, dst, rad)
    }

    transferSAFEOwnership(
        safe: BigNumberish,
        usr: string
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.transferSAFEOwnership(this.addressList.SAFE_MANAGER, safe, usr)
    }

    transferSAFEOwnershipToProxy(
        safe: BigNumberish,
        dst: string
    ): Promise<TransactionRequest> {
        // prettier-ignore

        return super.transferSAFEOwnershipToProxy(this.addressList.PROXY_REGISTRY, this.addressList.SAFE_MANAGER, safe, dst)
    }
}
