import { DsProxy } from '.'
import {
    ChainProviderInterface,
    AbiDefinition,
    Inputs,
    TransactionRequest,
} from '@reflexer-finance/geb-provider'
import { GebProxyActions as GebProxyActionsGenerated } from './generated/GebProxyActions'
import { GebProxyActionsGlobalSettlement as GebProxyActionsGlobalSettlementGenerated } from './generated/GebProxyActionsGlobalSettlement'

// Helper class that abstract away the proxy
export class GebProxyActions extends GebProxyActionsGenerated {
    public proxy: DsProxy
    constructor(
        public proxyAddress: string,
        public proxyActionAddress: string,
        chainProvider: ChainProviderInterface
    ) {
        super(proxyActionAddress, chainProvider)
        this.proxy = new DsProxy(proxyAddress, this.chainProvider)
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
    constructor(address: string, chainProvider: ChainProviderInterface) {
        super(address, chainProvider)
        this.proxy = new DsProxy(this.address, this.chainProvider)
    }

    // Override ETH send to use proxy
    async ethSend(
        abiFragment: AbiDefinition,
        params: Inputs
    ): Promise<TransactionRequest> {
        let { to, data } = await this.chainProvider.ethSend(
            this.address,
            abiFragment,
            params
        )
        return this.proxy.execute(to, data)
    }
}
