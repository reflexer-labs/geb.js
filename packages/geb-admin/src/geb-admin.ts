import { Geb } from 'geb.js'
import { AdminApis } from '@reflexer-finance/geb-admin-api'
import {
    GebDeployment,
    GebProviderInterface,
} from '@reflexer-finance/geb-contract-base'
import { ethers } from 'ethers'

/**
 * This class extends the core `GEB` class with additional tools and contracts that are not used as often as other SAFE management tools.
 * Here you will find utils for contracts such as DSPause, ESM etc. These contracts are scattered across several repositories. Please refer to the smart contract documentation to learn more about them.
 *
 * **IMPORTANT:** To avoid bloating the main [geb.js](https://www.npmjs.com/package/geb.js) package this class is only available in a [separate package](https://www.npmjs.com/package/@reflexer-finance/geb-admin).
 * Please install it like this:
 * ```
 * npm install @reflexer-finance/geb-admin
 * ```
 *
 * And you are ready to use the admin tools similar to the GEB class:
 *
 * ```typescript
 * import { ethers } from 'ethers'
 * import { GebAdmin } from "@reflexer-finance/geb-admin"
 *
 *  const provider = new ethers.providers.JsonRpcProvider('http://kovan.infura.io/<API KEY>')
 *  const gebAdmin = new GebAdmin('kovan', provider)
 * ```
 */
export class GebAdmin extends Geb {
    /**
     * Object containing all GEB admin contracts instances for low level interactions.
     * It currently has the following contracts:
     * - MultiSigWallet
     * - DsProxy
     * - DsToken
     * - ProtocolTokenAuthority
     * - GebPollingEmitter
     * - GebPrintingPermissions
     * - DsDelegateRoles
     * - DsPause
     * - DsPauseProxy
     * - GovActions
     * - ESM
     * - TokenBurner
     * - FsmGovernanceInterface
     * - DsProxyFactory
     * - GebDeployPauseProxyActions
     * - DsProxy
     * - TxManager
     */
    public contractsAdmin: AdminApis

    /**
     * @param  {GebDeployment} network Either `'kovan'`, `'mainnet'` or an actual list of contract addresses.
     * @param  {GebProviderInterface|ethers.providers.Provider} provider Either a Ethers.js provider or a GEB provider. Support for Web3.js will soon be added.
     */
    constructor(
        network: GebDeployment,
        provider: GebProviderInterface | ethers.providers.Provider
    ) {
        super(network, provider)

        this.contractsAdmin = new AdminApis(network, this.provider)
    }
}
