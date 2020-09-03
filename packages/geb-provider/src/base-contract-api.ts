import {
    GebProviderInterface,
    AbiDefinition,
    Inputs,
} from './chain-provider-interface'
import { BigNumber } from '@ethersproject/bignumber'

export declare type TransactionRequest = {
    to?: string
    from?: string
    nonce?: number
    gasLimit?: BigNumber
    gasPrice?: BigNumber
    data?: string
    value?: BigNumber
    chainId?: number
}

export class BaseContractAPI {
    constructor(
        public address: string,
        public chainProvider: GebProviderInterface
    ) {}

    protected ethCall(
        abiFragment: AbiDefinition,
        params: Inputs
    ): Promise<any> {
        return this.chainProvider.ethCall(this.address, abiFragment, params)
    }

    protected ethSend(
        abiFragment: AbiDefinition,
        params: Inputs,
        ethValue?: BigNumber
    ): Promise<TransactionRequest> {
        return this.chainProvider.ethSend(
            this.address,
            abiFragment,
            params,
            ethValue
        )
    }
}
