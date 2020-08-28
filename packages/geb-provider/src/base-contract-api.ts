import { ChainProviderInterface } from './chain-provider-interface'

export abstract class BaseContractAPI<TX_OBJ> {
    constructor(
        public name: string,
        public address: string,
        public chainProvider: ChainProviderInterface<TX_OBJ>
    ) {}
}
