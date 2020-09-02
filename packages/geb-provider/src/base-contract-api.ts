import {
    ChainProviderInterface,
    AbiDefinition,
    Inputs,
} from './chain-provider-interface'

export declare type TransactionRequest = {
    to?: string
    from?: string
    nonce?: number
    gasLimit?: string
    gasPrice?: string
    data?: string
    value?: string
    chainId?: number
}

export class BaseContractAPI {
    constructor(
        public address: string,
        public chainProvider: ChainProviderInterface
    ) {}

    protected ethCall(
        abiFragment: AbiDefinition,
        params: Inputs
    ): Promise<any> {
        return this.chainProvider.ethCall(this.address, abiFragment, params)
    }

    protected ethSend(
        abiFragment: AbiDefinition,
        params: Inputs
    ): Promise<TransactionRequest> {
        return this.chainProvider.ethSend(this.address, abiFragment, params)
    }
}
