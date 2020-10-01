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
 * Convenience class used to call functions from [GebProxyActionsGlobalSettlement](https://github.com/reflexer-labs/geb-proxy-actions/blob/master/src/GebProxyActions.sol) using a proxy registered in the [GebProxyRegistry](https://github.com/reflexer-labs/geb-proxy-registry/blob/master/src/GebProxyRegistry.sol).
 * Useful only during Global Settlement in order for users to redeem collateral.
 *
 * ## Examples
 *
 * Redeem some ETH collateral against some RAI using a proxy contract:
 * ```typescript
 * // The wallet needs to have a proxy already deployed
 * const globalSettlementProxy = await geb.getProxyActionGlobalSettlement(wallet.address)
 * // We need the address of the collateral adapter
 * const wethJoinAddress = geb.contracts.joinETH_A.address
 * // Prepare the transaction to redeem 10 RAI for Ether
 * const tx = globalSettlementProxy.redeemTokenCollateral(wethJoinAddress, ETH_A, WAD.mul(10))
 * // Send the transaction with a Ethers Wallet object
 * await wallet.sendTransaction(tx)
 * ```
 *
 * Redeem as much collateral as possible from a Safe managed by a proxy:
 * ```typescript
 * // The Safe has to be managed by a proxy for this to work
 * const globalSettlementProxy = await geb.getProxyActionGlobalSettlement(wallet.address)
 * // We need the address of the collateral adapter
 * const wethJoinAddress = geb.contracts.joinETH_A.address
 * // Extract the collateral from the Safe with ID 3
 * const tx = globalSettlementProxy.freeTokenCollateral(wethJoinAddress, 3)
 * // Send the transaction with a Ethers Wallet object
 * wallet.sendTransaction(tx)
 * ```
 *
 */
export class GebProxyActionsGlobalSettlement extends GebProxyActionsGlobalSettlementGenerated {
    /**
     * Underlying proxy object. Can be used to make custom calls to the proxy using `proxy.execute()` .
     * For the details of each function
     */
    public proxy: DsProxy

    /**
     * Address of the proxy actions global settlement contract.
     */
    public proxyActionAddress: string
    private addressList: ContractList

    constructor(
        /**
         * Address of the underlying proxy.
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
