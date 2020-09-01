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

export type ContractKey =
    | 'GEB_ACCOUNTING_ENGINE'
    | 'GEB_SAFE_ENGINE'
    | 'GEB_TAX_COLLECTOR'
    | 'GEB_LIQUIDATION_ENGINE'
    | 'GEB_ORACLE_RELAYER'
    | 'GEB_GLOBAL_SETTLEMENT'
    | 'GEB_COLLATERAL_AUCTION_HOUSE_ETH_A'
    | 'GEB_DEBT_AUCTION_HOUSE'
    | 'GEB_PRE_SETTLEMENT_SURPLUS_AUCTION_HOUSE'
    | 'GEB_POST_SETTLEMENT_SURPLUS_AUCTION_HOUSE'
    | 'GEB_SETTLEMENT_SURPLUS_AUCTIONEER'
    | 'SAFE_MANAGER'
    | 'GET_SAFES'
    | 'GEB_JOIN_ETH_A'
    | 'GEB_COIN_JOIN'
    | 'GEB_COIN'
    | 'ETH'
    | 'PROXY_REGISTRY'

export type ContractList = {
    [key in ContractKey]: string
}

export declare type ContractAddresses = 'mainnet' | 'kovan' | ContractList

// Container class instantiate most GEB contracts
// prettier-ignore
export class ContractApis<TX_OBJ> {
    public accountingEngine: AccountingEngine<TX_OBJ>
    public taxCollector: TaxCollector<TX_OBJ>
    public liquidationEngine: LiquidationEngine<TX_OBJ>
    public oracleRelayer: OracleRelayer<TX_OBJ>
    public globalSettlement: GlobalSettlement<TX_OBJ>
    public debtAuctionHouse: DebtAuctionHouse<TX_OBJ>
    public preSettlementSurplusAuctionHouse: PreSettlementSurplusAuctionHouse<TX_OBJ>
    public postSettlementSurplusAuctionHouse: PostSettlementSurplusAuctionHouse<TX_OBJ>
    public settlementSurplusAuctioneer: SettlementSurplusAuctioneer<TX_OBJ>
    public safeManager: GebSafeManager<TX_OBJ>
    public getSafes: GetSafes<TX_OBJ>
    public joinETH_A: BasicCollateralJoin<TX_OBJ>
    public joinCoin: CoinJoin<TX_OBJ>
    public coin: Coin<TX_OBJ>
    public proxyRegistry: GebProxyRegistry<TX_OBJ>
    public collateralAuctionHouseETH_A: FixedDiscountCollateralAuctionHouse<TX_OBJ> | EnglishCollateralAuctionHouse<TX_OBJ>
    public weth: Weth<TX_OBJ>

    constructor(
        network: ContractAddresses,
        public chainProvider: ChainProviderInterface<TX_OBJ>
    )
    {
        // Set the address list
        let addressList: ContractList
        if (network === 'kovan') {
            addressList = KOVAN_ADDRESSES
        } else if (network === 'mainnet') {
            addressList = MAINNET_ADDRESSES
        } else {
            addressList = network
        }

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
