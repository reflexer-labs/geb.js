import { MAKER_KOVAN_NODE } from './../const'
import { GebAdmin } from '@reflexer-finance/geb-admin'
import { ethers } from 'ethers'
import { testContractPresence } from './contracts'
import { KOVAN_ADDRESSES } from '@reflexer-finance/geb-contract-base'
import assert from 'assert'

describe('Test contract API', async () => {
    testContractPresence('kovan', MAKER_KOVAN_NODE)

    it('create a GebAdmin', async () => {
        const provider = new ethers.providers.JsonRpcProvider(MAKER_KOVAN_NODE)
        const gebAdmin = new GebAdmin('kovan', provider)

        // Test a few stuff
        assert.strictEqual(
            await gebAdmin.contractsAdmin.multisigAdmin.address,
            KOVAN_ADDRESSES.GEB_MULTISIG
        )

        assert.strictEqual(
            await gebAdmin.contractsAdmin.pause.proxy(),
            KOVAN_ADDRESSES.GEB_PAUSE_PROXY
        )
    })
})
