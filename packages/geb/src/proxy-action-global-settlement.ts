import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import { BytesLike } from '@ethersproject/bytes'
import {
    AbiDefinition,
    ContractList,
    GebDeployment,
    GebProviderInterface,
    getAddressList,
    Inputs,
    TransactionRequest,
} from '@reflexer-finance/geb-contract-base'
import {
    DsProxy,
    GebProxyActionsGlobalSettlement as GebProxyActionsGlobalSettlementGenerated,
} from '@reflexer-finance/geb-contract-api'

/**
 * Convenience class to call functions from the Proxy Action Global Settlement contract through a proxy registered in the proxy registry. It is used the same way as the `ProxyAction` class.
 * Useful only during global settlement (System shutdown) for users to retrieve their collateral.
 */
export class GebProxyActionsGlobalSettlement extends GebProxyActionsGlobalSettlementGenerated {
    /**
     * Underlying proxy object. Can be use to make custom calls to the proxy using `proxy.execute()` function.
     * For the details of each function
     */
    public proxy: DsProxy

    /**
     * Address of the proxy action global settlement contract.
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

        return this.proxy.execute(ethValue, this.proxyActionAddress, data)
    }

    coinJoin_join(
        apt: string,
        safeHandler: string,
        wad: BigNumberish
    ): TransactionRequest {
        // prettier-ignore
        // @ts-ignore

        return super.coinJoin_join(apt, safeHandler, wad)
    }

    freeETH(
        ethJoin: string,
        globalSettlement: string,
        safe: BigNumberish
    ): TransactionRequest {
        // prettier-ignore
        // @ts-ignore

        return super.freeETH(
            this.addressList.SAFE_MANAGER,
            ethJoin,
            globalSettlement,
            safe,
        )
    }

    freeTokenCollateral(
        collateralJoin: string,
        safe: BigNumberish
    ): TransactionRequest {
        // prettier-ignore
        // @ts-ignore

        return super.freeTokenCollateral(
            this.addressList.SAFE_MANAGER,
            collateralJoin,
            this.addressList.GEB_GLOBAL_SETTLEMENT,
            safe,
        )
    }

    prepareCoinsForRedeeming(wad: BigNumberish): TransactionRequest {
        // prettier-ignore
        // @ts-ignore

        return super.prepareCoinsForRedeeming(
            this.addressList.GEB_COIN_JOIN,
            this.addressList.GEB_GLOBAL_SETTLEMENT,
            wad,
        )
    }

    redeemETH(
        ethJoin: string,
        collateralType: BytesLike,
        wad: BigNumberish
    ): TransactionRequest {
        // prettier-ignore
        // @ts-ignore

        return super.redeemETH(
            ethJoin,
            this.addressList.GEB_GLOBAL_SETTLEMENT,
            collateralType,
            wad,
        )
    }

    redeemTokenCollateral(
        collateralJoin: string,
        collateralType: BytesLike,
        wad: BigNumberish
    ): TransactionRequest {
        // prettier-ignore
        // @ts-ignore

        return super.redeemTokenCollateral(
            collateralJoin,
            this.addressList.GEB_GLOBAL_SETTLEMENT,
            collateralType,
            wad,
        )
    }
}
