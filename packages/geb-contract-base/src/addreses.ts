// All keys are mandatory
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
    | 'GEB_PAUSE_AUTHORITY'
    | 'GEB_POLLING_EMITTER'
    | 'GEB_SAFE_ENGINE'
    | 'GEB_TAX_COLLECTOR'
    | 'GEB_LIQUIDATION_ENGINE'
    | 'GEB_ACCOUNTING_ENGINE'
    | 'GEB_COIN_JOIN'
    | 'GEB_SURPLUS_AUCTION_HOUSE'
    | 'GEB_DEBT_AUCTION_HOUSE'
    | 'GEB_PAUSE'
    | 'GEB_PAUSE_PROXY'
    | 'GEB_GOV_ACTIONS'
    | 'GEB_COIN'
    | 'GEB_ORACLE_RELAYER'
    | 'GEB_GLOBAL_SETTLEMENT'
    | 'GEB_STABILITY_FEE_TREASURY'
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
    | 'FEED_SECURITY_MODULE_ETH'
    | 'FSM_WRAPPER_ETH'
    | 'GEB_JOIN_ETH_A'
    | 'GEB_COLLATERAL_AUCTION_HOUSE_ETH_A'
    | 'PROXY_PAUSE_ACTIONS'
    | 'PROXY_PAUSE_SCHEDULE_ACTIONS'
    | 'PROXY_DEPLOYER'
    | 'UNISWAP_FACTORY'
    | 'UNISWAP_ROUTER'
    | 'GEB_DS_COMPARE'
    | 'GEB_TX_MANAGER'
    | 'GEB_RRFM_SETTER'
    | 'GEB_RRFM_SETTER_RELAYER'
    | 'MEDIANIZER_RAI'
    | 'MEDIANIZER_RAI_REWARDS_RELAYER'
    | 'GEB_RRFM_CALCULATOR'
    | 'GEB_DUMMY_RRFM_CALCULATOR'
    | 'PROXY_ACTIONS_INCENTIVES'
    | 'SPOT_RAI'
    | 'SPOT_FEED_SECURITY_MODULE_RAI'
    | 'GEB_UNISWAP_SINGLE_KEEPER_FLASH_PROXY_ETH_A'
    | 'GEB_UNISWAP_MULTI_COLLATERAL_KEEPER_FLASH_PROXY'
    | 'GEB_COIN_UNISWAP_POOL'
    | 'GEB_INCENTIVES_MINER'
    | 'LEVERAGE_PROXY_ACTION'
    | 'PROXY_DEBT_AUCTION_ACTIONS'
    | 'PROXY_SURPLUS_AUCTION_ACTIONS'
    | 'GEB_STAKED_TOKEN_PROXY_ACTIONS'
    | 'PROXY_SAVIOUR_ACTIONS'
    | 'GEB_SINGLE_CEILING_SETTER'
    | 'MERKLE_DISTRIBUTOR_FACTORY'
    | 'COLLATERAL_AUCTION_THROTTLER'
    | 'SAFE_SAVIOUR_REGISTRY'
    | 'ESM_THRESHOLD_SETTER'
    | 'GEB_UNISWAP_SAVIOUR_LIQUIDITY_MANAGER'
    | 'GEB_SAVIOUR_CRATIO_SETTER'
    | 'GEB_COIN_ETH_UNISWAP_V2_POOL_SAVIOUR'
    | 'DEBT_POPPER_REWARDS'
    | 'GEB_UNISWAP_TWO_TRANCHE_MANAGER'
    | 'GEB_COIN_UNISWAP_V3_POOL'
    | 'GEB_STAKING'
    | 'GEB_STAKED_PROT'
    | 'GEB_STAKING_TOKEN'
    | 'GEB_STAKING_AUCTION_HOUSE'
    | 'GEB_STAKING_REWARDS_ESCROW'
    | 'GEB_DEBT_FLOOR_ADJUSTER'
    | 'GEB_DEBT_AUCTION_INITIAL_PARAM_SETTER'
    | 'GEB_AUTO_SURPLUS_AUCTIONED'
    | 'GEB_AUTO_SURPLUS_BUFFER'
    | 'GEB_STAKED_TOKENS_TO_KEEP_SETTER'
    | 'GEB_STAKE_RECYCLING_TRIGGER'
    | 'GEB_STAKE_RECYCLING_SURPLUS_AUCTION_HOUSE'
    | 'GEB_COIN_CURVE_V1_MAX_SAVIOUR'
    | 'GEB_YEARN_CURVE_MAX_SAVIOUR'

export type ContractList = {
    [key in ContractKey]: string
}

export declare type GebDeployment =
    | 'mainnet'
    | 'kovan'
    | 'rinkeby'
    | ContractList

// prettier-ignore
export const KOVAN_ADDRESSES: ContractList = {
    "ETH_FROM": "0x7BCd5C864a0aC07EFee60a1A18f9d5c99Ff7fD4d",
    "STARTING_BLOCK_NUMBER": "23275958",
    "PROXY_DEPLOYER": "0x3D223a697b7ca376c8289431d4946ebD26CA80ae",
    "COIN_TYPE": "INDEX",
    "GOVERNANCE_TYPE": "MULTISIG-SAFE",
    "MULTICALL": "0x551283ecB1257B5aE0A4b2DFe42e06E5F29b8068",
    "FAUCET": "0x0000000000000000000000000000000000000000",
    "GEB_MULTISIG": "0x5CCFc908D9810E32DDC6B1Df1f24c67A2Cfcfd83",
    "GEB_MULTISIG_PROXY": "0xDcceA20B82f43BDDaa55dB54a40C031C9948e296",
    "GEB_DEPLOY": "0x5feC3771419d0D2A027854e41de62722d9182c1d",
    "GEB_PROT": "0x6e6eA84bb2fcE17AfCE8e1117DdC708142ef51c9",
    "PROTOCOL_TOKEN_AUTHORITY": "0xacB478e8e657fb1eF78Ad3dF3B537466642f9faD",
    "GEB_PAUSE_AUTHORITY": "0x68BE18B496Fb2472E4bD05dF8cC6d566C401be9B",
    "GEB_POLLING_EMITTER": "0x5Bc73aff8aADdD3A340a61DeaE885205088AAe68",
    "GEB_SAFE_ENGINE": "0x7f63fE955fFF8EA474d990f1Fc8979f2C650edbE",
    "GEB_TAX_COLLECTOR": "0xc1a94C5ad9FCD79b03F79B34d8C0B0C8192fdc16",
    "GEB_LIQUIDATION_ENGINE": "0x75A807a667FbcB303f46c0F8Ca45fdfEF8fdC9AC",
    "GEB_ACCOUNTING_ENGINE": "0x6073E8FE874B53732b5DdD469a2De4047f33C64B",
    "GEB_COIN_JOIN": "0x7d4fe9659D80970097E604727a2BA3F094B00758",
    "GEB_SURPLUS_AUCTION_HOUSE": "0xCdaA2ec0975eD41202E1078b21a4833E414f6379",
    "GEB_DEBT_AUCTION_HOUSE": "0x6AcE594C5A421E468c13715AD62A183200C320a6",
    "GEB_PAUSE": "0x2ef5240F19B45C02c6eb53211e034bD504Ea1f82",
    "GEB_PAUSE_PROXY": "0xe074d33128CecaA74ef137cF2ACAB353843e7821",
    "GEB_GOV_ACTIONS": "0x9Dc31eCDf2553d28ffc615B74f7d1D4B7C65EBc8",
    "GEB_COIN": "0x76b06a2f6dF6f0514e7BEC52a9AfB3f603b477CD",
    "GEB_ORACLE_RELAYER": "0xE5Ae4E49bEA485B5E5172EE6b1F99243cB15225c",
    "GEB_GLOBAL_SETTLEMENT": "0x9cc56ae3fbf4feebb428b981a787d31f039b3fc5",
    "GEB_STABILITY_FEE_TREASURY": "0xE8B3b96D632D7257639de137FB6aD191F0515c8d",
    "GEB_ESM": "0xe3Ea20bDeF87Bb75162CF79eB491243eF790DFa8",
    "GEB_ESM_TOKEN_BURNER": "0x41d4D7AB0a80864A59acc7A25b5e6bDD07E7FFB3",
    "GEB_RRFM_CALCULATOR": "0x10D64e797555dB168BD764E4C8c179d294bE8014",
    "GEB_DUMMY_RRFM_CALCULATOR": "0x750f2b976F8e233AFcCDee2f8213996cB7D3D798",
    "GEB_RRFM_SETTER": "0x97533CD0c5997bce2504378CB29a091830de0F94",
    "GEB_RRFM_SETTER_RELAYER": "0xED26c78563f98f60B718f7d39e9BFB03A725b015",
    "PROXY_ACTIONS": "0x938291470A786f73Ae69A4E67246E3396D1118eC",
    "PROXY_ACTIONS_INCENTIVES": "0x3D36CA69b16f31C8F5E4f391Df95Ef5eC4ab663f",
    "PROXY_ACTIONS_GLOBAL_SETTLEMENT": "0x771f6CA88935989A635981E42dE00B8cfa1258d0",
    "PROXY_DEBT_AUCTION_ACTIONS": "0x1B921381621826Ff3a9A2C240e7F2F83fC5F5C62",
    "PROXY_SURPLUS_AUCTION_ACTIONS": "0xcc1e243b4C280BfdB9AeFe49F1bF85072C3dDf5B",
    "GEB_STAKED_TOKEN_PROXY_ACTIONS": "0xE2F560Cd0E3115dA27fE2b2B620F8e86dAeeb40f",
    "PROXY_SAVIOUR_ACTIONS": "0xD9a9F95FA771f6BF19E664Fe6B1D5Ae52C230A46",
    "SAFE_MANAGER": "0x807C8eCb73d9c8203d2b1369E678098B9370F2EA",
    "GET_SAFES": "0x702dcf4a8C3bBBd243477D5704fc45F2762D3826",
    "FSM_GOV_INTERFACE": "0x355DA9a2A54007A850e823651a29CFF8f0afdC02",
    "PROXY_FACTORY": "0xe11E3b391F7E8bC47247866aF32AF67Dd58Dc800",
    "PROXY_REGISTRY": "0x64A436ae831C1672AE81F674CAb8B6775df3475C",
    "MEDIANIZER_RAI": "0xcede0Fa68bCCc0910d5355725BfDb7AdAfC7Aeb3",
    "MEDIANIZER_RAI_REWARDS_RELAYER": "0x6f2ae2ed721e2b0cb5254eff4e0982b3fb812b56",
    "SPOT_RAI": "0xFDba7b009C096f2b38CdDfd746644bBAEdE06922",
    "SPOT_FEED_SECURITY_MODULE_RAI": "0x0000000000000000000000000000000000000000",
    "ETH": "0xd0A1E359811322d97991E03f863a0C30C2cF029C",
    "MEDIANIZER_ETH": "0x395A96E956164A0C76759a686ebC6296fe5Ee6f9",
    "FEED_SECURITY_MODULE_ETH": "0xD047A920140390b16A0aB8A77c4aa2FCBa5C6675",
    "FSM_WRAPPER_ETH": "0x656590A7C9aD09319134C2b9B956945d8Cb955B1",
    "GEB_JOIN_ETH_A": "0xad4AB4Cb7b8aDC45Bf2873507fC8700f3dFB9Dd3",
    "GEB_COLLATERAL_AUCTION_HOUSE_ETH_A": "0xbEDDdF02F9C55BdDD95C3CB67F77A9Ef426D7fC0",
    "GEB_UNISWAP_SINGLE_KEEPER_FLASH_PROXY_ETH_A": "0x9cC49b574070379B71817Aa34643CB78Ad90A932",
    "GEB_UNISWAP_MULTI_COLLATERAL_KEEPER_FLASH_PROXY": "0xe29fEfa1ECD4b1Ca55deC29A7EfDBc622998FD99",
    "PROXY_PAUSE_ACTIONS": "0xfbD93C8E9c428447ccb8fE386A8de1df2075c962",
    "PROXY_PAUSE_SCHEDULE_ACTIONS": "0xFde9047Ec24166d2d2F9522f69aF81DF478dd276",
    "GEB_INCENTIVES_MINER": "0xEB03d9ACdd445f7DfA914eE99aC73Bd6888677EC",
    "UNISWAP_FACTORY": "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    "UNISWAP_ROUTER": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    "GEB_DS_COMPARE": "0xde1766FE0D4A00f1C45875EB76D819E9A37585b1",
    "GEB_TX_MANAGER": "0x3876f196A072533A5262Af485c64Fa9B50951991",
    "GEB_COIN_UNISWAP_POOL": "0x052AE8b0F7E5c610937920e46ED265c2063Cb7B8",
    "GEB_COIN_UNISWAP_V3_POOL": "0xE25Df12AA3d86118E5Fcfd6cf573fBA7648A2f2D",
    "GEB_SINGLE_CEILING_SETTER": "0x8637682C5f7EF0A60Ed685Cf335aEC747991EfFb",
    "SAFE_SAVIOUR_REGISTRY": "0xB19bc2e13Bd6BAeeE8c0D8282387221D7f9b8833",
    "LEVERAGE_PROXY_ACTION": "0x0000000000000000000000000000000000000000",
    "MERKLE_DISTRIBUTOR_FACTORY": "0x11614138187314448fBbBA4c7094E4d5eA0dc1f7",
    "COLLATERAL_AUCTION_THROTTLER": "0xB64a4106bF6ACf5128b5010F37aC1AFE6868aB1d",
    "ESM_THRESHOLD_SETTER": "0x18cd95e59fff3fef4a6cbf82d1bfc8e572b44749",
    "DEBT_POPPER_REWARDS": "0x488d76dB8767c9c78e99473530CEc2112d12b60b",
    "GEB_UNISWAP_SAVIOUR_LIQUIDITY_MANAGER": "0x387f9BD28F906CD63155F3094c2e0A2c3Aa56B81",
    "GEB_SAVIOUR_CRATIO_SETTER": "0x78AFBE751d3C3fcb6c60d62E1900c1ae80BA26A4",
    "GEB_COIN_ETH_UNISWAP_V2_POOL_SAVIOUR": "0x6a25F6dD623cA6e534108EFb3DF9e9E485DD46fb",
    "GEB_COIN_CURVE_V1_MAX_SAVIOUR" : "0x33ac6e64c0a6fc1cf5f2a486fc0bb287cae4a541",
    "GEB_UNISWAP_TWO_TRANCHE_MANAGER": "0x1675FE1e0192B9eb8fCC9127c983Bb3dAcA36A69",
    "GEB_STAKING": "0x9A40f84B2dE91b69622fF9132F0E8d30881Ef749",
    "GEB_STAKED_PROT": "0x4c4b5B97f28bcb7698C1FFC2c01F494ACa639094",
    "GEB_STAKING_TOKEN": "0x392708e11ab3ce8a4746bba467306d80ba49513e",
    "GEB_STAKING_AUCTION_HOUSE": "0x63e5455824F23e1a0d6157F4C6f400A782Ab9eF1",
    "GEB_DEBT_FLOOR_ADJUSTER": "0xf79cc27b8DCf9A945187F860912bF4D7985e6722",
    "GEB_STAKING_REWARDS_ESCROW": "0x7b954d88cFf6929F540f309836f9d24933953e1a",
    "GEB_DEBT_AUCTION_INITIAL_PARAM_SETTER": "0x0000000000000000000000000000000000000000",
    "GEB_AUTO_SURPLUS_AUCTIONED": "0x0000000000000000000000000000000000000000",
    "GEB_AUTO_SURPLUS_BUFFER": "0x0000000000000000000000000000000000000000",
    "GEB_STAKED_TOKENS_TO_KEEP_SETTER": "0x0000000000000000000000000000000000000000",
    "GEB_STAKE_RECYCLING_SURPLUS_AUCTION_HOUSE": "0x0000000000000000000000000000000000000000",
    "GEB_STAKE_RECYCLING_TRIGGER": "0x0000000000000000000000000000000000000000",
    "GEB_YEARN_CURVE_MAX_SAVIOUR": "0xd6892A2DF85955B75279afEEe2D38E276F372F35",
    
}

// prettier-ignore
export const MAINNET_ADDRESSES: ContractList = {
    "ETH_FROM": "0x7FAfc11677649DB6AbFEC127B4B776D585520ae1",
    "STARTING_BLOCK_NUMBER": "11848304",
    "PROXY_DEPLOYER": "0x631e38D6Dc0F4A26F6BE0d3d0E4ebA3d02033aB4",
    "COIN_TYPE": "INDEX",
    "GOVERNANCE_TYPE": "MULTISIG-SAFE",
    "MULTICALL": "0x51812e07497586ce025D798Bb44b6d11bBEe3a01",
    "FAUCET": "0x0000000000000000000000000000000000000000",
    "GEB_MULTISIG": "0x427A277eA53e25143B3b509C684aA4D0EB8bA01b",
    "GEB_MULTISIG_PROXY": "0x2695b1dC32899c07d177A287f006b6569216a5a1",
    "GEB_DEPLOY": "0x24AcC85528e6dd5B9C297fb8821522D36B1Ae09f",
    "GEB_PROT": "0x6243d8CEA23066d098a15582d81a598b4e8391F4",
    "PROTOCOL_TOKEN_AUTHORITY": "0xcb8479840A5576B1cafBb3FA7276e04Df122FDc7",
    "GEB_PAUSE_AUTHORITY": "0x1490a828957f1E23491c8d69273d684B15c6E25A",
    "GEB_POLLING_EMITTER": "0xf7Da963B88194a9bc6775e93d39c70c6e3f04f6F",
    "GEB_SAFE_ENGINE": "0xCC88a9d330da1133Df3A7bD823B95e52511A6962",
    "GEB_TAX_COLLECTOR": "0xcDB05aEda142a1B0D6044C09C64e4226c1a281EB",
    "GEB_LIQUIDATION_ENGINE": "0x4fFbAA89d648079Faafc7852dE49EA1dc92f9976",
    "GEB_ACCOUNTING_ENGINE": "0xcEe6Aa1aB47d0Fb0f24f51A3072EC16E20F90fcE",
    "GEB_COIN_JOIN": "0x0A5653CCa4DB1B6E265F47CAf6969e64f1CFdC45",
    "GEB_SURPLUS_AUCTION_HOUSE": "0x4EEfDaE928ca97817302242a851f317Be1B85C90",
    "GEB_DEBT_AUCTION_HOUSE": "0x1896adBE708bF91158748B3F33738Ba497A69e8f",
    "GEB_PAUSE": "0x2cDE6A1147B0EE61726b86d83Fd548401B1162c7",
    "GEB_PAUSE_PROXY": "0xa57A4e6170930ac547C147CdF26aE4682FA8262E",
    "GEB_GOV_ACTIONS": "0xD0a2068D337d082d8289856F9238a570BeB2e302",
    "GEB_COIN": "0x03ab458634910AaD20eF5f1C8ee96F1D6ac54919",
    "GEB_ORACLE_RELAYER": "0x4ed9C0dCa0479bC64d8f4EB3007126D5791f7851",
    "GEB_GLOBAL_SETTLEMENT": "0xee4cf96e5359d9619197fd82b6ef2a9eae7b91e1",
    "GEB_STABILITY_FEE_TREASURY": "0x83533fdd3285f48204215E9CF38C785371258E76",
    "GEB_ESM": "0xa33Ea2Ac39902d4A206D6A1F8D38c7330C80f094",
    "GEB_ESM_TOKEN_BURNER": "0xB10409FC293F987841964C4FcFEf887D9ece799B",
    "GEB_RRFM_CALCULATOR": "0x5CC4878eA3E6323FdA34b3D28551E1543DEe54C6",
    "GEB_DUMMY_RRFM_CALCULATOR": "0x9F02ddBFb4B045Df83D45c4d644027FBD7d72A6D",
    "GEB_RRFM_SETTER": "0x7acfc14dbf2decd1c9213db32ae7784626daeb48",
    "GEB_RRFM_SETTER_RELAYER": "0xd52da90c20c4610fef8faade2a1281ffa54eb6fb",
    "PROXY_ACTIONS": "0x880CECbC56F48bCE5E0eF4070017C0a4270F64Ed",
    "PROXY_ACTIONS_INCENTIVES": "0x88A77b8Ff53329f88B8B6F9e29835FEc287349e0",
    "PROXY_ACTIONS_GLOBAL_SETTLEMENT": "0x17b5d9914194a08c7Ef14451BA15E8aE4f92Cb93",
    "PROXY_DEBT_AUCTION_ACTIONS": "0x943C6Bb9FD652f6e4a9dA32894075e5aBECAd394",
    "PROXY_SURPLUS_AUCTION_ACTIONS": "0x16B0BF0Bf031A3691f4bD600e5340fEDd149C0ED",
    "GEB_STAKED_TOKEN_PROXY_ACTIONS": "0x0000000000000000000000000000000000000000",
    "PROXY_SAVIOUR_ACTIONS": "0x8bcb98529ACf08580F23e35912566143E3f9B370",
    "SAFE_MANAGER": "0xEfe0B4cA532769a3AE758fD82E1426a03A94F185",
    "GET_SAFES": "0xdf4BC9aA98cC8eCd90Ba2BEe73aD4a1a9C8d202B",
    "FSM_GOV_INTERFACE": "0xe24F8B30fd28c90462c9BbC87A9A2a823636F533",
    "PROXY_FACTORY": "0xA26e15C895EFc0616177B7c1e7270A4C7D51C997",
    "PROXY_REGISTRY": "0x4678f0a6958e4D2Bc4F1BAF7Bc52E8F3564f3fE4",
    "MEDIANIZER_RAI": "0xFbF4849a06F6e6F53EcB31D2f8BD61aA7874b268",
    "MEDIANIZER_RAI_REWARDS_RELAYER": "0xE8063b122Bef35d6723E33DBb3446092877C685",
    "SPOT_RAI": "0x7235a0094eD56eB2Bd0de168d307C8990233645f",
    "SPOT_FEED_SECURITY_MODULE_RAI": "0x0000000000000000000000000000000000000000",
    "ETH": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "MEDIANIZER_ETH": "0xb825e25856bD98b3f2FAF2aEb6Cb8742B38C4025",
    "FEED_SECURITY_MODULE_ETH": "0xD4A0E3EC2A937E7CCa4A192756a8439A8BF4bA91",
    "FSM_WRAPPER_ETH": "0x105b857583346E250FBD04a57ce0E491EB204BA3",
    "GEB_JOIN_ETH_A": "0x2D3cD7b81c93f188F3CB8aD87c8Acc73d6226e3A",
    "GEB_COLLATERAL_AUCTION_HOUSE_ETH_A": "0x7fFdF1Dfef2bfeE32054C8E922959fB235679aDE",
    "GEB_UNISWAP_SINGLE_KEEPER_FLASH_PROXY_ETH_A": "0xC2Da0417f2A78Ad100FE092B58Fb10314Bd8F157",
    "GEB_UNISWAP_MULTI_COLLATERAL_KEEPER_FLASH_PROXY": "0x12F906E4854EEDFdB1BD2DAA9100D1C3b0Cb7631",
    "PROXY_PAUSE_ACTIONS": "0x27a54e99dE813CE2E41BAa7F44d1F19FBA22B36D",
    "PROXY_PAUSE_SCHEDULE_ACTIONS": "0x534c3283059Fb3D62a93496a6aba8f97A37dAcCC",
    "GEB_INCENTIVES_MINER": "0xa706d4c39c315288113020f3e2D7e1095e912a20",
    "UNISWAP_FACTORY": "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    "UNISWAP_ROUTER": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    "GEB_DS_COMPARE": "0x10122261ff9520C590c0c3A679b7E3dFC8B09C64",
    "GEB_TX_MANAGER": "0xB7272627825D1cb633f705BC269F8e11126D7A25",
    "GEB_COIN_UNISWAP_POOL": "0x8aE720a71622e824F576b4A8C03031066548A3B1",
    "GEB_COIN_UNISWAP_V3_POOL": "0x0000000000000000000000000000000000000000",
    "GEB_SINGLE_CEILING_SETTER": "0xB2df48A0C4A07031F538353AA35D7fFa24e25eC1",
    "LEVERAGE_PROXY_ACTION": "0x0000000000000000000000000000000000000000",
    "SAFE_SAVIOUR_REGISTRY": "0x2C6F6784585B45906Fce24f30C99f8ad6d94b5d4",
    "MERKLE_DISTRIBUTOR_FACTORY": "0xb5Ed650eF207e051453B68A2138D7cb67CC85E41",
    "COLLATERAL_AUCTION_THROTTLER": "0x709310eB91d1902A9b5EDEdf793b057f0da8DECb",
    "ESM_THRESHOLD_SETTER": "0x0000000000000000000000000000000000000000",
    "GEB_UNISWAP_SAVIOUR_LIQUIDITY_MANAGER": "0x5D447CbE791E2F4c11d82f1F3E901DEc76f61763",
    "GEB_SAVIOUR_CRATIO_SETTER": "0xD58e867E1548D8294bc6C77585AF4015ab457880",
    "GEB_COIN_ETH_UNISWAP_V2_POOL_SAVIOUR": "0xA9402De5ce3F1E03Be28871b914F77A4dd5e4364",
    "GEB_COIN_CURVE_V1_MAX_SAVIOUR": "0x0000000000000000000000000000000000000000",
    "DEBT_POPPER_REWARDS": "0xe1d5181F0DD039aA4f695d4939d682C4cF874086",
    "GEB_UNISWAP_TWO_TRANCHE_MANAGER": "0x0000000000000000000000000000000000000000",
    "GEB_STAKING": "0x69c6C08B91010c88c95775B6FD768E5b04EFc106",
    "GEB_STAKED_PROT": "0x353EFAC5CaB823A41BC0d6228d7061e92Cf9Ccb0",
    "GEB_STAKING_TOKEN": "0xd6F3768E62Ef92a9798E5A8cEdD2b78907cEceF9",
    "GEB_STAKING_AUCTION_HOUSE": "0x27da9f90255E56c2bcEC5F6360ed260BE70F3ab2",
    "GEB_DEBT_FLOOR_ADJUSTER": "0x0000000000000000000000000000000000000000",
    "GEB_STAKING_REWARDS_ESCROW": "0x8017F897AAaAbD5701b63D819590062A87732Ba0",
    "GEB_DEBT_AUCTION_INITIAL_PARAM_SETTER": "0x840E4e438711962DAc1a0c37B0588C08C92c29A5",
    "GEB_AUTO_SURPLUS_AUCTIONED": "0xfCD7BcC44C3778880AEd0E025fd0aE5f7ce5Ba44",
    "GEB_AUTO_SURPLUS_BUFFER": "0x1450f40E741F2450A95F9579Be93DD63b8407a25",
    "GEB_STAKED_TOKENS_TO_KEEP_SETTER": "0xaa5f19B87cC8F8A17D20f0697F1B37E112930Ae4",
    "GEB_STAKE_RECYCLING_SURPLUS_AUCTION_HOUSE": "0xAe402576187cc68098F74E14253c9816346eb932",
    "GEB_STAKE_RECYCLING_TRIGGER": "0xaE09AFE44fCeA8e93338bdC492A6B038F4092818",
    "GEB_YEARN_CURVE_MAX_SAVIOUR": "0x0000000000000000000000000000000000000000",
    
}

// prettier-ignore
export const RINKEBY_ADDRESSES: ContractList = {
    "ETH_FROM": "0x230E277B1A6B36d56Da0F143Fe73ABdA7a926dbb",
    "STARTING_BLOCK_NUMBER": "7295635",
    "PROXY_DEPLOYER": "0xa49fE5Fd61Fbb5a856Ef5A119aAA982463Ca4EB2",
    "COIN_TYPE": "INDEX",
    "GOVERNANCE_TYPE": "MULTISIG-SAFE",
    "MULTICALL": "0xEb4E467137a4836Fa1AB026e079b1ce42F06E010",
    "FAUCET": "0x7EbcF11D7aD028d71c85169794D430B856962B90",
    "GEB_MULTISIG": "0xb148ff07894B6AE851Cd391AA463022953960477",
    "GEB_MULTISIG_PROXY": "0xf5130bcf18f17164CDC1d929913a64873E547944",
    "GEB_DEPLOY": "0x9F31e50f6d5D25B93b9d165573a169829b91766A",
    "GEB_PROT": "0x0000000000000000000000000000000000000000",
    "GEB_PAUSE_AUTHORITY": "0x4670e6CD07493D094654EB7010C6E32Fd95f638D",
    "GEB_POLLING_EMITTER": "0x41E7a13795CA812ac6BBF34560BB3E0B79E21F88",
    "GEB_SAFE_ENGINE": "0x18C5f335602C881EaA36d2a5A483186f61a7C087",
    "GEB_TAX_COLLECTOR": "0xee8C739357C71E2a8eaE1C659B659FFf407C4A33",
    "GEB_LIQUIDATION_ENGINE": "0xcC7fEfca00B8Ca8C9145C6fDe2c5CbBF85e55505",
    "GEB_ACCOUNTING_ENGINE": "0xeFB357401202EaE363673e2F6062D00750880dd5",
    "GEB_COIN_JOIN": "0x355033f612Eb1E70972f79E0B82E8789E9C49B5f",
    "GEB_SURPLUS_AUCTION_HOUSE": "0x822D7574C382Cb0Ed2ceEbEFEeD5a3716cD8ef68",
    "GEB_DEBT_AUCTION_HOUSE": "0x55F004bEA4dD46CF529fA0E1CB9F11c24CD768ce",
    "GEB_STAKED_TOKEN_PROXY_ACTIONS": "0x0000000000000000000000000000000000000000",
    "GEB_PAUSE": "0x63B5F3fc34F5c00F3dF5E9d0bC5677f8E2d8aa81",
    "GEB_PAUSE_PROXY": "0x91A49D98911D74e19b81d10AC31FAA0A798249C5",
    "GEB_GOV_ACTIONS": "0x37Df6a3fdB306AaD9fC99eB9E1f1069073913a3F",
    "GEB_COIN": "0x1C6f922b5a1b29329B2854789F784Bb849ff3b4b",
    "GEB_ORACLE_RELAYER": "0x550Aa609c94a3b08A4b473D9f3cc56527C769D7d",
    "GEB_GLOBAL_SETTLEMENT": "0xaEE64AB4c7Ef82084B364960a2DCF9D06f985F50",
    "GEB_STABILITY_FEE_TREASURY": "0x3e5925fc04283555ed8274Fdc5038f69A47891BE",
    "GEB_ESM": "0x0000000000000000000000000000000000000000",
    "GEB_RRFM_CALCULATOR": "0xB6F539EcC4baF3fF0EeaC2342bb608FbAABD0076",
    "GEB_RRFM_SETTER": "0xA58E1b2c04691D839D76455560B7412F425c62a9",
    "PROXY_ACTIONS": "0xde51B3430a2c910f49f4B4C9Ad5AC7cD988De8c3",
    "PROXY_ACTIONS_GLOBAL_SETTLEMENT": "0xA09EAe61bEE5cE3a9Ac9f0360144c8D3aBc27931",
    "SAFE_MANAGER": "0x3C65A7668535B0242844Dd3e27ff4B253F94B873",
    "GET_SAFES": "0xc4E8508348d81A20ADC7F0CA21A03a512D92D15a",
    "FSM_GOV_INTERFACE": "0x7A7AaAD445b6843a86204f5f1E017eD8F30c6116",
    "PROXY_FACTORY": "0x6Ea1f20E33dB81f3a16F6d8002F2389e147a886f",
    "PROXY_REGISTRY": "0x92EDB4F6c1AA2136DdfdE8EcB9c2A7c77d240B44",
    "MEDIANIZER_RAI": "0xC6370ff2620f447f2224E80BFf63748639daE154",
    "ETH": "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    "MEDIANIZER_ETH": "0x6CdC1cEd3d6198cFf6B36e481Ba57b55285DB817",
    "FEED_SECURITY_MODULE_ETH": "0xdB0c9213FA09A48B51d75721df46f36e01774992",
    "GEB_JOIN_ETH_A": "0x3c6EA7AE33731a22917Bb26b00442BF197B871B5",
    "GEB_COLLATERAL_AUCTION_HOUSE_ETH_A": "0xFEF608E26eA13649ce19Ae8fF36927A77dd9a7be",
    "PROXY_PAUSE_ACTIONS": "0x32a0F030f44c48e1E2bF4C34FB4cAf68BAc2d6d8",
    "PROXY_PAUSE_SCHEDULE_ACTIONS": "0xcf8371C1B445035329C8F54d0B38EFD9913c4c44",
    "UNISWAP_FACTORY": "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    "UNISWAP_ROUTER": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    "GEB_DS_COMPARE": "0xE307656278c8118C2F106D3c50568B898fb1D388",
    "GEB_TX_MANAGER": "0xFb67D28206736CA16a56e949f7e6945aed6b774c",
    "GEB_DUMMY_RRFM_CALCULATOR": "0x0000000000000000000000000000000000000000",
    "PROTOCOL_TOKEN_AUTHORITY": "0x0000000000000000000000000000000000000000",
    "GEB_ESM_TOKEN_BURNER": "0x0000000000000000000000000000000000000000",
    "PROXY_ACTIONS_INCENTIVES": "0x0000000000000000000000000000000000000000",
    'SPOT_RAI': "0x0000000000000000000000000000000000000000",
    'SPOT_FEED_SECURITY_MODULE_RAI': "0x0000000000000000000000000000000000000000",
    'GEB_UNISWAP_SINGLE_KEEPER_FLASH_PROXY_ETH_A': "0x0000000000000000000000000000000000000000",
    'GEB_UNISWAP_MULTI_COLLATERAL_KEEPER_FLASH_PROXY': "0x0000000000000000000000000000000000000000",
    'GEB_COIN_UNISWAP_POOL': "0x0000000000000000000000000000000000000000",
    "GEB_COIN_UNISWAP_V3_POOL": "0x0000000000000000000000000000000000000000",
    "LEVERAGE_PROXY_ACTION": "0x0000000000000000000000000000000000000000",
    "GEB_INCENTIVES_MINER": "0x0000000000000000000000000000000000000000",
    "GEB_SINGLE_CEILING_SETTER": "0x0000000000000000000000000000000000000000",
    "PROXY_DEBT_AUCTION_ACTIONS": "0x0000000000000000000000000000000000000000",
    "PROXY_SURPLUS_AUCTION_ACTIONS": "0x0000000000000000000000000000000000000000",
    "PROXY_SAVIOUR_ACTIONS": "0x0000000000000000000000000000000000000000",
    "SAFE_SAVIOUR_REGISTRY": "0x2C6F6784585B45906Fce24f30C99f8ad6d94b5d4",
    "MERKLE_DISTRIBUTOR_FACTORY": "0x0000000000000000000000000000000000000000",
    "COLLATERAL_AUCTION_THROTTLER": "0x0000000000000000000000000000000000000000",
    "FSM_WRAPPER_ETH" : "0x0000000000000000000000000000000000000000",
    "ESM_THRESHOLD_SETTER": "0x0000000000000000000000000000000000000000",
    "GEB_UNISWAP_SAVIOUR_LIQUIDITY_MANAGER": "0x0000000000000000000000000000000000000000",
    "GEB_SAVIOUR_CRATIO_SETTER": "0x0000000000000000000000000000000000000000",
    "GEB_COIN_ETH_UNISWAP_V2_POOL_SAVIOUR": "0x0000000000000000000000000000000000000000",
    "GEB_COIN_CURVE_V1_MAX_SAVIOUR": "0x0000000000000000000000000000000000000000",
    "DEBT_POPPER_REWARDS": "0x0000000000000000000000000000000000000000",
    "MEDIANIZER_RAI_REWARDS_RELAYER": "0x0000000000000000000000000000000000000000",
    "GEB_RRFM_SETTER_RELAYER": "0x0000000000000000000000000000000000000000",
    "GEB_UNISWAP_TWO_TRANCHE_MANAGER": "0x0000000000000000000000000000000000000000",
    "GEB_STAKING": "0x0000000000000000000000000000000000000000",
    "GEB_STAKED_PROT": "0x0000000000000000000000000000000000000000",
    "GEB_STAKING_TOKEN": "0x0000000000000000000000000000000000000000",
    "GEB_STAKING_AUCTION_HOUSE": "0x0000000000000000000000000000000000000000",
    "GEB_DEBT_FLOOR_ADJUSTER": "0x0000000000000000000000000000000000000000",
    "GEB_STAKING_REWARDS_ESCROW": "0x0000000000000000000000000000000000000000",
    "GEB_DEBT_AUCTION_INITIAL_PARAM_SETTER": "0x0000000000000000000000000000000000000000",
    "GEB_AUTO_SURPLUS_AUCTIONED": "0x0000000000000000000000000000000000000000",
    "GEB_AUTO_SURPLUS_BUFFER": "0x0000000000000000000000000000000000000000",
    "GEB_STAKED_TOKENS_TO_KEEP_SETTER": "0x0000000000000000000000000000000000000000",
    "GEB_STAKE_RECYCLING_SURPLUS_AUCTION_HOUSE": "0x0000000000000000000000000000000000000000",
    "GEB_STAKE_RECYCLING_TRIGGER": "0x0000000000000000000000000000000000000000",
    "GEB_YEARN_CURVE_MAX_SAVIOUR": "0x0000000000000000000000000000000000000000",
}

export const getAddressList = (network: GebDeployment): ContractList => {
    if (network === 'kovan') {
        return KOVAN_ADDRESSES
    } else if (network === 'mainnet') {
        return MAINNET_ADDRESSES
    } else if (network === 'rinkeby') {
        return RINKEBY_ADDRESSES
    } else {
        return network
    }
}
