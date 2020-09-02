import {
    ChainProviderInterface,
    AbiDefinition,
    Inputs,
    TransactionRequest,
} from '@reflexer-finance/geb-provider'
import { Contract, providers, BigNumber } from 'ethers'

export class EthersProvider implements ChainProviderInterface {
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
    async ethSend(
        address: string,
        abi: AbiDefinition,
        params: Inputs
    ): Promise<TransactionRequest> {
        const contract = new Contract(address, [abi], this.provider)

        const results = await contract.populateTransaction[abi.name](...params)

        return {
            from: results.from,
            to: results.to,
            data: results.data?.toString(),
            value: results.value?.toString(),
            gasLimit: results.gasLimit?.toString(),
            gasPrice: results.gasPrice?.toString(),
            chainId: results.chainId,
            nonce: results.nonce,
        }
    }

    decodeError(error: any): string {
        let data = error.data as string

        if (data.startsWith('Reverted 0x08c379a0')) {
            data = data.slice(19)
        } else if (data.startsWith('0x08c379a0')) {
            data = data.slice(10)
        } else if (data === 'Reverted') {
            return 'Reverted with no reason'
        } else {
            throw new Error('Could not decode error')
        }

        return decodeURIComponent(data.slice(2).replace(/[0-9a-f]{2}/g, '%$&'))
            .replace(/\0/g, '')
            .slice(2)
    }

    async estimateGas(transaction: TransactionRequest): Promise<BigNumber> {
        let result: BigNumber
        try {
            result = await this.provider.estimateGas(transaction)
        } catch (err) {
            console.error(`Error ! run this command to understand your error`)
            console.log(
                `seth call ${transaction.to} ${transaction.data} 2>&1 >/dev/null | grep "Reverted\ 0x" | cut -c 50-241 | xxd -p -r`
            )
        }

        return result
    }
}
