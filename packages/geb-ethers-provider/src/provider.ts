import {
    ChainProviderInterface,
    AbiDefinition,
    Inputs,
} from '@reflexer-finance/geb-provider'
import { Contract, providers, PopulatedTransaction } from 'ethers'

export class EthersProvider
    implements ChainProviderInterface<PopulatedTransaction> {
    constructor(public provider: providers.Provider) {}

    async ethCall(
        address: string,
        abi: AbiDefinition,
        params: Inputs
    ): Promise<any> {
        const contract = new Contract(address, [abi], this.provider)
        const results = await contract.functions[abi.name](...params)

        if (results.length === 0) {
            return []
        } else if (results.length === 1) {
            return results[0]
        } else {
            // Do this to remove positional references
            let ret: any = {}
            for (let i = 0; i < abi.outputs.length; i++) {
                ret[abi.outputs[i].name] = results[i]
            }

            return ret
        }
    }

    // @ts-ignore TODO: Remove
    ethSend(
        address: string,
        abi: AbiDefinition,
        params: Inputs
    ): Promise<PopulatedTransaction> {
        const contract = new Contract(address, [abi], this.provider)

        return contract.populateTransaction[abi.name](...params)
    }
}
