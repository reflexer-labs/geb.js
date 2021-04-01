import {
    ContractApis,
    Multicall,
    Erc20,
    StakingRewards,
    MerkleDistributor,
} from '@reflexer-finance/geb-contract-api'
import {
    GebProviderInterface,
    MulticallRequest,
    getAddressList,
    ContractList,
    GebDeployment,
    BaseContractAPI,
    GebContractAPIConstructorInterface,
} from '@reflexer-finance/geb-contract-base'
import { GebEthersProvider } from '@reflexer-finance/geb-ethers-provider'
import { ethers } from 'ethers'
import { GebError, GebErrorTypes } from './errors'
import { GebProxyActions } from './proxy-action'
import { NULL_ADDRESS } from './utils'
import { Safe } from './schema/safe'
import { BigNumber } from '@ethersproject/bignumber'

/**
 * The main package used to interact with the GEB system. Includes [[deployProxy |helper functions]] for safe
 *  management and the [[contracts | contract interface object]] to directly call smart contracts.
 */
export class Geb {
    /**
     * Object containing all GEB core smart contract instances for direct level interactions. All of the
     * following contract objects are one-to-one API typed to the underlying smart contracts. Read-only
     * functions that do not change blockchain state return a promise of the return data. State modifying
     * function will synchronously return a pre-filled transaction request object:
     * ```
     * {
     *   to: "0x123abc.."
     *   data: "0xabab234ab..."
     * }
     * ```
     * This object follow the [[https://docs.ethers.io/v5/api/providers/types/#providers-TransactionRequest
     * TransactionRequest model of ethers.js]] (also similar to the
     * [[https://web3js.readthedocs.io/en/v1.3.0/web3-eth.html#id84 | model used by web.js]]). The object can
     * be completed with properties such as ` from `, ` gasPrice `, ` gas ` (gas limit, web3.js ony) or
     * ` gasLimit ` (gas limit, ethers.js only). The object can then be passed to the `sendTransaction` of
     * [[https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction|ehters.js]] or
     * [[https://web3js.readthedocs.io/en/v1.3.0/web3-eth.html#sendtransaction | web3.js]]
     *
     *  Example:
     *  ```typescript
     *  // Setup geb.js an ethers
     *  const provider = new ethers.providers.JsonRpcProvider('http://kovan.infura.io/<API KEY>')
     *  const wallet = new ethers.Wallet('<Private key>', provider)
     *  const geb = new Geb('kovan', provider)
     *
     *  // Contract read function: fetch the debt ceiling
     *  const debtCeiling = await geb.contracts.safeEngine.globalDebtCeiling()
     *
     *  // State changing function: manualy liquidate a SAFE
     *  const tx = geb.contracts.liquidationEngine.liquidateSAFE(ETH_A, '0x1234abc...')
     *  await wallet.sendTransaction(tx) // Send the Ethereum transaction
     *  ```
     *
     * Currently the following contracts ae available in this property:
     * - SAFEEngine
     * - AccountingEngine
     * - TaxCollector
     * - LiquidationEngine
     * - OracleRelayer
     * - GlobalSettlement
     * - DebtAuctionHouse
     * - PostSettlementSurplusAuctionHouse
     * - SettlementSurplusAuctioneer
     * - GebSafeManager
     * - GetSafes
     * - BasicCollateralJoin
     * - CoinJoin
     * - Coin (System coin ERC20 contract)
     * - GebProxyRegistry
     * - FixedDiscountCollateralAuctionHouse
     * - Weth (ERC20)
     *
     * For detailed information about the functions of each contract we recommend the smart contract
     * [[https://github.com/reflexer-labs/geb | code]] and [[https://docs.reflexer.finance/ |
     * documentation]]
     */
    public contracts: ContractApis
    protected provider: GebProviderInterface
    protected addresses: ContractList
    /**
     * Constructor for the main Geb.js object.
     * @param  {GebDeployment} network Either `'kovan'`, `'mainnet'` or an actual list of contract addresses.
     * @param  {GebProviderInterface|ethers.providers.Provider} provider Either a Ethers.js provider or a Geb provider (support for Web3 will be added in the future)
     */
    constructor(
        protected network: GebDeployment,
        provider: GebProviderInterface | ethers.providers.Provider
    ) {
        if (
            // @ts-ignore
            provider.getBlockNumber !== undefined &&
            // @ts-ignore
            provider.getBlock !== undefined
        ) {
            // It's an Ethers provider
            this.provider = new GebEthersProvider(
                provider as ethers.providers.Provider
            )
        } else {
            this.provider = provider as GebProviderInterface
        }
        this.addresses = getAddressList(network)
        this.contracts = new ContractApis(network, this.provider)
    }

    /**
     * Given an address, it returns a GebProxyActions object used to execute bundled operations.
     * Important: This requires that the address deployed a GEB proxy through the proxy registry contract. It will throw a `DOES_NOT_OWN_HAVE_PROXY` error if the address specified does not have a proxy. Use the [[deployProxy]] function to get a new proxy.
     * @param ownerAddress Externally owned user account aka Ethereum address that owns a GEB proxy.
     */
    public async getProxyAction(ownerAddress: string) {
        const address = await this.contracts.proxyRegistry.proxies(ownerAddress)

        if (address === NULL_ADDRESS) {
            throw new GebError(GebErrorTypes.DOES_NOT_OWN_HAVE_PROXY)
        }
        return new GebProxyActions(address, this.network, this.provider)
    }

    /**
     * Deploy a new proxy owned by the sender.
     */
    public deployProxy() {
        return this.contracts.proxyRegistry.build()
    }

    /**
     * Get the SAFE object given a `safeManager` id or a `safeEngine` handler address.
     * @param idOrHandler Safe Id or SAFE handler
     */
    public async getSafe(
        idOrHandler: string | number,
        collateralType?: string
    ): Promise<Safe> {
        let handler: string
        let isManaged: boolean
        let safeId: number
        let safeData: {
            lockedCollateral: ethers.BigNumber
            generatedDebt: ethers.BigNumber
        }

        if (typeof idOrHandler === 'number') {
            if (collateralType) {
                throw new GebError(
                    GebErrorTypes.INVALID_FUNCTION_INPUT,
                    'Do not specify a collateral type when providing a SAFE Id.'
                )
            }

            isManaged = true
            safeId = idOrHandler
            ;[handler, collateralType] = await this.multiCall([
                this.contracts.safeManager.safes(idOrHandler, true),
                this.contracts.safeManager.collateralTypes(idOrHandler, true),
            ])

            if (handler === NULL_ADDRESS) {
                throw new GebError(
                    GebErrorTypes.SAFE_DOES_NOT_EXIST,
                    `Safe id ${idOrHandler} does not exist`
                )
            }

            safeData = await this.contracts.safeEngine.safes(
                collateralType,
                handler
            )
        } else {
            // We're given a handler
            if (!collateralType) {
                throw new GebError(
                    GebErrorTypes.INVALID_FUNCTION_INPUT,
                    'Collateral type needs to be specified when providing a SAFE handler'
                )
            }

            handler = idOrHandler
            let safeRights: BigNumber
            ;[safeData, safeRights] = await this.multiCall([
                this.contracts.safeEngine.safes(collateralType, handler, true),
                this.contracts.safeEngine.safeRights(
                    handler,
                    this.contracts.safeManager.address,
                    true
                ),
            ])

            // If SafeManager has rights over the safe, it's a managed safe
            isManaged = !safeRights.isZero()
            handler = idOrHandler
        }
        return new Safe(
            this.contracts,
            handler,
            safeData.generatedDebt,
            safeData.lockedCollateral,
            collateralType,
            isManaged,
            safeId
        )
    }

    /**
     * Fetch the list of safes owned by an address. This function will fetch safes owned directly
     * through the safeManager and safes owned through the safe manager by a proxy. Safes owned
     * directly by the address at the safeEngine level won't appear here.
     *
     * Note that this function will make a lot of network calls and is therefore very slow. For
     * front-ends we recommend using pre-indexed data from a source such as the geb-subgraph.
     *
     * @param  {string} address
     */
    public async getSafeFromOwner(address: string): Promise<Safe[]> {
        // Fetch safes for a proxy
        const proxy = await this.contracts.proxyRegistry.proxies(address)
        const safes: Safe[] = []
        let safeId = await this.contracts.safeManager.firstSAFEID(proxy)
        while (!safeId.isZero()) {
            safes.push(await this.getSafe(safeId.toNumber()))
            safeId = (await this.contracts.safeManager.safeList(safeId)).next
        }

        // Fetch safes that are owned directly
        safeId = await this.contracts.safeManager.firstSAFEID(address)
        while (!safeId.isZero()) {
            safes.push(await this.getSafe(safeId.toNumber()))
            safeId = (await this.contracts.safeManager.safeList(safeId)).next
        }
        return safes
    }

    /**
     * Returns an object that can be used to interact with an ERC20 token.
     * Example:
     * ```typescript
     * const USDCAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
     * const USDC = geb.getErc20Contract(USDCAddress)
     *
     * // Get 0xdefiisawesome's balance
     * const balance = USDC.balanceOf("0xdefiisawesome..")
     *
     * // Send 1 USDC to 0xdefiisawesome (USDC is 6 decimals)
     * const tx = USDC.transfer("0xdefiisawesome..", "1000000")
     * await wallet.sendTransaction(tx)
     * ```
     *
     * @param  {string} tokenAddress Token contract address
     * @returns Erc20
     */
    public getErc20Contract(tokenAddress: string): Erc20 {
        return new Erc20(tokenAddress, this.provider)
    }
    /**
     *  Help function to get the contract object of an incentive campaign given its ID number
     *
     * @param  {number} campaignNumber incremental ID of the campaign
     *
     * @returns StakingRewards
     */
    public async getIncentiveCampaignContract(campaignNumber: number) {
        const address = (
            await this.contracts.stakingRewardFactory.stakingRewardsInfo(
                campaignNumber
            )
        ).stakingRewards

        if (address === NULL_ADDRESS) {
            throw new Error('The campaign does not exist')
        }
        return new StakingRewards(address, this.provider)
    }

    /**
     * Get the claim statues of merkle distributions given a list of distributions and a node
     * The nodeIndex is the index of the address in the merkle tree.
     * @param  {{distributionIndex:number;nodeIndex:number}[]} nodes
     */
    public async getMerkleDistributorClaimStatues(
        nodes: { distributionIndex: number; nodeIndex: number }[]
    ) {
        const multiCall1: MulticallRequest<string>[] = []
        for (let i = 0; i < nodes.length; i++) {
            multiCall1.push(
                this.contracts.merkleDistributorFactory.distributors(
                    nodes[i].distributionIndex,
                    true
                )
            )
        }

        //@ts-ignore
        const distributorAddresses: string[] = await this.multiCall(multiCall1)

        const multiCall2: MulticallRequest<boolean>[] = []
        for (let i = 0; i < nodes.length; i++) {
            multiCall2.push(
                new MerkleDistributor(
                    distributorAddresses[i],
                    this.provider
                ).isClaimed(nodes[i].nodeIndex, true)
            )
        }

        //@ts-ignore
        const claims: boolean[] = await this.multiCall(multiCall2)

        const ret: {
            nodeIndex: number
            distributorAddress: string
            isClaimed: boolean
        }[] = []
        for (let i = 0; i < nodes.length; i++) {
            ret.push({
                nodeIndex: nodes[i].nodeIndex,
                distributorAddress: distributorAddresses[i],
                isClaimed: claims[i],
            })
        }

        return ret
    }

    /**
     * Get a merkle distributor contract given its address
     * @param  {string} distributorAddress
     */
    public getMerkleDistributor(distributorAddress: string) {
        return new MerkleDistributor(distributorAddress, this.provider)
    }

    // Multicall overloads, typing support for up to 7 calls.

    // prettier-ignore
    /** @ignore */
    public multiCall<O1>(calls: [MulticallRequest<O1>]): Promise<[O1]>
    // prettier-ignore
    /** @ignore */
    public multiCall<O1, O2>(calls: [MulticallRequest<O1>, MulticallRequest<O2>]): Promise<[O1, O2]>
    // prettier-ignore
    public multiCall<O1, O2, O3>(calls: [MulticallRequest<O1>, MulticallRequest<O2>, MulticallRequest<O3>]): Promise<[O1, O2, O3]>
    // prettier-ignore
    /** @ignore */
    public multiCall<O1, O2, O3, O4>(calls: [MulticallRequest<O1>, MulticallRequest<O2>, MulticallRequest<O3>, MulticallRequest<O4>]): Promise<[O1, O2, O3, O4]>
    // prettier-ignore
    /** @ignore */
    public multiCall<O1, O2, O3, O4, O5>(calls: [MulticallRequest<O1>, MulticallRequest<O2>, MulticallRequest<O3>, MulticallRequest<O4>, MulticallRequest<O5>]): Promise<[O1, O2, O3, O4, O5]>
    // prettier-ignore
    /** @ignore */
    public multiCall<O1, O2, O3, O4, O5, O6>(calls: [MulticallRequest<O1>, MulticallRequest<O2>, MulticallRequest<O3>, MulticallRequest<O4>, MulticallRequest<O5>, MulticallRequest<O6>]): Promise<[O1, O2, O3, O4, O5, O6]>
    // prettier-ignore
    /** @ignore */
    public multiCall<O1, O2, O3, O4, O5, O6, O7>(calls: [MulticallRequest<O1>, MulticallRequest<O2>, MulticallRequest<O3>, MulticallRequest<O4>, MulticallRequest<O5>, MulticallRequest<O6>, MulticallRequest<O7>]): Promise<[O1, O2, O3, O4, O5, O6, O7]>

    /**
     * Bundles several read only GEB contract calls into a single RPC request. Useful for front-ends or apps that need to fetch many parameters from contracts but want to minimize network requests and the load on the underlying Ethereum node.
     * The function takes as input an Array of GEB view contract calls.
     * **IMPORTANT**: You have to set the `multicall` parameter of the contract function to `true`. It is the always the last function parameter.
     * Multicall works for all contracts in `Geb.contracts` and can be used with any contract that inherits `BaseContractApi`. Note that it does not support non-view calls (calls that require you pay gas and change blockchain state).
     *
     * Example:
     * ```typescript
     * import { ethers } from "ethers"
     * import { Geb } from "geb.js"
     *
     * const provider = new ethers.providers.JsonRpcProvider("http://kovan.infura.io/...")
     * const geb = new Geb("kovan", provider);
     *
     * const [ globalDebt, collateralInfo ] = await geb.multiCall([
     *     geb.contracts.safeEngine.globalDebt(true), // !! Note the last parameter set to true.
     *     geb.contracts.safeEngine.collateralTypes(ETH_A, true),
     * ])
     *
     * console.log(`Current global debt: ${globalDebt.toString()}`)
     * console.log(`Current ETH_A debt: ${collateralInfo.debtAmount}`)
     * ```
     * @param  {MulticallRequest<T>[]} calls Call a read only GEB contract function. The GEB contract object needs to be called with the parameter `multicall` set to `true` as seen in the example above.
     * @returns Promise<T[]> Array with results for the specified requests.
     */
    public async multiCall<T>(calls: MulticallRequest<T>[]): Promise<T[]> {
        const multiCall = new Multicall(this.addresses.MULTICALL, this.provider)

        const send = calls.map((x) => ({
            target: x.to,
            callData: x.data,
        }))

        const results = await multiCall.aggregate_readOnly(send)

        const a = results.returnData.map((raw, i) =>
            this.provider.decodeFunctionData(raw, calls[i].abi)
        )

        return (a as unknown) as T[]
    }
    /**
     * Returns an instance of a specific geb contract given a Geb contract API class constructor at a specified address
     *
     * @param  {GebContractAPIConstructorInterface<T>} gebContractClass Class from contracts or adminContracts
     * @param  {string} address Contract address of the instance
     * @param  {GebProviderInterface|ethers.providers.Provider} provider Either a Ethers.js provider or a Geb provider
     */
    public static getGebContract<T extends BaseContractAPI>(
        gebContractClass: GebContractAPIConstructorInterface<T>,
        address: string,
        provider: GebProviderInterface | ethers.providers.Provider
    ): T {
        if (
            // @ts-ignore
            provider.getBlockNumber !== undefined &&
            // @ts-ignore
            provider.getBlock !== undefined
        ) {
            // It's an Ethers provider
            provider = new GebEthersProvider(
                provider as ethers.providers.Provider
            )
        }

        return new gebContractClass(address, provider as GebProviderInterface)
    }

    /**
     * Returns an instance of a specific GEB contract given a Geb contract API class at a specified address
     *
     * ```typescript
     * import { contracts } from "geb.js"
     * const safeEngine = geb.getGebContract(contracts.SafeEngine, "0xabcd123..")
     * const globalDebt = safeEngine.globalDebt()
     * ```
     *
     * @param  {GebContractAPIConstructorInterface<T>} gebContractClass Class from contracts or adminContracts
     * @param  {string} address Contract address of the instance
     */
    public getGebContract<T extends BaseContractAPI>(
        gebContractClass: GebContractAPIConstructorInterface<T>,
        address: string
    ): T {
        return new gebContractClass(address, this.provider)
    }
}
