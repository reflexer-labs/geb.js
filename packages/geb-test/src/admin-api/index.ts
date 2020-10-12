import { MAKER_KOVAN_NODE } from './../const'
import { GebAdmin } from '@reflexer-finance/geb-admin'
import { ethers } from 'ethers'
import { testContractPresence } from './contracts'
import { KOVAN_ADDRESSES } from '@reflexer-finance/geb-contract-base'
import assert from 'assert'
import { GebEthersProvider } from 'geb.js'

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

    it('Test webScheduleProposal', async () => {
        const provider = new ethers.providers.JsonRpcProvider(MAKER_KOVAN_NODE)
        const gebProvider = new GebEthersProvider(provider)
        const gebAdmin = new GebAdmin('kovan', gebProvider)

        const data = await gebAdmin.webScheduleProposal(
            'modifyParameters(address,bytes32,uint256)',
            [
                '0x18C5f335602C881EaA36d2a5A483186f61a7C087',
                '0x676c6f62616c446562744365696c696e67000000000000000000000000000000',
                '50000000000000000000000000000000000000000000000',
            ],
            1602091914
        )

        // Inject the right gov action address and codeHash in the middle of the tx data
        const expectedData = `0x7a0c53b2000000000000000000000000${KOVAN_ADDRESSES.GEB_GOV_ACTIONS.toLowerCase().slice(
            2
        )}${(
            await gebProvider.extCodeHash(KOVAN_ADDRESSES.GEB_GOV_ACTIONS)
        ).slice(
            2
        )}0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000005f7dfb8a0000000000000000000000000000000000000000000000000000000000000064ecf987ef00000000000000000000000018c5f335602c881eaa36d2a5a483186f61a7c087676c6f62616c446562744365696c696e6700000000000000000000000000000000000000000000000000000008c213d9da502de454526f422cc340000000000000000000000000000000000000000000000000000000000000000000`

        assert.strictEqual(data.data, expectedData)
        assert.ok(
            gebAdmin.verifyWebScheduleCallcode(
                'modifyParameters(address,bytes32,uint256)',
                [
                    '0x18C5f335602C881EaA36d2a5A483186f61a7C087',
                    '0x676c6f62616c446562744365696c696e67000000000000000000000000000000',
                    '50000000000000000000000000000000000000000000000',
                ],
                1602091914,
                expectedData
            )
        )
    })
})
