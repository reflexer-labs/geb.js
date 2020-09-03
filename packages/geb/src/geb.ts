import {
    ContractApis,
    ContractAddresses,
} from '@reflexer-finance/geb-contract-api'
import { GebProviderInterface } from '@reflexer-finance/geb-provider'
import { EthersProvider } from '@reflexer-finance/geb-ethers-provider'
import { ethers } from 'ethers'
import { NULL_ADDRESS } from './const'
import { GebError, GebErrorTypes } from './errors'
import { GebProxyActions } from './proxy-action'

export class Geb {
    public contracts: ContractApis
    private provider: GebProviderInterface
    constructor(
        private network: ContractAddresses,
        provider: GebProviderInterface | ethers.providers.Provider
    ) {
        if (
            // @ts-ignore
            provider.getBlockNumber !== undefined &&
            // @ts-ignore
            provider.getBlock !== undefined
        ) {
            // It's an Ethers provider
            this.provider = new EthersProvider(
                provider as ethers.providers.Provider
            )
        } else {
            this.provider = provider as GebProviderInterface
        }

        this.contracts = new ContractApis(network, this.provider)
    }

    async getProxyAction(ownerAddress: string) {
        const address = await this.contracts.proxyRegistry.proxies(ownerAddress)

        if (address === NULL_ADDRESS) {
            throw new GebError(GebErrorTypes.DOES_NOT_OWN_HAVE_PROXY)
        }
        return new GebProxyActions(address, this.network, this.provider)
    }

    async deployProxy() {
        return await this.contracts.proxyRegistry.build()
    }
}
