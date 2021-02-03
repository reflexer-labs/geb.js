import assert from 'assert'
import { GebEthersProvider } from '@reflexer-finance/geb-ethers-provider'
import { ethers } from 'ethers'
import { MAKER_KOVAN_NODE, MAKER_MAINNET_NODE } from './../const'
import { testsWithGenericGebProvider } from './generic-provider-test'
import { testsWithEthersProvider } from './ehters-provider-tests'
import { testContractPresence } from './contracts'
import { KOVAN_ADDRESSES, MAINNET_ADDRESSES } from 'geb.js'

describe('Test contract API', async () => {
    // Kovan
    const providerKovan = new ethers.providers.StaticJsonRpcProvider(
        MAKER_KOVAN_NODE
    )
    const gebProviderKovan = new GebEthersProvider(providerKovan)

    testsWithGenericGebProvider(gebProviderKovan, KOVAN_ADDRESSES, 'kovan')
    testsWithEthersProvider(KOVAN_ADDRESSES, MAKER_KOVAN_NODE, 'kovan')
    testContractPresence('kovan', MAKER_KOVAN_NODE)

    // Mainnet
    const providerMainnet = new ethers.providers.StaticJsonRpcProvider(
        MAKER_MAINNET_NODE
    )
    const gebProviderMainnet = new GebEthersProvider(providerMainnet)

    testsWithGenericGebProvider(
        gebProviderMainnet,
        MAINNET_ADDRESSES,
        'mainnet'
    )

    testsWithEthersProvider(MAINNET_ADDRESSES, MAKER_MAINNET_NODE, 'mainnet')

    // TODO: Add this back when RAI launches
    // testContractPresence('mainnet', MAKER_MAINNET_NODE)
    // This condition to make sure we don't forget
    if (
        MAINNET_ADDRESSES.GEB_SAFE_ENGINE !==
        '0xf0b7808b940b78bE81ad6F9E075Ce8be4A837E2c'
    ) {
        assert.fail('New mainnet, add contract presence check back')
    }
})
