import { Geb, TransactionRequest } from 'geb.js'
import { AdminApis } from '@reflexer-finance/geb-admin-api'
import {
    GebDeployment,
    GebProviderInterface,
} from '@reflexer-finance/geb-contract-base'
import { ethers } from 'ethers'
import { getRequireString, NULL_ADDRESS } from 'geb.js/lib/utils'

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
 * And now you are ready to use the admin tools similar to the GEB class:
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
     * @param  {GebProviderInterface|ethers.providers.Provider} provider Either a Ethers.js provider or a GEB provider. Support for Web3.js will be added in the future.
     */
    constructor(
        network: GebDeployment,
        provider: GebProviderInterface | ethers.providers.Provider
    ) {
        super(network, provider)

        this.contractsAdmin = new AdminApis(network, this.provider)
    }
    /**
     * Verifies a transaction meant to schedule a proposal
     *
     * @param  {string} govFunctionAbi Human readable ABI from gov actions or proxy of choice -> "setDelay(address,uint256)"
     * @param  {any[]} params Array containing function params
     * @param  {number} earliestExecutionTime
     * @param  {string} calldata to verify
     * @returns Promise<TransactionRequest>
     */
    public async verifyWebScheduleCallcode(
        govFunctionAbi: string,
        params: any[],
        earliestExecutionTime: number,
        calldata: string,
        description?: string
    ) {
        const encoded = await this.webScheduleProposal(
            govFunctionAbi,
            params,
            earliestExecutionTime,
            description
        )
        return encoded.data == calldata
    }

    /**
     * Encodes a proposal execution in DSPause
     *
     * @param  {string} govFunctionAbi Human readable ABI from gov actions or proxy of choice -> "setDelay(address,uint256)"
     * @param  {any[]} params Array containing function params
     * @param  {number} earliestExecutionTime
     * @returns Promise<TransactionRequest>
     */
    public async webExecuteProposal(
        govFunctionAbi: string,
        params: any[],
        earliestExecutionTime: number,
        govAction = this.addresses.GEB_GOV_ACTIONS
    ): Promise<TransactionRequest> {
        const codeHash = await this.provider.extCodeHash(govAction)

        return this.contractsAdmin.pause.executeTransaction(
            govAction,
            codeHash,
            this.getGovCallData(govFunctionAbi, params),
            earliestExecutionTime
        )
    }

    /**
     * Encodes a proposal scheduling tx for DSPause
     *
     * @param  {string} govFunctionAbi Human readable ABI from gov actions or proxy of choice -> "setDelay(address,uint256)"
     * @param  {any[]} params Array containing function params
     * @param  {number} earliestExecutionTime
     * @returns Promise<TransactionRequest>
     */
    public async webScheduleProposal(
        govFunctionAbi: string,
        params: any[],
        earliestExecutionTime: number,
        description?: string,
        govAction = this.addresses.GEB_GOV_ACTIONS
    ) {
        this.validateEarliestExecutionTime(earliestExecutionTime)

        const codeHash = await this.provider.extCodeHash(govAction)

        let tx: TransactionRequest

        if (description) {
            tx = this.contractsAdmin.pause.scheduleTransaction__AddressBytes32BytesUint256String(
                govAction,
                codeHash,
                this.getGovCallData(govFunctionAbi, params),
                earliestExecutionTime,
                description
            )
        } else {
            tx = this.contractsAdmin.pause.scheduleTransaction__AddressBytes32BytesUint256(
                govAction,
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
            description,
        }
    }

    /**
     * Test the execution of a proposal that's about to be scheduled in DSPause
     *
     * @param  {string} govFunctionAbi Human readable abi from gov actions or proxy of choice -> "setDelay(address,uint256)"
     * @param  {any[]} params Array containing function params
     * @param  {number} earliestExecutionTime
     * @returns Promise<TransactionRequest>
     */
    public async webTestScheduleProposal(
        govFunctionAbi: string,
        params: any[],
        earliestExecutionTime: number,
        description?: string,
        govAction = this.addresses.GEB_GOV_ACTIONS
    ) {
        this.validateEarliestExecutionTime(earliestExecutionTime)

        // Prepare a transaction like if we were executing it through the pause proxy
        const tx = this.contractsAdmin.pauseProxy.executeTransaction(
            govAction,
            this.getGovCallData(govFunctionAbi, params)
        )
        tx.from = this.contractsAdmin.pause.address

        try {
            await this.provider.ethCall(tx)
        } catch (err) {
            throw Error(getRequireString(err) || err)
        }

        console.log('Execution emulation success!')
    }

    /**
     * Submit a transaction to a Gnosis Safe and directly execute it. Works only if the threshold on Gnosis Safe is 1.
     * @param sender Proposal submitter
     * @param to Proposal target (Usually ds-pause)
     * @param data Transaction data of the proposal
     */
    public gnosisSafeThreshold1SubmitTransaction(
        sender: string,
        to: string,
        data: string
    ) {
        return this.contractsAdmin.multisigAdmin.execTransaction(
            0,
            to,
            0,
            data,
            0,
            0,
            0,
            0,
            NULL_ADDRESS,
            NULL_ADDRESS,
            `0x000000000000000000000000${sender
                .slice(2)
                .toLowerCase()}000000000000000000000000000000000000000000000000000000000000000001`
        )
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

    private validateEarliestExecutionTime(timestamp: number) {
        if (
            typeof timestamp !== 'number' ||
            timestamp !== Math.floor(timestamp) ||
            timestamp > 2524608000 || // After Jan 1st 2050
            timestamp < 1577836800 || // Before Jan 1st 2020
            timestamp <= Date.now() / 1000 // Before now
        ) {
            throw Error('Incorrect timestamp')
        }
    }
}
