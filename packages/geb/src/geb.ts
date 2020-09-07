import {
    ContractApis,
    ContractAddresses,
    ETH_A,
} from '@reflexer-finance/geb-contract-api'
import { GebProviderInterface } from '@reflexer-finance/geb-provider'
import { EthersProvider } from '@reflexer-finance/geb-ethers-provider'
import { ethers } from 'ethers'
import { GebError, GebErrorTypes } from './errors'
import { GebProxyActions } from './proxy-action'
import { NULL_ADDRESS } from './utils'
import { isNumber } from 'util'
import { Safe } from './schema/safe'

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

    /**
     * Given an address returns the Proxy Action object
     * @param ownerAddress
     */
    public async getProxyAction(ownerAddress: string) {
        const address = await this.contracts.proxyRegistry.proxies(ownerAddress)

        if (address === NULL_ADDRESS) {
            throw new GebError(GebErrorTypes.DOES_NOT_OWN_HAVE_PROXY)
        }
        return new GebProxyActions(address, this.network, this.provider)
    }

    /**
     * Deploy a new proxy owned by the sender
     */
    public async deployProxy() {
        return await this.contracts.proxyRegistry.build()
    }

    /**
     * Get the safe object
     * @param idOrHandler Safe Id or Safe handler
     */
    public async getSafe(idOrHandler: string | number) {
        let handler: string
        let isManaged: boolean
        let safeData: {
            lockedCollateral: ethers.BigNumber
            generatedDebt: ethers.BigNumber
        }

        if (isNumber(idOrHandler)) {
            // TODO: multicall
            handler = await this.contracts.safeManager.safes(idOrHandler)
            isManaged = true
            safeData = await this.contracts.safeEngine.safes(ETH_A, handler)
        } else {
            handler = idOrHandler
            safeData = await this.contracts.safeEngine.safes(ETH_A, handler)
            isManaged = !!(await this.contracts.safeEngine.safeRights(
                handler,
                this.contracts.safeManager.address
            ))
        }
        return new Safe(
            this.contracts,
            handler,
            safeData.generatedDebt,
            safeData.lockedCollateral,
            ETH_A,
            isManaged
        )
    }
}
