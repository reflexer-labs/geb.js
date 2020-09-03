import { KOVAN_ADDRESSES, MAINNET_ADDRESSES } from './addresses'
import {
    AccountingEngine,
    TaxCollector,
    LiquidationEngine,
    OracleRelayer,
    GlobalSettlement,
    DebtAuctionHouse,
    PreSettlementSurplusAuctionHouse,
    PostSettlementSurplusAuctionHouse,
    SettlementSurplusAuctioneer,
    Coin,
    GebSafeManager,
    GetSafes,
    BasicCollateralJoin,
    CoinJoin,
    GebProxyRegistry,
    EnglishCollateralAuctionHouse,
    FixedDiscountCollateralAuctionHouse,
    Weth,
} from '.'
import { ChainProviderInterface } from '@reflexer-finance/geb-provider'
import { getAddressList } from './utils'

export type ContractKey =
    | 'ETH_FROM'
    | 'STARTING_BLOCK_NUMBER'
    | 'PROXY_DEPLOYER'
    | 'COIN_TYPE'
    | 'GOVERNANCE_TYPE'
    | 'MULTICALL'
    | 'FAUCET'
    | 'GEB_MULTISIG'
    | 'GEB_MULTISIG_PROXY'
    | 'GEB_DEPLOY'
    | 'GEB_PROT'
    | 'PROTOCOL_TOKEN_AUTHORITY'
    | 'PRINTING_PERMISSIONS_REGISTRY'
    | 'GEB_PAUSE_AUTHORITY'
    | 'GEB_POLLING_EMITTER'
    | 'GEB_SAFE_ENGINE'
    | 'GEB_TAX_COLLECTOR'
    | 'GEB_LIQUIDATION_ENGINE'
    | 'GEB_ACCOUNTING_ENGINE'
    | 'GEB_COIN_JOIN'
    | 'GEB_SETTLEMENT_SURPLUS_AUCTIONEER'
    | 'GEB_PRE_SETTLEMENT_SURPLUS_AUCTION_HOUSE'
    | 'GEB_POST_SETTLEMENT_SURPLUS_AUCTION_HOUSE'
    | 'GEB_DEBT_AUCTION_HOUSE'
    | 'GEB_PAUSE'
    | 'GEB_PAUSE_PROXY'
    | 'GEB_GOV_ACTIONS'
    | 'GEB_COIN'
    | 'GEB_ORACLE_RELAYER'
    | 'GEB_GLOBAL_SETTLEMENT'
    | 'GEB_ESM'
    | 'GEB_ESM_TOKEN_BURNER'
    | 'PROXY_ACTIONS'
    | 'PROXY_ACTIONS_GLOBAL_SETTLEMENT'
    | 'SAFE_MANAGER'
    | 'GET_SAFES'
    | 'FSM_GOV_INTERFACE'
    | 'PROXY_FACTORY'
    | 'PROXY_REGISTRY'
    | 'ETH'
    | 'MEDIANIZER_ETH'
    | 'ORACLE_SECURITY_MODULE_ETH'
    | 'GEB_JOIN_ETH_A'
    | 'GEB_COLLATERAL_AUCTION_HOUSE_ETH_A'
    | 'PROXY_PAUSE_ACTIONS'
    | 'PROXY_DEPLOYER'
    | 'UNISWAP_FACTORY'
    | 'UNISWAP_ROUTER'
    | 'GEB_DS_COMPARE'
    | 'GEB_TX_MANAGER'

export type ContractList = {
    [key in ContractKey]: string
}

export declare type ContractAddresses = 'mainnet' | 'kovan' | ContractList

// Container class instantiate most GEB contracts
// prettier-ignore
export class ContractApis {
    public accountingEngine: AccountingEngine
    public taxCollector: TaxCollector
    public liquidationEngine: LiquidationEngine
    public oracleRelayer: OracleRelayer
    public globalSettlement: GlobalSettlement
    public debtAuctionHouse: DebtAuctionHouse
    public preSettlementSurplusAuctionHouse: PreSettlementSurplusAuctionHouse
    public postSettlementSurplusAuctionHouse: PostSettlementSurplusAuctionHouse
    public settlementSurplusAuctioneer: SettlementSurplusAuctioneer
    public safeManager: GebSafeManager
    public getSafes: GetSafes
    public joinETH_A: BasicCollateralJoin
    public joinCoin: CoinJoin
    public coin: Coin
    public proxyRegistry: GebProxyRegistry
    public collateralAuctionHouseETH_A: FixedDiscountCollateralAuctionHouse | EnglishCollateralAuctionHouse
    public weth: Weth

    constructor(
        network: ContractAddresses,
        public chainProvider: ChainProviderInterface
    )
    {
        // Set the address list
        let addressList = getAddressList(network)

        this.accountingEngine = new AccountingEngine(addressList.GEB_ACCOUNTING_ENGINE, this.chainProvider)
        this.taxCollector = new TaxCollector(addressList.GEB_TAX_COLLECTOR, this.chainProvider)
        this.liquidationEngine = new LiquidationEngine(addressList.GEB_LIQUIDATION_ENGINE, this.chainProvider)
        this.oracleRelayer = new OracleRelayer(addressList.GEB_ORACLE_RELAYER, this.chainProvider)
        this.globalSettlement = new GlobalSettlement(addressList.GEB_GLOBAL_SETTLEMENT, this.chainProvider)
        this.debtAuctionHouse = new DebtAuctionHouse(addressList.GEB_DEBT_AUCTION_HOUSE, this.chainProvider)
        this.preSettlementSurplusAuctionHouse = new PreSettlementSurplusAuctionHouse(addressList.GEB_PRE_SETTLEMENT_SURPLUS_AUCTION_HOUSE, this.chainProvider)
        this.postSettlementSurplusAuctionHouse = new PostSettlementSurplusAuctionHouse(addressList.GEB_POST_SETTLEMENT_SURPLUS_AUCTION_HOUSE, this.chainProvider)
        this.settlementSurplusAuctioneer = new SettlementSurplusAuctioneer(addressList.GEB_SETTLEMENT_SURPLUS_AUCTIONEER, this.chainProvider)
        this.safeManager = new GebSafeManager(addressList.SAFE_MANAGER, this.chainProvider)
        this.getSafes = new GetSafes(addressList.GET_SAFES, this.chainProvider)
        this.joinETH_A = new BasicCollateralJoin(addressList.GEB_JOIN_ETH_A, this.chainProvider)
        this.joinCoin = new CoinJoin(addressList.GEB_COIN_JOIN, this.chainProvider)
        this.coin = new Coin(addressList.GEB_COIN, this.chainProvider)
        this.proxyRegistry = new GebProxyRegistry(addressList.PROXY_REGISTRY, this.chainProvider)
        this.collateralAuctionHouseETH_A = new FixedDiscountCollateralAuctionHouse(addressList.GEB_COLLATERAL_AUCTION_HOUSE_ETH_A, this.chainProvider)
        this.weth = new Weth(addressList.ETH, this.chainProvider)
    }
}
