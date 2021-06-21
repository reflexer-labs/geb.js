import {
    GebDeploy,
    ProtocolTokenAuthority,
    DsDelegateRoles,
    DsPauseProxy,
    GovActions,
    Esm,
    FsmGovernanceInterface,
    GebDeployPauseProxyActions,
    DsProtestPause,
    GnosisSafe,
    SingleSpotDebtCeilingSetter,
    CollateralAuctionThrottler,
    FsmWrapper,
    EsmThresholdSetter,
    SingleDebtFloorAdjuster,
} from '.'
import {
    GebProviderInterface,
    GebDeployment,
    getAddressList,
} from '@reflexer-finance/geb-contract-base'

import { DsProxy } from '@reflexer-finance/geb-contract-api'

// Container class instantiate all GEB contracts
// prettier-ignore
export class AdminApis {
    public multisigAdmin: GnosisSafe
    public multisigAdminProxy: DsProxy
    public deploy : GebDeploy
    public protocolTokenAuthority: ProtocolTokenAuthority
    public pauseAuthority: DsDelegateRoles
    public pause: DsProtestPause
    public pauseProxy: DsPauseProxy
    public govActions: GovActions
    public esm: Esm
    public fsmGovInterface: FsmGovernanceInterface
    public pauseProxyAction: GebDeployPauseProxyActions
    public proxyDeployer: DsProxy
    public debtCeilingSetter: SingleSpotDebtCeilingSetter
    public collateralAuctionThrottler: CollateralAuctionThrottler
    public fsmWrapper: FsmWrapper
    public esmThresholdSetter: EsmThresholdSetter
    public singleDebtFloorAdjuster: SingleDebtFloorAdjuster


    constructor(
        network: GebDeployment,
        public chainProvider: GebProviderInterface
    )
    {
        // Set the address list
        let addressList = getAddressList(network)

        // Additional instances only for the admin package
        this.multisigAdmin = new GnosisSafe(addressList.GEB_MULTISIG, this.chainProvider)
        this.multisigAdminProxy = new DsProxy(addressList.GEB_MULTISIG_PROXY, this.chainProvider)
        this.deploy = new GebDeploy(addressList.GEB_DEPLOY, this.chainProvider)
        this.pauseAuthority = new DsDelegateRoles(addressList.GEB_PAUSE_AUTHORITY, this.chainProvider)
        this.pause = new DsProtestPause(addressList.GEB_PAUSE, this.chainProvider)
        this.pauseProxy = new DsPauseProxy(addressList.GEB_PAUSE_PROXY, this.chainProvider)
        this.govActions = new GovActions(addressList.GEB_GOV_ACTIONS, this.chainProvider)
        this.fsmGovInterface = new FsmGovernanceInterface(addressList.FSM_GOV_INTERFACE, this.chainProvider)
        this.pauseProxyAction = new GebDeployPauseProxyActions(addressList.PROXY_PAUSE_ACTIONS, this.chainProvider)
        this.proxyDeployer = new DsProxy(addressList.PROXY_DEPLOYER, this.chainProvider)
        this.debtCeilingSetter = new SingleSpotDebtCeilingSetter(addressList.GEB_SINGLE_CEILING_SETTER, this.chainProvider)
        this.collateralAuctionThrottler = new CollateralAuctionThrottler(addressList.COLLATERAL_AUCTION_THROTTLER, this.chainProvider)
        this.fsmWrapper = new FsmWrapper(addressList.FSM_WRAPPER_ETH, this.chainProvider)
        this.esmThresholdSetter = new EsmThresholdSetter(addressList.ESM_THRESHOLD_SETTER, this.chainProvider)
        this.singleDebtFloorAdjuster = new SingleDebtFloorAdjuster(addressList.GEB_DEBT_FLOOR_ADJUSTER, this.chainProvider)
    }
}
