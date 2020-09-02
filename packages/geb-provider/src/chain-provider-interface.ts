import { TransactionRequest } from './base-contract-api'

export interface AbiDefinition {
    name: string
    // constant: boolean;
    // payable: boolean;
    stateMutability?: string
    inputs: AbiParameter[]
    outputs: AbiParameter[]
    type: string
}
interface AbiParameter {
    name: string
    type: string
    internalType?: string
    components?: AbiParameter[]
}

export interface Inputs extends ReadonlyArray<any> {
    readonly [key: string]: any
}

export interface ChainProviderInterface {
    ethCall(
        address: string,
        abiFragment: AbiDefinition,
        params: Inputs
    ): Promise<any>
    ethSend(
        address: string,
        abiFragment: AbiDefinition,
        params: Inputs
    ): Promise<TransactionRequest>

    decodeError(error: any): string
}
