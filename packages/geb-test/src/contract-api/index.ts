import { EthersProvider } from '@reflexer-finance/geb-ethers-provider'
import { ethers } from 'ethers'
import { MAKER_KOVAN_NODE } from './../const'
import { testsWithGenericGebProvider } from './generic-provider-test'
import { testsWithEthersProvider } from './ehters-provider-tests'

describe('Test contract API', async () => {
    const provider = new ethers.providers.JsonRpcProvider(MAKER_KOVAN_NODE)
    const gebProvider = new EthersProvider(provider)

    // TODO: Call the same function but backed by web3
    testsWithGenericGebProvider(gebProvider)
    testsWithEthersProvider()
})
