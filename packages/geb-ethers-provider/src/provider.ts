import {
    GebProviderInterface,
    AbiDefinition,
    Inputs,
    Outputs,
    TransactionRequest,
} from '@reflexer-finance/geb-contract-base'
import { providers, utils } from 'ethers'
import { Result } from 'ethers/lib/utils'
import { isNumber } from 'util'

export class EthersProvider implements GebProviderInterface {
    constructor(public provider: providers.Provider) {}

    private processEthersResults(results: Result): any {
        if (results.length === 0) {
            return []
        } else if (results.length === 1) {
            return results[0]
        } else {
            // Do this to remove positional references
            let ret: any = {}
            for (let key in results) {
                if (isNumber(key)) continue
                ret[key] = results[key]
            }

            return ret
        }
    }

    async ethCall(transaction: TransactionRequest): Promise<string> {
        return this.provider.call(transaction)
    }

    decodeFunctionData(data: string, abiFragment: AbiDefinition): Outputs {
        const coder = new utils.Interface([abiFragment])
        const result = coder.decodeFunctionResult(abiFragment.name, data)
        return this.processEthersResults(result)
    }

    encodeFunctionData(params: Inputs[], abiFragment: AbiDefinition): string {
        const coder = new utils.Interface([abiFragment])
        return coder.encodeFunctionData(abiFragment.name, params)
    }

    decodeError(error: any): string {
        let data: string
        if (error?.data) {
            data = error.data
        } else if (error?.error?.data) {
            data = error.error.data
        } else if (error?.error?.stack) {
            return error.error.stack.split('\n')[0]
        } else {
            throw new Error('Unknown error format')
        }

        if (data.startsWith('Reverted 0x08c379a0')) {
            data = data.slice(19)
        } else if (data.startsWith('0x08c379a0')) {
            data = data.slice(10)
        } else if (data === 'Reverted') {
            return 'Reverted'
        } else if (data === 'Reverted 0x') {
            return '0x'
        } else {
            return data
        }

        return decodeURIComponent(data.slice(2).replace(/[0-9a-f]{2}/g, '%$&'))
            .replace(/\0/g, '')
            .slice(2)
    }

    async chainId(): Promise<number> {
        return (await this.provider.getNetwork()).chainId
    }
}
