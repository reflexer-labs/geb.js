import { Geb, TransactionRequest } from 'geb.js'
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
    /**
     * Verifies a transaction for scheduling proposals
     *
     * @param  {string} govFunctionAbi Human readable abi from gov actions or proxy of choice -> "setDelay(address,uint256)"
     * @param  {any[]} params Array containing all for the above function
     * @param  {number} earliestExecutionTime
     * @param  {string} calldata to verify
     * @returns Promise<TransactionRequest>
     */
    public async verifyWebScheduleCallcode(
        govFunctionAbi: string,
        params: any[],
        earliestExecutionTime: number,
        calldata: string
    ) {
        const encoded = await this.webScheduleProposal(
            govFunctionAbi,
            params,
            earliestExecutionTime
        )
        return encoded.data == calldata
    }

    /**
     * Encodes executing a proposal in dspause for web GUI
     *
     * @param  {string} govFunctionAbi Human readable abi from gov actions or proxy of choice -> "setDelay(address,uint256)"
     * @param  {any[]} params Array containing all for the above function
     * @param  {number} earliestExecutionTime
     * @returns Promise<TransactionRequest>
     */
    public async webExecuteProposal(
        govFunctionAbi: string,
        params: any[],
        earliestExecutionTime: number
    ): Promise<TransactionRequest> {
        const codeHash = await this.provider.extCodeHash(
            this.addresses.GEB_GOV_ACTIONS
        )

        return this.contractsAdmin.pause.executeTransaction(
            this.addresses.GEB_GOV_ACTIONS,
            codeHash,
            this.getGovCallData(govFunctionAbi, params),
            earliestExecutionTime
        )
    }

    /**
     * Encodes scheduling a proposal in dspause for web GUI
     *
     * @param  {string} govFunctionAbi Human readable abi from gov actions or proxy of choice -> "setDelay(address,uint256)"
     * @param  {any[]} params Array containing all for the above function
     * @param  {number} earliestExecutionTime
     * @returns Promise<TransactionRequest>
     */
    public async webScheduleProposal(
        govFunctionAbi: string,
        params: any[],
        earliestExecutionTime: number,
        description?: string
    ) {
        const codeHash = await this.provider.extCodeHash(
            this.addresses.GEB_GOV_ACTIONS
        )

        let tx: TransactionRequest

        if (description) {
            tx = this.contractsAdmin.pause.scheduleTransaction__AddressBytes32BytesUint256String(
                this.addresses.GEB_GOV_ACTIONS,
                codeHash,
                this.getGovCallData(govFunctionAbi, params),
                earliestExecutionTime,
                description
            )
        } else {
            tx = this.contractsAdmin.pause.scheduleTransaction__AddressBytes32BytesUint256(
                this.addresses.GEB_GOV_ACTIONS,
                codeHash,
                this.getGovCallData(govFunctionAbi, params),
                earliestExecutionTime
            )
        }
        return {
            to: this.addresses.GEB_PAUSE,
            value: 0,
            data: tx.data,
            gov_function_abi: govFunctionAbi,
            params: params,
            earliestExecutionTime: earliestExecutionTime,
        }
    }

    private getGovCallData(govFunctionAbi: string, params: any[]) {
        const prototype = govFunctionAbi.split(/\(|\)/)
        return this.provider.encodeFunctionData(
            params,
            // Convert the human readable format to JSON ABI fragment
            {
                name: prototype[0],
                inputs: prototype[1]
                    .split(',')
                    .map((t) => ({ name: '', type: t })),
                outputs: [],
                type: 'function',
                stateMutability: 'nonpayable',
            }
        )
    }
}
