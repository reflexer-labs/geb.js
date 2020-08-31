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

export interface ChainProviderInterface<TX_OBJ> {
    ethCall(
        address: string,
        abiFragment: AbiDefinition,
        params: Inputs
    ): Promise<any>
    ethSend(
        address: string,
        abiFragment: AbiDefinition,
        params: Inputs
    ): Promise<TX_OBJ>

    decodeError(error: any): string
}
