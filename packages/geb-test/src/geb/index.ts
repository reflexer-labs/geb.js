import { EthersProvider } from '@reflexer-finance/geb-ethers-provider'
import { ethers } from 'ethers'
import { MAKER_KOVAN_NODE } from './../const'
import { testsProxyActionWithGenericGebProvider } from './proxy-actions'

describe('Test Geb', async () => {
    const provider = new ethers.providers.JsonRpcProvider(MAKER_KOVAN_NODE)
    const gebProvider = new EthersProvider(provider)

    testsProxyActionWithGenericGebProvider(gebProvider)
})
