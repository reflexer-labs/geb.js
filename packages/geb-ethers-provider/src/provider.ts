import {
    GebProviderInterface,
    AbiDefinition,
    Inputs,
    TransactionRequest,
} from '@reflexer-finance/geb-provider'
import { Contract, providers, BigNumber } from 'ethers'

export class EthersProvider implements GebProviderInterface {
    constructor(public provider: providers.Provider) {}

    async ethCall(
        address: string,
        abi: AbiDefinition,
        params: Inputs
    ): Promise<any> {
        const contract = new Contract(address, [abi], this.provider)

        // Special case where we are calling a non-view function as a static call (used only to read the redemption price)
        if (abi.stateMutability !== 'view') {
            const results = await contract.callStatic[abi.name](...params)
            return results
        }

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
        params: Inputs,
        ethValue?: BigNumber
    ): Promise<TransactionRequest> {
        const contract = new Contract(address, [abi], this.provider)

        const results = await contract.populateTransaction[abi.name](...params)
        return {
            from: results.from,
            to: results.to,
            data: results.data?.toString(),
            value: ethValue,
            gasLimit: results.gasLimit,
            gasPrice: results.gasPrice,
            chainId: results.chainId,
            nonce: results.nonce,
        }
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

    async estimateGas(transaction: TransactionRequest): Promise<BigNumber> {
        return await this.provider.estimateGas(transaction)
    }

    async ethCallRequest(transaction: TransactionRequest): Promise<any> {
        let result: string

        try {
            result = await this.provider.call(transaction)
        } catch (err) {
            // console.error(`Error ! run this command to understand your error`)
            // console.log(
            //     `seth call ${transaction.to} ${transaction.data} 2>&1 >/dev/null | grep "Reverted\ 0x" | cut -c 50-241 | xxd -p -r`
            // )

            throw err
        }
        return result
    }

    async chainId(): Promise<number> {
        return (await this.provider.getNetwork()).chainId
    }
}
