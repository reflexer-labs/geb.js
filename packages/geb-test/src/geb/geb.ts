import { ethers } from 'ethers'
import assert from 'assert'

import { MAKER_KOVAN_NODE } from '../const'
import { Geb } from 'geb.js'
import { EthersProvider } from '@reflexer-finance/geb-ethers-provider'
import { KOVAN_ADDRESSES } from '@reflexer-finance/geb-contract-api'

export const testsGeb = () => {
    describe('Using a provider (Ethers OR web3)', async () => {
        const provider = new ethers.providers.JsonRpcProvider(MAKER_KOVAN_NODE)

        it('Create geb with ethers', async () => {
            const geb = new Geb('kovan', provider)

            const rate = await geb.contracts.oracleRelayer.redemptionRate()
            assert.ok(rate)
        })

        it('Create geb with gebProvider', async () => {
            const gebProvider = new EthersProvider(provider)
            const geb = new Geb('kovan', gebProvider)

            const rate = await geb.contracts.oracleRelayer.redemptionRate()
            assert.ok(rate)
        })

        it('Get proxy with geb', async () => {
            const geb = new Geb('kovan', provider)

            const proxy = await geb.getProxyAction(KOVAN_ADDRESSES.ETH_FROM)
            assert.equal(proxy.proxyAddress, KOVAN_ADDRESSES.PROXY_DEPLOYER)
        })
    })
}
