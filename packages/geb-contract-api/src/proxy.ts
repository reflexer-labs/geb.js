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
import { BigNumber } from '@ethersproject/bignumber'

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
        params: Inputs,
        ethValue?: BigNumber
    ): Promise<TransactionRequest> {
        let { data } = await this.chainProvider.ethSend(
            this.proxyActionAddress,
            abiFragment,
            params,
            ethValue
        )

        return this.proxy.execute(ethValue, this.proxyActionAddress, data)
    }
}

// declare type ret = <T>(...args: T[]) => Promise<TransactionRequest>

// const a: <T extends ret>(calls: T[]) => Promise<TransactionRequest[]> = {
//     return [{}]
// }
