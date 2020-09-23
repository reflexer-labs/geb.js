import { AccountingEngineFactory } from './generated/AccountingEngineFactory'
import { AggregatorInterface } from './generated/AggregatorInterface'
import { AuthCollateralJoin } from './generated/AuthCollateralJoin'
import { AuthorizableContract } from './generated/AuthorizableContract'
import { BurntToken } from './generated/BurntToken'
import { ChainlinkMedianFlxusd } from './generated/ChainlinkMedianFLXUSD'
import { ChainlinkMedianRaiusd } from './generated/ChainlinkMedianRAIUSD'
import { ChainlinkPriceFeedMedianizer } from './generated/ChainlinkPriceFeedMedianizer'
import { CoinFactory } from './generated/CoinFactory'
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
import { DsAuth } from './generated/DSAuth'
import { DsAuthEvents } from './generated/DSAuthEvents'
import { DsAuthority } from './generated/DSAuthority'
import { DsCompare } from './generated/DSCompare'
import { DsGuard } from './generated/DSGuard'
import { DsGuardEvents } from './generated/DSGuardEvents'
import { DsGuardFactory } from './generated/DSGuardFactory'
import { DsPause } from './generated/DSPause'
import { DsPauseProxy } from './generated/DSPauseProxy'
import { DsProxyCache } from './generated/DSProxyCache'
import { DsProxyFactory } from './generated/DSProxyFactory'
import { DsRoles } from './generated/DSRoles'
import { DsStop } from './generated/DSStop'
import { DsThing } from './generated/DSThing'
import { DsTokenBase } from './generated/DSTokenBase'
import { DebtAuctionHouseFactory } from './generated/DebtAuctionHouseFactory'
import { Erc20Events } from './generated/ERC20Events'
import { Esm } from './generated/ESM'
import { EsmFactory } from './generated/ESMFactory'
import { EsmThresholdSetter } from './generated/ESMThresholdSetter'
import { EthJoin } from './generated/ETHJoin'
import { EnglishCollateralAuctionHouseFactory } from './generated/EnglishCollateralAuctionHouseFactory'
import { FaucetUser } from './generated/FaucetUser'
import { FixedDiscountCollateralAuctionHouseFactory } from './generated/FixedDiscountCollateralAuctionHouseFactory'
import { FsmGovernanceInterface } from './generated/FsmGovernanceInterface'
import { FsmGovernanceInterfaceCaller } from './generated/FsmGovernanceInterfaceCaller'
import { GebDeploy } from './generated/GebDeploy'
import { GebDeployPauseProxyActions } from './generated/GebDeployPauseProxyActions'
import { GebPollingEmitter } from './generated/GebPollingEmitter'
import { GebPollingEvents } from './generated/GebPollingEvents'
import { GebPrintingPermissions } from './generated/GebPrintingPermissions'
import { GemBag } from './generated/GemBag'
import { GlobalSettlementFactory } from './generated/GlobalSettlementFactory'
import { GovActions } from './generated/GovActions'
import { GovernanceLedMedianEthusd } from './generated/GovernanceLedMedianETHUSD'
import { GovernanceLedMedianFlxusd } from './generated/GovernanceLedMedianFLXUSD'
import { GovernanceLedMedianRaiusd } from './generated/GovernanceLedMedianRAIUSD'
import { GovernanceLedPriceFeedMedianizer } from './generated/GovernanceLedPriceFeedMedianizer'
import { IUniswapV2Factory } from './generated/IUniswapV2Factory'
import { IUniswapV2Pair } from './generated/IUniswapV2Pair'
import { LiquidationEngineFactory } from './generated/LiquidationEngineFactory'
import { LiquidationEngineMock } from './generated/LiquidationEngineMock'
import { Logging } from './generated/Logging'
import { MockDebtAuctionHouse } from './generated/MockDebtAuctionHouse'
import { MockSurplusAuctionHouse } from './generated/MockSurplusAuctionHouse'
import { NotThrowingToken } from './generated/NotThrowingToken'
import { OracleRelayerFactory } from './generated/OracleRelayerFactory'
import { PauseFactory } from './generated/PauseFactory'
import { PostSettlementSurplusAuctionHouseFactory } from './generated/PostSettlementSurplusAuctionHouseFactory'
import { PreSettlementSurplusAuctionHouseFactory } from './generated/PreSettlementSurplusAuctionHouseFactory'
import { ProtocolTokenAuthority } from './generated/ProtocolTokenAuthority'
import { RestrictedTokenFaucet } from './generated/RestrictedTokenFaucet'
import { SafeEngineFactory } from './generated/SAFEEngineFactory'
import { SafeHandler } from './generated/SAFEHandler'
import { Setter } from './generated/Setter'
import { SettlementSurplusAuctioneerFactory } from './generated/SettlementSurplusAuctioneerFactory'
import { SimpleAuthority } from './generated/SimpleAuthority'
import { StabilityFeeTreasuryFactory } from './generated/StabilityFeeTreasuryFactory'
import { Store } from './generated/Store'
import { TestAccountingEngine } from './generated/TestAccountingEngine'
import { TestDebtAuctionHouse } from './generated/TestDebtAuctionHouse'
import { Tester } from './generated/Tester'
import { TokenBurner } from './generated/TokenBurner'
import { TokenFaucet } from './generated/TokenFaucet'
import { TxManager } from './generated/TxManager'
import { UniswapMedianFlxusd } from './generated/UniswapMedianFLXUSD'
import { UniswapMedianRaiusd } from './generated/UniswapMedianRAIUSD'
import { UniswapPriceFeedMedianizer } from './generated/UniswapPriceFeedMedianizer'
import { Authed } from './generated/authed'
import { AdminApis } from './admin-apis'
import { DsProtestPause } from './generated/DSProtestPause'
import { GovProtester } from './generated/GovProtester'
import { DsDelegateRoles } from './generated/DSDelegateRoles'
import { ProtestPauseFactory } from './generated/ProtestPauseFactory'
import { GnosisSafe } from './generated/GnosisSafe'
import { GnosisSafeProxy } from './generated/GnosisSafeProxy'

export {
    // Object with all instances
    AdminApis,
    // Individual contracts
    AccountingEngineFactory,
    AggregatorInterface,
    AuthCollateralJoin,
    AuthorizableContract,
    BurntToken,
    ChainlinkMedianFlxusd,
    ChainlinkMedianRaiusd,
    ChainlinkPriceFeedMedianizer,
    CoinFactory,
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
    DsAuth,
    DsAuthEvents,
    DsAuthority,
    DsCompare,
    DsGuard,
    DsGuardEvents,
    DsGuardFactory,
    DsPause,
    DsPauseProxy,
    DsProxyCache,
    DsProxyFactory,
    DsRoles,
    DsStop,
    DsThing,
    DsTokenBase,
    DebtAuctionHouseFactory,
    Erc20Events,
    Esm,
    EsmFactory,
    EsmThresholdSetter,
    EthJoin,
    EnglishCollateralAuctionHouseFactory,
    FaucetUser,
    FixedDiscountCollateralAuctionHouseFactory,
    FsmGovernanceInterface,
    FsmGovernanceInterfaceCaller,
    GebDeploy,
    GebDeployPauseProxyActions,
    GebPollingEmitter,
    GebPollingEvents,
    GebPrintingPermissions,
    GemBag,
    GlobalSettlementFactory,
    GovActions,
    GovernanceLedMedianEthusd,
    GovernanceLedMedianFlxusd,
    GovernanceLedMedianRaiusd,
    GovernanceLedPriceFeedMedianizer,
    IUniswapV2Factory,
    IUniswapV2Pair,
    LiquidationEngineFactory,
    LiquidationEngineMock,
    Logging,
    MockDebtAuctionHouse,
    MockSurplusAuctionHouse,
    NotThrowingToken,
    OracleRelayerFactory,
    PauseFactory,
    PostSettlementSurplusAuctionHouseFactory,
    PreSettlementSurplusAuctionHouseFactory,
    ProtocolTokenAuthority,
    RestrictedTokenFaucet,
    SafeEngineFactory,
    SafeHandler,
    Setter,
    SettlementSurplusAuctioneerFactory,
    SimpleAuthority,
    StabilityFeeTreasuryFactory,
    Store,
    TestAccountingEngine,
    TestDebtAuctionHouse,
    Tester,
    TokenBurner,
    TokenFaucet,
    TxManager,
    UniswapMedianFlxusd,
    UniswapMedianRaiusd,
    UniswapPriceFeedMedianizer,
    Authed,
    DsDelegateRoles,
    DsProtestPause,
    GovProtester,
    ProtestPauseFactory,
    GnosisSafeProxy,
    GnosisSafe,
}
