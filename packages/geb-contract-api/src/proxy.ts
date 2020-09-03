import { DsProxy, ContractAddresses } from '.'
import {
    ChainProviderInterface,
    AbiDefinition,
    Inputs,
    TransactionRequest,
} from '@reflexer-finance/geb-provider'
import { GebProxyActions as GebProxyActionsGenerated } from './generated/GebProxyActions'
import { GebProxyActionsGlobalSettlement as GebProxyActionsGlobalSettlementGenerated } from './generated/GebProxyActionsGlobalSettlement'
import { getAddressList } from './utils'

// Helper class that abstract away the proxy
export class GebProxyActions extends GebProxyActionsGenerated {
    public proxy: DsProxy
    private proxyActionAddress: string
    constructor(
        public proxyAddress: string,
        network: ContractAddresses,
        chainProvider: ChainProviderInterface
    ) {
        super(getAddressList(network).PROXY_ACTIONS, chainProvider)
        this.proxy = new DsProxy(proxyAddress, this.chainProvider)
        this.proxyActionAddress = getAddressList(network).PROXY_ACTIONS
    }

    // Override ETH send to use proxy
    async ethSend(
        abiFragment: AbiDefinition,
        params: Inputs
    ): Promise<TransactionRequest> {
        let { data } = await this.chainProvider.ethSend(
            this.proxyActionAddress,
            abiFragment,
            params
        )

        return this.proxy.execute(this.proxyActionAddress, data)
    }
}

export class GebProxyActionsGlobalSettlement extends GebProxyActionsGlobalSettlementGenerated {
    public proxy: DsProxy
    private proxyActionAddress: string
    constructor(
        public proxyAddress: string,
        network: ContractAddresses,
        chainProvider: ChainProviderInterface
    ) {
        super(getAddressList(network).PROXY_ACTIONS, chainProvider)
        this.proxy = new DsProxy(proxyAddress, this.chainProvider)
        this.proxyActionAddress = getAddressList(network).PROXY_ACTIONS
    }

    // Override ETH send to use proxy
    async ethSend(
        abiFragment: AbiDefinition,
        params: Inputs
    ): Promise<TransactionRequest> {
        let { data } = await this.chainProvider.ethSend(
            this.proxyActionAddress,
            abiFragment,
            params
        )

        return this.proxy.execute(this.proxyActionAddress, data)
    }
}

// declare type ret = <T>(...args: T[]) => Promise<TransactionRequest>

// const a: <T extends ret>(calls: T[]) => Promise<TransactionRequest[]> = {
//     return [{}]
// }
