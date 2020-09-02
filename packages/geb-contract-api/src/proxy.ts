import { DsProxy } from '.'
import { ChainProviderInterface } from '@reflexer-finance/geb-provider'

export class GebProxy extends DsProxy {
    constructor(address: string, chainProvider: ChainProviderInterface) {
        super(address, chainProvider)
    }
}
