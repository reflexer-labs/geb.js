import {
    AccountingEngine,
    TaxCollector,
    LiquidationEngine,
    OracleRelayer,
    GlobalSettlement,
    DebtAuctionHouse,
    Coin,
    GebSafeManager,
    GetSafes,
    BasicCollateralJoin,
    CoinJoin,
    GebProxyRegistry,
    FixedDiscountCollateralAuctionHouse,
    Weth9,
    SafeEngine,
    ChainlinkRelayer,
    UniswapConsecutiveSlotsMedianRaiusd,
    Osm,
    StabilityFeeTreasury,
    DsDelegateToken,
    StakingRewardsFactory,
    UniswapV2Pair,
    BurningSurplusAuctionHouse,
    UniswapLiquidityManagerLike,
    NativeUnderlyingUniswapSafeSaviour,
    SaviourCRatioSetter,
    UniswapV3Pool,
    GebUniswapV3TwoTrancheManager,
    GebLenderFirstResort,
    StakedTokenAuctionHouse,
    DsDelegateTokenNoTransfer,
    StakingRewardsEscrow,
} from '.'
import {
    GebProviderInterface,
    GebDeployment,
    getAddressList,
} from '@reflexer-finance/geb-contract-base'
import { PiRateSetter } from './generated/PIRateSetter'
import { PRawPerSecondCalculator } from './generated/PRawPerSecondCalculator'
import { MerkleDistributorFactory } from './generated/MerkleDistributorFactory'
import { Erc20 } from './generated/ERC20'

// Container class used to instantiate most GEB contracts
// prettier-ignore
export class ContractApis {
    public safeEngine: SafeEngine
    public accountingEngine: AccountingEngine
    public taxCollector: TaxCollector
    public liquidationEngine: LiquidationEngine
    public oracleRelayer: OracleRelayer
    public globalSettlement: GlobalSettlement
    public debtAuctionHouse: DebtAuctionHouse
    public surplusAuctionHouse: BurningSurplusAuctionHouse
    public stabilityFeeTreasury: StabilityFeeTreasury
    public safeManager: GebSafeManager
    public getSafes: GetSafes
    public joinETH_A: BasicCollateralJoin
    public joinCoin: CoinJoin
    public coin: Coin
    public proxyRegistry: GebProxyRegistry
    public collateralAuctionHouseETH_A: FixedDiscountCollateralAuctionHouse
    public protocolToken: DsDelegateToken
    public medianizerEth: ChainlinkRelayer
    public medianizerCoin: UniswapConsecutiveSlotsMedianRaiusd
    public rateSetter: PiRateSetter
    public piCalculator: PRawPerSecondCalculator
    public fsmEth: Osm
    public weth: Weth9
    public stakingRewardFactory: StakingRewardsFactory
    public uniswapPairCoinEth: UniswapV2Pair
    public merkleDistributorFactory: MerkleDistributorFactory
    public coinNativeUniswapSaviour: NativeUnderlyingUniswapSafeSaviour
    public saviourCRatioSetter: SaviourCRatioSetter
    public saviourUniswapLiquidityManager: UniswapLiquidityManagerLike
    public uniswapV3PairCoinEth: UniswapV3Pool
    public uniswapV3TwoTrancheLiquidityManager: GebUniswapV3TwoTrancheManager
    public stakingFirstResort: GebLenderFirstResort
    public stakingAuctionHouse: StakedTokenAuctionHouse
    public stakingToken: Erc20
    public stakedProt: DsDelegateTokenNoTransfer
    public stakingEscrow: StakingRewardsEscrow

    constructor(
        network: GebDeployment,
        public chainProvider: GebProviderInterface
    )
    {
        // Set the contract address list
        let addressList = getAddressList(network)

        this.safeEngine = new SafeEngine(addressList.GEB_SAFE_ENGINE, this.chainProvider)
        this.accountingEngine = new AccountingEngine(addressList.GEB_ACCOUNTING_ENGINE, this.chainProvider)
        this.taxCollector = new TaxCollector(addressList.GEB_TAX_COLLECTOR, this.chainProvider)
        this.liquidationEngine = new LiquidationEngine(addressList.GEB_LIQUIDATION_ENGINE, this.chainProvider)
        this.oracleRelayer = new OracleRelayer(addressList.GEB_ORACLE_RELAYER, this.chainProvider)
        this.globalSettlement = new GlobalSettlement(addressList.GEB_GLOBAL_SETTLEMENT, this.chainProvider)
        this.debtAuctionHouse = new DebtAuctionHouse(addressList.GEB_DEBT_AUCTION_HOUSE, this.chainProvider)
        this.surplusAuctionHouse = new BurningSurplusAuctionHouse(addressList.GEB_SURPLUS_AUCTION_HOUSE, this.chainProvider)
        this.stabilityFeeTreasury = new StabilityFeeTreasury(addressList.GEB_STABILITY_FEE_TREASURY, this.chainProvider)
        this.safeManager = new GebSafeManager(addressList.SAFE_MANAGER, this.chainProvider)
        this.getSafes = new GetSafes(addressList.GET_SAFES, this.chainProvider)
        this.joinETH_A = new BasicCollateralJoin(addressList.GEB_JOIN_ETH_A, this.chainProvider)
        this.joinCoin = new CoinJoin(addressList.GEB_COIN_JOIN, this.chainProvider)
        this.coin = new Coin(addressList.GEB_COIN, this.chainProvider)
        this.proxyRegistry = new GebProxyRegistry(addressList.PROXY_REGISTRY, this.chainProvider)
        this.collateralAuctionHouseETH_A = new FixedDiscountCollateralAuctionHouse(addressList.GEB_COLLATERAL_AUCTION_HOUSE_ETH_A, this.chainProvider)
        this.medianizerEth = new ChainlinkRelayer(addressList.MEDIANIZER_ETH, this.chainProvider)
        this.medianizerCoin = new UniswapConsecutiveSlotsMedianRaiusd(addressList.MEDIANIZER_RAI, this.chainProvider)
        this.rateSetter = new PiRateSetter(addressList.GEB_RRFM_SETTER, this.chainProvider)
        this.piCalculator = new PRawPerSecondCalculator(addressList.GEB_RRFM_CALCULATOR, this.chainProvider)
        this.fsmEth = new Osm(addressList.FEED_SECURITY_MODULE_ETH, this.chainProvider)
        this.weth = new Weth9(addressList.ETH, this.chainProvider)
        this.protocolToken = new DsDelegateToken(addressList.GEB_PROT, this.chainProvider)
        this.stakingRewardFactory = new StakingRewardsFactory(addressList.GEB_INCENTIVES_MINER, this.chainProvider)
        this.uniswapPairCoinEth = new UniswapV2Pair(addressList.GEB_COIN_UNISWAP_POOL, this.chainProvider)
        this.merkleDistributorFactory = new MerkleDistributorFactory(addressList.MERKLE_DISTRIBUTOR_FACTORY, this.chainProvider)
        this.coinNativeUniswapSaviour = new NativeUnderlyingUniswapSafeSaviour(addressList.GEB_COIN_ETH_UNISWAP_V2_POOL_SAVIOUR, this.chainProvider)
        this.saviourCRatioSetter = new SaviourCRatioSetter(addressList.GEB_SAVIOUR_CRATIO_SETTER, this.chainProvider)
        this.saviourUniswapLiquidityManager = new UniswapLiquidityManagerLike(addressList.GEB_UNISWAP_SAVIOUR_LIQUIDITY_MANAGER, this.chainProvider)
        this.uniswapV3PairCoinEth = new UniswapV3Pool(addressList.GEB_COIN_UNISWAP_V3_POOL, this.chainProvider)
        this.uniswapV3TwoTrancheLiquidityManager = new GebUniswapV3TwoTrancheManager(addressList.GEB_UNISWAP_TWO_TRANCHE_MANAGER, this.chainProvider)
        this.stakingFirstResort = new GebLenderFirstResort(addressList.GEB_STAKING, this.chainProvider)
        this.stakingAuctionHouse = new StakedTokenAuctionHouse(addressList.GEB_STAKING_AUCTION_HOUSE, this.chainProvider)
        this.stakingToken = new Erc20(addressList.GEB_STAKING_TOKEN, this.chainProvider)
        this.stakedProt = new DsDelegateTokenNoTransfer(addressList.GEB_STAKED_PROT, this.chainProvider)
        this.stakingEscrow = new StakingRewardsEscrow(addressList.GEB_STAKING_REWARDS_ESCROW, this.chainProvider)
    }
}
