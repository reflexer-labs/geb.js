import assert from 'assert'
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

    // TODO: Add this back when RAI launches
    // testContractPresence('mainnet', MAKER_MAINNET_NODE)
    // This condition to make sure we don't forget
    if (
        MAINNET_ADDRESSES.GEB_SAFE_ENGINE !==
        '0xf0b7808b940b78bE81ad6F9E075Ce8be4A837E2c'
    ) {
        assert.fail('New mainnet, add contract presence check back')
    }

    testsGebAdmin(MAKER_MAINNET_NODE, 'mainnet', MAINNET_ADDRESSES)
})
