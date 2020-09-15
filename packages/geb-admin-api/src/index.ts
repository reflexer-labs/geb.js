import { AccountingEngine } from './generated/AccountingEngine'
import { AccountingEngineFactory } from './generated/AccountingEngineFactory'
import { AggregatorInterface } from './generated/AggregatorInterface'
import { AuthCollateralJoin } from './generated/AuthCollateralJoin'
import { AuthorizableContract } from './generated/AuthorizableContract'
import { BasicCollateralJoin } from './generated/BasicCollateralJoin'
import { BurntToken } from './generated/BurntToken'
import { ChainlinkMedianEthusd } from './generated/ChainlinkMedianETHUSD'
import { ChainlinkMedianFlxusd } from './generated/ChainlinkMedianFLXUSD'
import { ChainlinkMedianRaiusd } from './generated/ChainlinkMedianRAIUSD'
import { ChainlinkPriceFeedMedianizer } from './generated/ChainlinkPriceFeedMedianizer'
import { Coin } from './generated/Coin'
import { CoinFactory } from './generated/CoinFactory'
import { CoinJoin } from './generated/CoinJoin'
import { CoinJoinFactory } from './generated/CoinJoinFactory'
import { CoinSavingsAccount } from './generated/CoinSavingsAccount'
import { CoinSavingsAccountFactory } from './generated/CoinSavingsAccountFactory'
import { CollateralAuctionHouse } from './generated/CollateralAuctionHouse'
import { CollateralJoin1 } from './generated/CollateralJoin1'
import { CollateralJoin2 } from './generated/CollateralJoin2'
import { CollateralJoin3 } from './generated/CollateralJoin3'
import { CollateralJoin4 } from './generated/CollateralJoin4'
import { CollateralJoin5 } from './generated/CollateralJoin5'
import { CollateralJoin6 } from './generated/CollateralJoin6'
import { CollateralLike2 } from './generated/CollateralLike2'
import { CollateralLike3 } from './generated/CollateralLike3'
import { CollateralLike4 } from './generated/CollateralLike4'
import { CollateralLike5 } from './generated/CollateralLike5'
import { Common } from './generated/Common'
import { Dgd } from './generated/DGD'
import { DsAuth } from './generated/DSAuth'
import { DsAuthEvents } from './generated/DSAuthEvents'
import { DsAuthority } from './generated/DSAuthority'
import { DsCompare } from './generated/DSCompare'
import { DsGuard } from './generated/DSGuard'
import { DsGuardEvents } from './generated/DSGuardEvents'
import { DsGuardFactory } from './generated/DSGuardFactory'
import { DsPause } from './generated/DSPause'
import { DsPauseProxy } from './generated/DSPauseProxy'
import { DsProxy } from './generated/DSProxy'
import { DsProxyCache } from './generated/DSProxyCache'
import { DsProxyFactory } from './generated/DSProxyFactory'
import { DsRecursiveRoles } from './generated/DSRecursiveRoles'
import { DsRoles } from './generated/DSRoles'
import { DsStop } from './generated/DSStop'
import { DsThing } from './generated/DSThing'
import { DsToken } from './generated/DSToken'
import { DsTokenBase } from './generated/DSTokenBase'
import { DsValue } from './generated/DSValue'
import { DebtAuctionHouse } from './generated/DebtAuctionHouse'
import { DebtAuctionHouseFactory } from './generated/DebtAuctionHouseFactory'
import { Erc20 } from './generated/ERC20'
import { Erc20Events } from './generated/ERC20Events'
import { Esm } from './generated/ESM'
import { EsmFactory } from './generated/ESMFactory'
import { EsmThresholdSetter } from './generated/ESMThresholdSetter'
import { EthJoin } from './generated/ETHJoin'
import { EnglishCollateralAuctionHouse } from './generated/EnglishCollateralAuctionHouse'
import { EnglishCollateralAuctionHouseFactory } from './generated/EnglishCollateralAuctionHouseFactory'
import { FaucetUser } from './generated/FaucetUser'
import { FixedDiscountCollateralAuctionHouse } from './generated/FixedDiscountCollateralAuctionHouse'
import { FixedDiscountCollateralAuctionHouseFactory } from './generated/FixedDiscountCollateralAuctionHouseFactory'
import { FsmGovernanceInterface } from './generated/FsmGovernanceInterface'
import { FsmGovernanceInterfaceCaller } from './generated/FsmGovernanceInterfaceCaller'
import { Gnt } from './generated/GNT'
import { GebDeploy } from './generated/GebDeploy'
import { GebDeployPauseProxyActions } from './generated/GebDeployPauseProxyActions'
import { GebDeployTestBase } from './generated/GebDeployTestBase'
import { GebPollingEmitter } from './generated/GebPollingEmitter'
import { GebPollingEvents } from './generated/GebPollingEvents'
import { GebPrintingPermissions } from './generated/GebPrintingPermissions'
import { GebProxyActions } from './generated/GebProxyActions'
import { GebProxyActionsCoinSavingsAccount } from './generated/GebProxyActionsCoinSavingsAccount'
import { GebProxyActionsGlobalSettlement } from './generated/GebProxyActionsGlobalSettlement'
import { GebProxyRegistry } from './generated/GebProxyRegistry'
import { GebSafeManager } from './generated/GebSafeManager'
import { GemBag } from './generated/GemBag'
import { GetSafes } from './generated/GetSafes'
import { GlobalSettlement } from './generated/GlobalSettlement'
import { GlobalSettlementFactory } from './generated/GlobalSettlementFactory'
import { GovActions } from './generated/GovActions'
import { GovernanceLedMedianEthusd } from './generated/GovernanceLedMedianETHUSD'
import { GovernanceLedMedianFlxusd } from './generated/GovernanceLedMedianFLXUSD'
import { GovernanceLedMedianRaiusd } from './generated/GovernanceLedMedianRAIUSD'
import { GovernanceLedPriceFeedMedianizer } from './generated/GovernanceLedPriceFeedMedianizer'
import { IUniswapV2Factory } from './generated/IUniswapV2Factory'
import { IUniswapV2Pair } from './generated/IUniswapV2Pair'
import { LiquidationEngine } from './generated/LiquidationEngine'
import { LiquidationEngineFactory } from './generated/LiquidationEngineFactory'
import { LiquidationEngineMock } from './generated/LiquidationEngineMock'
import { Logging } from './generated/Logging'
import { MockDebtAuctionHouse } from './generated/MockDebtAuctionHouse'
import { MockSurplusAuctionHouse } from './generated/MockSurplusAuctionHouse'
import { MultiSigWallet } from './generated/MultiSigWallet'
import { Multicall } from './generated/Multicall'
import { NotThrowingToken } from './generated/NotThrowingToken'
import { Osm } from './generated/OSM'
import { OracleRelayer } from './generated/OracleRelayer'
import { OracleRelayerFactory } from './generated/OracleRelayerFactory'
import { PauseFactory } from './generated/PauseFactory'
import { PostSettlementSurplusAuctionHouse } from './generated/PostSettlementSurplusAuctionHouse'
import { PostSettlementSurplusAuctionHouseFactory } from './generated/PostSettlementSurplusAuctionHouseFactory'
import { PreSettlementSurplusAuctionHouse } from './generated/PreSettlementSurplusAuctionHouse'
import { PreSettlementSurplusAuctionHouseFactory } from './generated/PreSettlementSurplusAuctionHouseFactory'
import { ProtocolTokenAuthority } from './generated/ProtocolTokenAuthority'
import { ProxyActions } from './generated/ProxyActions'
import { ProxyCalls } from './generated/ProxyCalls'
import { RestrictedTokenFaucet } from './generated/RestrictedTokenFaucet'
import { SafeEngine } from './generated/SAFEEngine'
import { SafeEngineFactory } from './generated/SAFEEngineFactory'
import { SafeHandler } from './generated/SAFEHandler'
import { Setter } from './generated/Setter'
import { SettlementSurplusAuctioneer } from './generated/SettlementSurplusAuctioneer'
import { SettlementSurplusAuctioneerFactory } from './generated/SettlementSurplusAuctioneerFactory'
import { SimpleAuthority } from './generated/SimpleAuthority'
import { StabilityFeeTreasury } from './generated/StabilityFeeTreasury'
import { StabilityFeeTreasuryFactory } from './generated/StabilityFeeTreasuryFactory'
import { Store } from './generated/Store'
import { TaxCollector } from './generated/TaxCollector'
import { TaxCollectorFactory } from './generated/TaxCollectorFactory'
import { TestAccountingEngine } from './generated/TestAccountingEngine'
import { TestDebtAuctionHouse } from './generated/TestDebtAuctionHouse'
import { Tester } from './generated/Tester'
import { TokenBurner } from './generated/TokenBurner'
import { TokenFaucet } from './generated/TokenFaucet'
import { TxManager } from './generated/TxManager'
import { UniswapMedianFlxusd } from './generated/UniswapMedianFLXUSD'
import { UniswapMedianRaiusd } from './generated/UniswapMedianRAIUSD'
import { UniswapPriceFeedMedianizer } from './generated/UniswapPriceFeedMedianizer'
import { Weth9 } from './generated/WETH9_'
import { Authed } from './generated/authed'
import { AdminApis } from './admin-apis'

export {
    // Object with all instances
    AdminApis,
    // Individual contracts
    AccountingEngine,
    AccountingEngineFactory,
    AggregatorInterface,
    AuthCollateralJoin,
    AuthorizableContract,
    BasicCollateralJoin,
    BurntToken,
    ChainlinkMedianEthusd,
    ChainlinkMedianFlxusd,
    ChainlinkMedianRaiusd,
    ChainlinkPriceFeedMedianizer,
    Coin,
    CoinFactory,
    CoinJoin,
    CoinJoinFactory,
    CoinSavingsAccount,
    CoinSavingsAccountFactory,
    CollateralAuctionHouse,
    CollateralJoin1,
    CollateralJoin2,
    CollateralJoin3,
    CollateralJoin4,
    CollateralJoin5,
    CollateralJoin6,
    CollateralLike2,
    CollateralLike3,
    CollateralLike4,
    CollateralLike5,
    Common,
    Dgd,
    DsAuth,
    DsAuthEvents,
    DsAuthority,
    DsCompare,
    DsGuard,
    DsGuardEvents,
    DsGuardFactory,
    DsPause,
    DsPauseProxy,
    DsProxy,
    DsProxyCache,
    DsProxyFactory,
    DsRecursiveRoles,
    DsRoles,
    DsStop,
    DsThing,
    DsToken,
    DsTokenBase,
    DsValue,
    DebtAuctionHouse,
    DebtAuctionHouseFactory,
    Erc20,
    Erc20Events,
    Esm,
    EsmFactory,
    EsmThresholdSetter,
    EthJoin,
    EnglishCollateralAuctionHouse,
    EnglishCollateralAuctionHouseFactory,
    FaucetUser,
    FixedDiscountCollateralAuctionHouse,
    FixedDiscountCollateralAuctionHouseFactory,
    FsmGovernanceInterface,
    FsmGovernanceInterfaceCaller,
    Gnt,
    GebDeploy,
    GebDeployPauseProxyActions,
    GebDeployTestBase,
    GebPollingEmitter,
    GebPollingEvents,
    GebPrintingPermissions,
    GebProxyActions,
    GebProxyActionsCoinSavingsAccount,
    GebProxyActionsGlobalSettlement,
    GebProxyRegistry,
    GebSafeManager,
    GemBag,
    GetSafes,
    GlobalSettlement,
    GlobalSettlementFactory,
    GovActions,
    GovernanceLedMedianEthusd,
    GovernanceLedMedianFlxusd,
    GovernanceLedMedianRaiusd,
    GovernanceLedPriceFeedMedianizer,
    IUniswapV2Factory,
    IUniswapV2Pair,
    LiquidationEngine,
    LiquidationEngineFactory,
    LiquidationEngineMock,
    Logging,
    MockDebtAuctionHouse,
    MockSurplusAuctionHouse,
    MultiSigWallet,
    Multicall,
    NotThrowingToken,
    Osm,
    OracleRelayer,
    OracleRelayerFactory,
    PauseFactory,
    PostSettlementSurplusAuctionHouse,
    PostSettlementSurplusAuctionHouseFactory,
    PreSettlementSurplusAuctionHouse,
    PreSettlementSurplusAuctionHouseFactory,
    ProtocolTokenAuthority,
    ProxyActions,
    ProxyCalls,
    RestrictedTokenFaucet,
    SafeEngine,
    SafeEngineFactory,
    SafeHandler,
    Setter,
    SettlementSurplusAuctioneer,
    SettlementSurplusAuctioneerFactory,
    SimpleAuthority,
    StabilityFeeTreasury,
    StabilityFeeTreasuryFactory,
    Store,
    TaxCollector,
    TaxCollectorFactory,
    TestAccountingEngine,
    TestDebtAuctionHouse,
    Tester,
    TokenBurner,
    TokenFaucet,
    TxManager,
    UniswapMedianFlxusd,
    UniswapMedianRaiusd,
    UniswapPriceFeedMedianizer,
    Weth9,
    Authed,
}
