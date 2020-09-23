import {
    GebDeploy,
    ProtocolTokenAuthority,
    GebPollingEmitter,
    DsDelegateRoles,
    GebPrintingPermissions,
    DsPause,
    DsPauseProxy,
    GovActions,
    Esm,
    TokenBurner,
    FsmGovernanceInterface,
    DsProxyFactory,
    GebDeployPauseProxyActions,
    TxManager,
    GnosisSafeProxy,
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
    public multisigAdmin: GnosisSafeProxy
    public multisigAdminProxy: DsProxy
    public deploy : GebDeploy
    public protocolTokenAuthority: ProtocolTokenAuthority
    public pollingEmitter: GebPollingEmitter
    public printingPermissionRegistry: GebPrintingPermissions
    public pauseAuthority: DsDelegateRoles
    public pause: DsPause
    public pauseProxy: DsPauseProxy
    public govActions: GovActions
    public esm: Esm
    public esmBurner: TokenBurner
    public fsmGovInterface: FsmGovernanceInterface
    public proxyFactory: DsProxyFactory
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
        
        // Additional instances only in admin package
        this.multisigAdmin = new GnosisSafeProxy(addressList.GEB_MULTISIG, this.chainProvider)
        this.multisigAdminProxy = new DsProxy(addressList.GEB_MULTISIG_PROXY, this.chainProvider)
        this.deploy = new GebDeploy(addressList.GEB_DEPLOY, this.chainProvider)
        this.protocolTokenAuthority = new ProtocolTokenAuthority(addressList.PROTOCOL_TOKEN_AUTHORITY, this.chainProvider)
        this.pollingEmitter = new GebPollingEmitter(addressList.GEB_POLLING_EMITTER, this.chainProvider)
        this.pauseAuthority = new DsDelegateRoles(addressList.GEB_PAUSE_AUTHORITY, this.chainProvider)
        this.printingPermissionRegistry = new GebPrintingPermissions(addressList.PRINTING_PERMISSIONS_REGISTRY, this.chainProvider)
        this.pause = new DsPause(addressList.GEB_PAUSE, this.chainProvider)
        this.pauseProxy = new DsPauseProxy(addressList.GEB_PAUSE_PROXY, this.chainProvider)
        this.govActions = new GovActions(addressList.GEB_GOV_ACTIONS, this.chainProvider)
        this.esm = new Esm(addressList.GEB_ESM, this.chainProvider)
        this.esmBurner = new TokenBurner(addressList.GEB_ESM_TOKEN_BURNER, this.chainProvider)
        this.fsmGovInterface = new FsmGovernanceInterface(addressList.FSM_GOV_INTERFACE, this.chainProvider)
        this.proxyFactory = new DsProxyFactory(addressList.PROXY_FACTORY, this.chainProvider)
        this.pauseProxyAction = new GebDeployPauseProxyActions(addressList.PROXY_PAUSE_ACTIONS, this.chainProvider)
        this.proxyDeployer = new DsProxy(addressList.PROXY_DEPLOYER, this.chainProvider)
        this.txManager = new TxManager(addressList.GEB_TX_MANAGER, this.chainProvider)
    }
}
