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
    SafeEngine,
} from '.'
import {
    GebProviderInterface,
    GebDeployment,
    getAddressList,
} from '@reflexer-finance/geb-contract-base'

// Container class instantiate most GEB contracts
// prettier-ignore
export class ContractApis {
    public safeEngine: SafeEngine
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
        network: GebDeployment,
        public chainProvider: GebProviderInterface
    )
    {
        // Set the address list
        let addressList = getAddressList(network)

        this.safeEngine = new SafeEngine(addressList.GEB_SAFE_ENGINE, this.chainProvider)
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
