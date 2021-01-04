import { GebAdmin } from '@reflexer-finance/geb-admin'
import assert from 'assert'
import { ContractList, GebEthersProvider } from 'geb.js'
import { ethers } from 'ethers'

export const testsGebAdmin = (
    rpcUrl: string,
    networkName: 'kovan' | 'mainnet',
    addresses: ContractList
) => {
    describe(`Network: ${networkName} RPC: ${rpcUrl}`, async () => {
        it('create a GebAdmin', async () => {
            const provider = new ethers.providers.StaticJsonRpcProvider(rpcUrl)
            const gebAdmin = new GebAdmin(networkName, provider)

            // Test a few stuff
            assert.strictEqual(
                await gebAdmin.contractsAdmin.multisigAdmin.address,
                addresses.GEB_MULTISIG
            )

            assert.strictEqual(
                await gebAdmin.contractsAdmin.pause.proxy(),
                addresses.GEB_PAUSE_PROXY
            )
        })

        it('Test webScheduleProposal', async () => {
            const provider = new ethers.providers.StaticJsonRpcProvider(rpcUrl)
            const gebProvider = new GebEthersProvider(provider)
            const gebAdmin = new GebAdmin(networkName, gebProvider)
            const execTime = 2524607999 // Just before Jan 1st 2050

            const data = await gebAdmin.webScheduleProposal(
                'modifyParameters(address,bytes32,uint256)',
                [
                    '0x18C5f335602C881EaA36d2a5A483186f61a7C087',
                    '0x676c6f62616c446562744365696c696e67000000000000000000000000000000',
                    '50000000000000000000000000000000000000000000000',
                ],
                execTime
            )

            // Inject the right gov action address and codeHash in the middle of the tx data
            const expectedData = `0x7a0c53b2000000000000000000000000${addresses.GEB_GOV_ACTIONS.toLowerCase().slice(
                2
            )}${(
                await gebProvider.extCodeHash(addresses.GEB_GOV_ACTIONS)
            ).slice(
                2
            )}000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000967a75ff0000000000000000000000000000000000000000000000000000000000000064ecf987ef00000000000000000000000018c5f335602c881eaa36d2a5a483186f61a7c087676c6f62616c446562744365696c696e6700000000000000000000000000000000000000000000000000000008c213d9da502de454526f422cc340000000000000000000000000000000000000000000000000000000000000000000`

            assert.strictEqual(data.data, expectedData)
            assert.ok(
                gebAdmin.verifyWebScheduleCallcode(
                    'modifyParameters(address,bytes32,uint256)',
                    [
                        '0x18C5f335602C881EaA36d2a5A483186f61a7C087',
                        '0x676c6f62616c446562744365696c696e67000000000000000000000000000000',
                        '50000000000000000000000000000000000000000000000',
                    ],
                    execTime,
                    expectedData
                )
            )
        })
    })
}
