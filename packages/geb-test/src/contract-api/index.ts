import { GebEthersProvider } from '@reflexer-finance/geb-ethers-provider'
import { ethers } from 'ethers'
import { MAKER_KOVAN_NODE } from './../const'
import { testsWithGenericGebProvider } from './generic-provider-test'
import { testsWithEthersProvider } from './ehters-provider-tests'
import { testContractPresence } from './contracts'

describe('Test contract API', async () => {
    const provider = new ethers.providers.JsonRpcProvider(MAKER_KOVAN_NODE)
    const gebProvider = new GebEthersProvider(provider)

    // TODO: Call the same function but backed by web3
    testsWithGenericGebProvider(gebProvider)
    testsWithEthersProvider()

    // TODO: call the same for mainnet addresses
    testContractPresence('kovan', MAKER_KOVAN_NODE)
})
