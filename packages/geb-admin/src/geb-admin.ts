import { Geb } from 'geb.js'
import { AdminApis } from '@reflexer-finance/geb-admin-api'
import {
    GebDeployment,
    GebProviderInterface,
} from '@reflexer-finance/geb-contract-base'
import { ethers } from 'ethers'

/**
 * This class extends the `Geb` class with additional tools and contracts that are not considered core to the system. Core contracts are mostly the contracts located in the `geb-repo`.
 * Here you will find all remaining contracts such as OSM, Governance, Pause, etc.. These contracts are scattered across several repositories. Please refer to the smart contract documentation to lean how to use them.
 */
export class GebAdmin extends Geb {
    /**
     * Object containing all admin contracts instances of the GEB ecosystem (Contracts considered core are available on the `contracts` attribute)
     * - weth
     * - multisigAdmin
     * - multisigAdminProxy
     * - deploy
     * - flx
     * - flxAuthority
     * - pollingEmitter
     * - pauseAuthority
     * - printingPermissionRegistry
     * - pause
     * - pauseProxy
     * - govActions
     * - esm
     * - esmBurner
     * - proxyActions
     * - proxyActionsGlobalSettlement
     * - fsmGovInterface
     * - proxyFactory
     * - medianizerEth
     * - osm
     * - pauseProxyAction
     * - proxyDeployer
     * - txManager
     */
    public contractsAdmin: AdminApis

    /**
     * @param  {GebDeployment} network Either `'kovan'`, `'mainnet'` or an actual list of contract address from the deployment script.
     * @param  {GebProviderInterface|ethers.providers.Provider} provider Either a Ethers.js provider or a Geb provider (Soon support for Web3 will be added)
     */
    constructor(
        network: GebDeployment,
        provider: GebProviderInterface | ethers.providers.Provider
    ) {
        super(network, provider)

        this.contractsAdmin = new AdminApis(network, this.provider)
    }
}
