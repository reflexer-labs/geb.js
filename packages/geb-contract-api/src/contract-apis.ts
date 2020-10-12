import {
    AccountingEngine,
    TaxCollector,
    LiquidationEngine,
    OracleRelayer,
    GlobalSettlement,
    DebtAuctionHouse,
    PreSettlementSurplusAuctionHouse,
    Coin,
    GebSafeManager,
    GetSafes,
    BasicCollateralJoin,
    CoinJoin,
    GebProxyRegistry,
    EnglishCollateralAuctionHouse,
    FixedDiscountCollateralAuctionHouse,
    DsToken,
    Weth9,
    SafeEngine,
    ChainlinkMedianEthusd,
    UniswapConsecutiveSlotsMedianRaiusd,
    DsValue,
    Osm,
    StabilityFeeTreasury,
} from '.'
import {
    GebProviderInterface,
    GebDeployment,
    getAddressList,
} from '@reflexer-finance/geb-contract-base'
import { RateSetter } from './generated/RateSetter'
import { PiRawPerSecondValidator } from './generated/PIRawPerSecondValidator'

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
    public stabilityFeeTreasury: StabilityFeeTreasury
    public safeManager: GebSafeManager
    public getSafes: GetSafes
    public joinETH_A: BasicCollateralJoin
    public joinCoin: CoinJoin
    public coin: Coin
    public proxyRegistry: GebProxyRegistry
    public collateralAuctionHouseETH_A: FixedDiscountCollateralAuctionHouse | EnglishCollateralAuctionHouse
    public protocolToken: DsToken
    public medianizerEth: ChainlinkMedianEthusd | DsValue
    public medianizerCoin: UniswapConsecutiveSlotsMedianRaiusd | DsValue
    public rateSetter: RateSetter
    public piValidator: PiRawPerSecondValidator
    public fsmEth: Osm | DsValue
    public fsmCoin: Osm | DsValue
    public weth: Weth9

    constructor(
        network: GebDeployment,
        public chainProvider: GebProviderInterface
    )
    {
        let addressList = getAddressList(network)

        this.safeEngine = new SafeEngine(addressList.GEB_SAFE_ENGINE, this.chainProvider)
        this.accountingEngine = new AccountingEngine(addressList.GEB_ACCOUNTING_ENGINE, this.chainProvider)
        this.taxCollector = new TaxCollector(addressList.GEB_TAX_COLLECTOR, this.chainProvider)
        this.liquidationEngine = new LiquidationEngine(addressList.GEB_LIQUIDATION_ENGINE, this.chainProvider)
        this.oracleRelayer = new OracleRelayer(addressList.GEB_ORACLE_RELAYER, this.chainProvider)
        this.globalSettlement = new GlobalSettlement(addressList.GEB_GLOBAL_SETTLEMENT, this.chainProvider)
        this.debtAuctionHouse = new DebtAuctionHouse(addressList.GEB_DEBT_AUCTION_HOUSE, this.chainProvider)
        this.preSettlementSurplusAuctionHouse = new PreSettlementSurplusAuctionHouse(addressList.GEB_PRE_SETTLEMENT_SURPLUS_AUCTION_HOUSE, this.chainProvider)
        this.stabilityFeeTreasury = new StabilityFeeTreasury(addressList.GEB_STABILITY_FEE_TREASURY, this.chainProvider)
        this.safeManager = new GebSafeManager(addressList.SAFE_MANAGER, this.chainProvider)
        this.getSafes = new GetSafes(addressList.GET_SAFES, this.chainProvider)
        this.joinETH_A = new BasicCollateralJoin(addressList.GEB_JOIN_ETH_A, this.chainProvider)
        this.joinCoin = new CoinJoin(addressList.GEB_COIN_JOIN, this.chainProvider)
        this.coin = new Coin(addressList.GEB_COIN, this.chainProvider)
        this.proxyRegistry = new GebProxyRegistry(addressList.PROXY_REGISTRY, this.chainProvider)
        this.collateralAuctionHouseETH_A = new FixedDiscountCollateralAuctionHouse(addressList.GEB_COLLATERAL_AUCTION_HOUSE_ETH_A, this.chainProvider)
        this.medianizerEth = new ChainlinkMedianEthusd(addressList.MEDIANIZER_ETH, this.chainProvider)
        this.medianizerCoin = new UniswapConsecutiveSlotsMedianRaiusd(addressList.MEDIANIZER_PRAI, this.chainProvider)
        this.rateSetter = new RateSetter(addressList.GEB_RRFM_SETTER, this.chainProvider)
        this.piValidator = new PiRawPerSecondValidator(addressList.GEB_RRFM_VALIDATOR, this.chainProvider)
        this.fsmEth = new Osm(addressList.FEED_SECURITY_MODULE_ETH, this.chainProvider)
        this.fsmCoin = new Osm(addressList.FEED_SECURITY_MODULE_PRAI, this.chainProvider)
        this.weth = new Weth9(addressList.ETH, this.chainProvider)
    }
}
