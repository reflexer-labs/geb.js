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
    Weth9,
    SafeEngine,
    MultiSigWallet,
    DsProxy,
    GebDeploy,
    DsToken,
    ProtocolTokenAuthority,
    GebPollingEmitter,
    DsRecursiveRoles,
    GebPrintingPermissions,
    DsPause,
    DsPauseProxy,
    GovActions,
    Esm,
    TokenBurner,
    ProxyActions,
    GebProxyActionsGlobalSettlement,
    FsmGovernanceInterface,
    DsProxyFactory,
    ChainlinkMedianEthusd,
    Osm,
    GebDeployPauseProxyActions,
    TxManager,
} from '.'
import {
    GebProviderInterface,
    GebDeployment,
    getAddressList,
} from '@reflexer-finance/geb-contract-base'

// Container class instantiate all GEB contracts
// prettier-ignore
export class AdminApis {
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
    public weth: Weth9
    public multisigAdmin: MultiSigWallet
    public multisigAdminProxy: DsProxy
    public deploy : GebDeploy
    public flx: DsToken
    public flxAuthority: ProtocolTokenAuthority
    public pollingEmitter: GebPollingEmitter
    public printingPermissionRegistry: GebPrintingPermissions
    public pauseAuthority: DsRecursiveRoles
    public pause: DsPause
    public pauseProxy: DsPauseProxy
    public govActions: GovActions
    public rai: Coin
    public esm: Esm
    public esmBurner: TokenBurner
    public proxyActions: ProxyActions
    public proxyActionsGlobalSettlement: GebProxyActionsGlobalSettlement
    public fsmGovInterface: FsmGovernanceInterface
    public proxyFactory: DsProxyFactory
    public medianizerEth: ChainlinkMedianEthusd
    public osm: Osm
    public pauseProxyAction: GebDeployPauseProxyActions
    public proxyDeployer: DsProxy
    public txManager: TxManager
    

    constructor(
        network: GebDeployment,
        public chainProvider: GebProviderInterface
    )
    {
        // Set the address list
        let addressList = getAddressList(network)

        // Instances included in contract-api
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
        this.weth = new Weth9(addressList.ETH, this.chainProvider)

        // Additional instances only in admin package
        this.multisigAdmin = new MultiSigWallet(addressList.GEB_MULTISIG, this.chainProvider)
        this.multisigAdminProxy = new DsProxy(addressList.GEB_MULTISIG_PROXY, this.chainProvider)
        this.deploy = new GebDeploy(addressList.GEB_DEPLOY, this.chainProvider)
        this.flx = new DsToken(addressList.GEB_PROT, this.chainProvider)
        this.flxAuthority = new ProtocolTokenAuthority(addressList.PROTOCOL_TOKEN_AUTHORITY, this.chainProvider)
        this.pollingEmitter = new GebPollingEmitter(addressList.GEB_POLLING_EMITTER, this.chainProvider)
        this.pauseAuthority = new DsRecursiveRoles(addressList.GEB_PAUSE_AUTHORITY, this.chainProvider)
        this.printingPermissionRegistry = new GebPrintingPermissions(addressList.PRINTING_PERMISSIONS_REGISTRY, this.chainProvider)
        this.pause = new DsPause(addressList.GEB_PAUSE, this.chainProvider)
        this.pauseProxy = new DsPauseProxy(addressList.GEB_PAUSE_PROXY, this.chainProvider)
        this.govActions = new GovActions(addressList.GEB_GOV_ACTIONS, this.chainProvider)
        this.rai = new Coin(addressList.GEB_COIN, this.chainProvider)
        this.esm = new Esm(addressList.GEB_ESM, this.chainProvider)
        this.esmBurner = new TokenBurner(addressList.GEB_ESM_TOKEN_BURNER, this.chainProvider)
        this.proxyActions = new ProxyActions(addressList.PROXY_ACTIONS, this.chainProvider)
        this.proxyActionsGlobalSettlement = new GebProxyActionsGlobalSettlement(addressList.PROXY_ACTIONS_GLOBAL_SETTLEMENT, this.chainProvider)
        this.fsmGovInterface = new FsmGovernanceInterface(addressList.FSM_GOV_INTERFACE, this.chainProvider)
        this.proxyFactory = new DsProxyFactory(addressList.PROXY_FACTORY, this.chainProvider)
        this.medianizerEth = new ChainlinkMedianEthusd(addressList.MEDIANIZER_ETH, this.chainProvider)
        this.osm = new Osm(addressList.ORACLE_SECURITY_MODULE_ETH, this.chainProvider)
        this.pauseProxyAction = new GebDeployPauseProxyActions(addressList.PROXY_PAUSE_ACTIONS, this.chainProvider)
        this.proxyDeployer = new DsProxy(addressList.PROXY_DEPLOYER, this.chainProvider)
        this.txManager = new TxManager(addressList.GEB_TX_MANAGER, this.chainProvider)
    }
}
