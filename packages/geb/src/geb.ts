import {
    ContractApis,
    Multicall,
    Erc20,
} from '@reflexer-finance/geb-contract-api'
import {
    GebProviderInterface,
    MulticallRequest,
    getAddressList,
    ContractList,
    GebDeployment,
} from '@reflexer-finance/geb-contract-base'
import { EthersProvider } from '@reflexer-finance/geb-ethers-provider'
import { ethers } from 'ethers'
import { GebError, GebErrorTypes } from './errors'
import { GebProxyActions } from './proxy-action'
import { NULL_ADDRESS, ETH_A } from './utils'
import { isNumber } from 'util'
import { Safe } from './schema/safe'
import { BigNumber } from '@ethersproject/bignumber'

/**
 * Main object of the library instantiating all useful GEB contracts and providing all helper functions needed.
 */
export class Geb {
    /**
     * Object containing all GEB contracts instances for low level interactions. All contracts object offer a one-to-one typed API to the underlying smart-contract.
     * Currently has the following contracts:
     * - SafeEngine
     * - AccountingEngine
     * - TaxCollector
     * - LiquidationEngine
     * - OracleRelayer
     * - GlobalSettlement
     * - DebtAuctionHouse
     * - PreSettlementSurplusAuctionHouse
     * - PostSettlementSurplusAuctionHouse
     * - SettlementSurplusAuctioneer
     * - GebSafeManager
     * - GetSafes
     * - BasicCollateralJoin
     * - CoinJoin
     * - Coin (RAI ERC20 contract)
     * - GebProxyRegistry
     * - FixedDiscountCollateralAuctionHouse (For ETH-A)
     * - Weth (ERC20)
     */
    public contracts: ContractApis
    private provider: GebProviderInterface
    private addresses: ContractList
    /**
     * @param  {GebDeployment} network Either `'kovan'`, `'mainnet'` or an actual list of contract address from the deployment script.
     * @param  {GebProviderInterface|ethers.providers.Provider} provider Either a Ethers.js provider or a Geb provider (Soon support for Web3 will be added)
     */
    constructor(
        private network: GebDeployment,
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
        this.addresses = getAddressList(network)
        this.contracts = new ContractApis(network, this.provider)
    }

    /**
     * Given an address returns a GebProxyAction object to execute bundled operations.
     * Important: This requires the address to have deployed a GEB proxy through the proxy registry contract. It will throw a `DOES_NOT_OWN_HAVE_PROXY` error if the address specified does not have a proxy. Use the [[deployProxy]] function to get a new proxy.
     * @param ownerAddress Externally owned user account, Ethereum address that owns a GEB proxy.
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
            let safeRights: BigNumber
            ;[safeData, safeRights] = await this.multiCall([
                this.contracts.safeEngine.safes(ETH_A, handler, true),
                this.contracts.safeEngine.safeRights(
                    handler,
                    this.contracts.safeManager.address,
                    true
                ),
            ])

            // If SafeManager has right over the safe, it's a managed safe
            isManaged = !safeRights.isZero()
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

    /**
     * Return an object that can be use to interact with a ERC20 token.
     * Example:
     * ```typescript
     * const USDCAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
     * const USDC = geb.getErc20Contract(USDCAddress)
     *
     * // Get deadBeef's balance
     * const balance = USDC.balanceOf("0xdeadbeef..")
     *
     * // Send 1 USDC to deadbeef (Yes, USDC is 6 decimals)
     * const tx = USDC.transfer("0xdeadbeef..", "1000000")
     * await wallet.sendTransaction(tx)
     * ```
     *
     * @param  {string} tokenAddress Token contract address
     * @returns Erc20
     */
    public getErc20Contract(tokenAddress: string): Erc20 {
        return new Erc20(tokenAddress, this.provider)
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
     * Bundles several read only GEB contract call into 1 RPC single request. Useful for front-ends or apps that need to fetch many parameters from the contracts but want to minimize the network request and the load on the underlying Ethereum node.
     * The function takes as input an Array of GEB view contract calls.
     * IMPORTANT: You have to set the `multicall` parameter of the contract function to `true`, it is the always the last parameter of the function.
     * Multicall works for all contracts in the `Geb.contracts` and can be use with any contract that inherit the `BaseContractApi`. Note that it does not support non-view calls (Calls that require to pay gas and change the state of the blockchain).
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
     * @param  {MulticallRequest<T>[]} calls Return value from a view GEB contract call. !! The GEB contract object needs to be call with the parameter `multicall` set to `true`, see example above.
     * @returns Promise<T[]> Array with the result from their respective requests.
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
}
