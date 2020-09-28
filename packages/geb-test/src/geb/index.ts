import { GebEthersProvider } from '@reflexer-finance/geb-ethers-provider'
import { ethers } from 'ethers'
import { MAKER_KOVAN_NODE } from './../const'
import { testsProxyActionWithGenericGebProvider } from './proxy-actions'
import { testsGeb } from './geb'

describe('Test Geb', async () => {
    const provider = new ethers.providers.JsonRpcProvider(MAKER_KOVAN_NODE)
    const gebProvider = new GebEthersProvider(provider)

    testsProxyActionWithGenericGebProvider(gebProvider)
    testsGeb(gebProvider, MAKER_KOVAN_NODE)

    // TODO: test against infura
    // testsGeb(gebProvider, INFURA_KOVAN)
})
