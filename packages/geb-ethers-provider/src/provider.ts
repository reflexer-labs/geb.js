import { ChainProviderInterface } from '@reflexer-finance/geb-provider'
import { PopulatedTransaction } from 'ethers'

export class EthersProvider
    implements ChainProviderInterface<PopulatedTransaction> {
    ethCall(name: string, params: any): any {}

    ethSend(name: string, params: any): PopulatedTransaction {}
}
