import { MAKER_KOVAN_NODE, MAKER_MAINNET_NODE } from './../const'
import { testContractPresence } from './contracts'
import {
    KOVAN_ADDRESSES,
    MAINNET_ADDRESSES,
} from '@reflexer-finance/geb-contract-base'
import { testsGebAdmin } from './geb-admin'

describe('Test contract admin API', async () => {
    // Kovan
    testContractPresence('kovan', MAKER_KOVAN_NODE)
    testsGebAdmin(MAKER_KOVAN_NODE, 'kovan', KOVAN_ADDRESSES)

    // Mainnet
    testContractPresence('mainnet', MAKER_MAINNET_NODE)
    testsGebAdmin(MAKER_MAINNET_NODE, 'mainnet', MAINNET_ADDRESSES)
})
