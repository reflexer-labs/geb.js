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
    | 'PRINTING_PERMISSIONS_REGISTRY'
    | 'GEB_PAUSE_AUTHORITY'
    | 'GEB_POLLING_EMITTER'
    | 'GEB_SAFE_ENGINE'
    | 'GEB_TAX_COLLECTOR'
    | 'GEB_LIQUIDATION_ENGINE'
    | 'GEB_ACCOUNTING_ENGINE'
    | 'GEB_COIN_JOIN'
    | 'GEB_PRE_SETTLEMENT_SURPLUS_AUCTION_HOUSE'
    | 'GEB_DEBT_AUCTION_HOUSE'
    | 'GEB_PAUSE'
    // | 'GEB_GOV_PROTESTER'
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
    // | 'MEDIANIZER_RAI'
    // | 'FEED_SECURITY_MODULE_RAI'
    // | 'MEDIANIZER_FLX'
    // | 'FEED_SECURITY_MODULE_FLX'
    | 'ETH'
    | 'MEDIANIZER_ETH'
    | 'FEED_SECURITY_MODULE_ETH'
    | 'GEB_JOIN_ETH_A'
    | 'GEB_COLLATERAL_AUCTION_HOUSE_ETH_A'
    | 'PROXY_PAUSE_ACTIONS'
    | 'PROXY_PAUSE_SCHEDULE_ACTIONS'
    | 'PROXY_DEPLOYER'
    | 'UNISWAP_FACTORY'
    | 'UNISWAP_ROUTER'
    | 'GEB_DS_COMPARE'
    | 'GEB_TX_MANAGER'
    | 'GEB_RRFM_VALIDATOR'
    | 'GEB_RRFM_SETTER'
    | 'MEDIANIZER_PRAI'
    | 'FEED_SECURITY_MODULE_PRAI'
    | 'GEB_DUMMY_RRFM_VALIDATOR'

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
    "ETH_FROM": "0xFc5C3A40BC9b8AD5D179036f5489c573C9d91c7f",
    "STARTING_BLOCK_NUMBER": "21461380",
    "PROXY_DEPLOYER": "0xDE27D6E7669fDF68a0E2Ee8fda8312Bb6ACc1Bdc",
    "COIN_TYPE": "INDEX",
    "GOVERNANCE_TYPE": "MULTISIG-SAFE",
    "MULTICALL": "0xf7151E407623fcEC2DA166cDfDE2A48dE692A4ea",
    "FAUCET": "0xb82619030ee6fBF010b02cce544FbD6758574090",
    "GEB_MULTISIG": "0x6529cE1070Bf93E78584285Ca6bb269Ea34650a3",
    "GEB_MULTISIG_PROXY": "0x77cFAAda83F19ec5b13De85fc21a9609CdF228B8",
    "GEB_DEPLOY": "0x42898bc81f6500BAEd9Ae269ea02b9589Ac3530b",
    "GEB_PROT": "0x0000000000000000000000000000000000000000",
    "GEB_PAUSE_AUTHORITY": "0x81Ce5dd26ad275ee6fA95f174c5F87185A340e7f",
    "GEB_POLLING_EMITTER": "0x065decdC7cb340Bb128809ac252f8CE9C827347A",
    "GEB_SAFE_ENGINE": "0x393859553460eefDCf3Ec352d43AF5eF67354792",
    "GEB_TAX_COLLECTOR": "0xaC6B68968D7b74e679d73cf86De081E4c54a55B5",
    "GEB_LIQUIDATION_ENGINE": "0xfB8Ab80e5318F2eD0Ef14d5B91609c48B8EcA54b",
    "GEB_ACCOUNTING_ENGINE": "0x05DEac0A37349975b895c1bc05786D098906844C",
    "GEB_COIN_JOIN": "0x28d25789106B468D1767F19496844d6386e8A9E3",
    "GEB_PRE_SETTLEMENT_SURPLUS_AUCTION_HOUSE": "0xD19E74Dda947d031120B3231C75fa04a4628C348",
    "GEB_DEBT_AUCTION_HOUSE": "0xa4E85316d898FEc71ee2cb8189bF389bE25CBEc7",
    "GEB_PAUSE": "0xbE73590607b620D5dAcBB8CCA96dAE7a2748e53a",
    "GEB_PAUSE_PROXY": "0x331e6693496418CDf9658Fe29ce65c9cFECb9978",
    "GEB_GOV_ACTIONS": "0x9659074fac65bA25656950Af1a505F0ef5aDC0d7",
    "GEB_COIN": "0xE60E0518e7f8dfB2Ab5C58dad2fE95b782193EF4",
    "GEB_ORACLE_RELAYER": "0xd9f2F171E74E75b7E04a53F13453f8520556677C",
    "GEB_GLOBAL_SETTLEMENT": "0xd3e1BA40C8eca2C8BEbd1Ab8CfBC5148B0E2D933",
    "GEB_STABILITY_FEE_TREASURY": "0x7dbA61C2CF3715783955657ECf3679350485D311",
    "GEB_ESM": "0x0000000000000000000000000000000000000000",
    "GEB_RRFM_VALIDATOR": "0xd5334b647945cA60C90D61AD48A93261C8336d7B",
    "GEB_DUMMY_RRFM_VALIDATOR": "0x6a605E13Ca7e288F2F92DBfF92bEd5d960f573f5",
    "GEB_RRFM_SETTER": "0xb75ac80f397cDD24cd357ea93c22Dc2B87265011",
    "PROXY_ACTIONS": "0x6029515e32026b3B9F6D2Eda1b5546d68e6d2EBb",
    "PROXY_ACTIONS_GLOBAL_SETTLEMENT": "0xF974189bFCE3F16DECD66578E924413b2262A680",
    "SAFE_MANAGER": "0xe546C41e7a0eB13cAB5E76896495c41BF8efC797",
    "GET_SAFES": "0x3ABefaCDE2631A862892870a7A9cc202EA136c70",
    "FSM_GOV_INTERFACE": "0xf4a39B791BBcf234054232C779C08A356E2aF23e",
    "PROXY_FACTORY": "0x786adB6413619D3b4703da596C6cC747cCA105c5",
    "PROXY_REGISTRY": "0xC590Cb5F4b5c8eC922f3A8Aa9aD51E31E26737c9",
    "MEDIANIZER_PRAI": "0x8624C75F33a346A2Fdc437673Abc865452003d29",
    "FEED_SECURITY_MODULE_PRAI": "0xbC02173be0A388e79787F100d9D3E2Eb8CE38D49",
    "ETH": "0xd0A1E359811322d97991E03f863a0C30C2cF029C",
    "MEDIANIZER_ETH": "0x5ABD32CB12908e33323d696A3faB4d54c86cD630",
    "FEED_SECURITY_MODULE_ETH": "0xB82De236bf827eeA99938d4e92a341686AB25912",
    "GEB_JOIN_ETH_A": "0xb8901BCa53aD15D1D5337340354C1A7281630256",
    "GEB_COLLATERAL_AUCTION_HOUSE_ETH_A": "0xEcF20EC2dDc831e99a54cA23D244ce2BDfed07F1",
    "PROXY_PAUSE_ACTIONS": "0x53195AD302665E365464FFd3A70EE2AD4EDF5219",
    "PROXY_PAUSE_SCHEDULE_ACTIONS": "0x15AFA108A12FC90ad9DD1e01E7F8b77B49082102",
    "UNISWAP_FACTORY": "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    "UNISWAP_ROUTER": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    "GEB_DS_COMPARE": "0x63fB288BeB645530cA36c062fA276a5C5C2AB132",
    "GEB_TX_MANAGER": "0xd384ebEf7492F485b1464360fc66FC0f5722c6B6",
    "PROTOCOL_TOKEN_AUTHORITY": "0x0000000000000000000000000000000000000000",
    "PRINTING_PERMISSIONS_REGISTRY": "0x0000000000000000000000000000000000000000",
    "GEB_ESM_TOKEN_BURNER": "0x0000000000000000000000000000000000000000",
}

// prettier-ignore
export const MAINNET_ADDRESSES: ContractList = {
    "ETH_FROM": "0xB27F5cb35F436c09cA4310BA2711d7a18c96be21",
    "STARTING_BLOCK_NUMBER": "11120888",
    "PROXY_DEPLOYER": "0x9b4b52c0FFAD701B5dcb071c5A2f521033898a40",
    "COIN_TYPE": "INDEX",
    "GOVERNANCE_TYPE": "MULTISIG-SAFE",
    "MULTICALL": "0x528820aB41ee432Fa17bDB19ADD94a0247AE7acc",
    "FAUCET": "0x0000000000000000000000000000000000000000",
    "GEB_MULTISIG": "0x9d5ab5758ac8b14BEe81bBd4f019a1a048Cf2246",
    "GEB_MULTISIG_PROXY": "0x5240Bde6CdaE800Cc100A140B05866fB6D0B6E38",
    "GEB_DEPLOY": "0xfBC623Df947AA7F9B2E87ac051c962939de9A325",
    "GEB_PROT": "0x0000000000000000000000000000000000000000",
    "PROTOCOL_TOKEN_AUTHORITY": "0x05d60fEE5E7169b64A66487aB76123C31371d38c",
    "PRINTING_PERMISSIONS_REGISTRY": "0x34482E810caB4760f1e22ccBA2b95bc221412851",
    "GEB_PAUSE_AUTHORITY": "0x92321Cf8530fE33e9b36750154922A55306d5143",
    "GEB_POLLING_EMITTER": "0x7970C853B0778667882E35716f22cC8900533af3",
    "GEB_SAFE_ENGINE": "0xf0b7808b940b78bE81ad6F9E075Ce8be4A837E2c",
    "GEB_TAX_COLLECTOR": "0x8c54a5E6e39b12906A0e53455B7f5Fff379E324e",
    "GEB_LIQUIDATION_ENGINE": "0x8eA70611850d13856877d9ED8035D07E80Eb0B73",
    "GEB_ACCOUNTING_ENGINE": "0x89E8bd799ab06Dd7EE2Be1325FAfEF1Ab48676bc",
    "GEB_COIN_JOIN": "0x138c3d13b633b5a5cb5db5faf27429eeed78b338",
    "GEB_PRE_SETTLEMENT_SURPLUS_AUCTION_HOUSE": "0xe8Bd8179Da781d17383708d0831B1Da1Efa85A57",
    "GEB_DEBT_AUCTION_HOUSE": "0x49C3Dd1d66D2919611dbde40dE088e85B9f96851",
    "GEB_PAUSE": "0xc732F0579807E2776d1cf877Ce6EBF297Eb49Dde",
    "GEB_PAUSE_PROXY": "0xD487eab6902295B650c8940277Bd07f684CE91aD",
    "GEB_GOV_ACTIONS": "0xfcedcaaa80b497ac0171e9c09c10448a05b00314",
    "GEB_COIN": "0x715c3830fb0c4bab9a8e31c922626e1757716f3a",
    "GEB_ORACLE_RELAYER": "0x2b56976b6E95304F9B3d9736aaa610e963422ccD",
    "GEB_GLOBAL_SETTLEMENT": "0x4d37Ef04724fec8b80AAB3F6B7e7F4ef4181D9a9",
    "GEB_STABILITY_FEE_TREASURY": "0xfF6D7479C0882dAa3212785adAF7786d1Df09cB8",
    "GEB_ESM": "0x0000000000000000000000000000000000000000",
    "GEB_ESM_TOKEN_BURNER": "0x3112556a8F4d787a7A2Ca497F00685dA21157467",
    "GEB_RRFM_VALIDATOR": "0x64Ad684378770Fe3EE4b437737edF379f12A902a",
    "GEB_DUMMY_RRFM_VALIDATOR": "0x70c2403b8E85b4099Cd23946A80922B39369Cc08",
    "GEB_RRFM_SETTER": "0x9262136738B9962cb8016b8421642aD65faEa055",
    "PROXY_ACTIONS": "0x84FE452d9fb495A335C74a225e6AD52C35eB8616",
    "PROXY_ACTIONS_GLOBAL_SETTLEMENT": "0x134b155a5411F2e3B7234B5A87c5eE8aAA489e8b",
    "SAFE_MANAGER": "0xdF88b73462abD08f145b4b31edf4966C7129B255",
    "GET_SAFES": "0xD4c54A749611dA71A433153c00b6A522E82d8e3D",
    "FSM_GOV_INTERFACE": "0xB42F7f8b9a067b667Ae4F67F339778839f517eCc",
    "PROXY_FACTORY": "0x8dF7Eb5D8C3255e254AACDb538539Bda38610c81",
    "PROXY_REGISTRY": "0xF89A0e02af0fd840b0FcF5d103e1b1C74C8b7638",
    "MEDIANIZER_PRAI": "0xcA8A1a8E6D83c2b2e933e05a5099cF814169E7d4",
    "FEED_SECURITY_MODULE_PRAI": "0x206d268c0bBf3fBd8dAB35BA91ca89203A3c59AA",
    "ETH": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "MEDIANIZER_ETH": "0x9f816FCE2885F4DC65a7342B57Ced29655fCA712",
    "FEED_SECURITY_MODULE_ETH": "0x5b89fF2DeCd360Aa01cbd453AA2cEd4F23b674b6",
    "GEB_JOIN_ETH_A": "0xE843783144AcDf485Ff86D726bCb67dD316e0BBE",
    "GEB_COLLATERAL_AUCTION_HOUSE_ETH_A": "0x191ba53C077D3E9eC2CBE6f52Eb0a33Ea1A226f2",
    "PROXY_PAUSE_ACTIONS": "0x44d09f1E8Ab9063a36aC74a9599B825e72F54162",
    "PROXY_PAUSE_SCHEDULE_ACTIONS": "0x1C19c98d010d85a4e26A183581f81E1f643D64a6",
    "UNISWAP_FACTORY": "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    "UNISWAP_ROUTER": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    "GEB_DS_COMPARE": "0x77d9d9D3e01d7C5043417154Bfc3ff2e0104f004",
    "GEB_TX_MANAGER": "0xc9965E5674332753f24c6137d6ddAC0d693a0a95"
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
    "GEB_PRE_SETTLEMENT_SURPLUS_AUCTION_HOUSE": "0x822D7574C382Cb0Ed2ceEbEFEeD5a3716cD8ef68",
    "GEB_DEBT_AUCTION_HOUSE": "0x55F004bEA4dD46CF529fA0E1CB9F11c24CD768ce",
    "GEB_PAUSE": "0x63B5F3fc34F5c00F3dF5E9d0bC5677f8E2d8aa81",
    "GEB_PAUSE_PROXY": "0x91A49D98911D74e19b81d10AC31FAA0A798249C5",
    "GEB_GOV_ACTIONS": "0x37Df6a3fdB306AaD9fC99eB9E1f1069073913a3F",
    "GEB_COIN": "0x1C6f922b5a1b29329B2854789F784Bb849ff3b4b",
    "GEB_ORACLE_RELAYER": "0x550Aa609c94a3b08A4b473D9f3cc56527C769D7d",
    "GEB_GLOBAL_SETTLEMENT": "0xaEE64AB4c7Ef82084B364960a2DCF9D06f985F50",
    "GEB_STABILITY_FEE_TREASURY": "0x3e5925fc04283555ed8274Fdc5038f69A47891BE",
    "GEB_ESM": "0x0000000000000000000000000000000000000000",
    "GEB_RRFM_VALIDATOR": "0xB6F539EcC4baF3fF0EeaC2342bb608FbAABD0076",
    "GEB_RRFM_SETTER": "0xA58E1b2c04691D839D76455560B7412F425c62a9",
    "PROXY_ACTIONS": "0xde51B3430a2c910f49f4B4C9Ad5AC7cD988De8c3",
    "PROXY_ACTIONS_GLOBAL_SETTLEMENT": "0xA09EAe61bEE5cE3a9Ac9f0360144c8D3aBc27931",
    "SAFE_MANAGER": "0x3C65A7668535B0242844Dd3e27ff4B253F94B873",
    "GET_SAFES": "0xc4E8508348d81A20ADC7F0CA21A03a512D92D15a",
    "FSM_GOV_INTERFACE": "0x7A7AaAD445b6843a86204f5f1E017eD8F30c6116",
    "PROXY_FACTORY": "0x6Ea1f20E33dB81f3a16F6d8002F2389e147a886f",
    "PROXY_REGISTRY": "0x92EDB4F6c1AA2136DdfdE8EcB9c2A7c77d240B44",
    "MEDIANIZER_PRAI": "0xC6370ff2620f447f2224E80BFf63748639daE154",
    "FEED_SECURITY_MODULE_PRAI": "0x21Bc5089f257a36Bf8FA10c773ccaACAb4Aa3491",
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
    "GEB_DUMMY_RRFM_VALIDATOR": "0x0000000000000000000000000000000000000000",
    "PROTOCOL_TOKEN_AUTHORITY": "0x0000000000000000000000000000000000000000",
    "PRINTING_PERMISSIONS_REGISTRY": "0x0000000000000000000000000000000000000000",
    "GEB_ESM_TOKEN_BURNER": "0x0000000000000000000000000000000000000000",

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
