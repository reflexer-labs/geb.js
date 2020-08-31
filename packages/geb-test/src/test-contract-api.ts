import assert from 'assert'

import { ethers } from 'ethers'
import { SafeEngine } from '@reflexer-finance/geb-contract-api'
import { EthersProvider } from '@reflexer-finance/geb-ethers-provider'

describe('Test contract API with Ethers provider', async () => {
    // TODO: move to testchain
    const provider = new ethers.providers.JsonRpcProvider(
        'https://kovan.infura.io/v3/7a5c8172af0d41fd896a18dd1d866f87'
    )
    const gebProvider = new EthersProvider(provider)
    const api = new SafeEngine(
        'SafeEngine',
        '0xc06e2cc879F306Ae1ad3eAAa450B6aA57cd6798C',
        gebProvider
    )

    const globalDebt = await api.globalDebt()
    console.log(globalDebt)
    assert.equal(globalDebt.toString(), '0')
})
