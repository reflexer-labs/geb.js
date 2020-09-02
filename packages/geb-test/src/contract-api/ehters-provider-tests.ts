import assert from 'assert'
import {
    NULL_ADDRESS,
    ONE_ADDRESS,
    DUMMY_PRIVATE_KEY,
    MAKER_KOVAN_NODE,
} from '../const'
import { ethers } from 'ethers'
import { EthersProvider } from '@reflexer-finance/geb-ethers-provider'
import { SafeEngine, KOVAN_ADDRESSES } from '@reflexer-finance/geb-contract-api'

export const testsWithEthersProvider = () => {
    describe('Test made only for Ethers', () => {
        let wallet: ethers.Wallet
        let gebProvider: EthersProvider
        beforeEach(() => {
            const provider = new ethers.providers.JsonRpcProvider(
                MAKER_KOVAN_NODE
            )
            wallet = new ethers.Wallet(DUMMY_PRIVATE_KEY, provider)
            gebProvider = new EthersProvider(provider)
        })
        it('Test send with signer (fail)', async () => {
            const safeEngine = new SafeEngine(
                KOVAN_ADDRESSES.GEB_SAFE_ENGINE,
                gebProvider
            )

            const tx = await safeEngine.transferInternalCoins(
                NULL_ADDRESS,
                ONE_ADDRESS,
                '0'
            )

            try {
                await wallet.call(tx)
                assert.fail('This dummy Address should have no balance')
            } catch (err) {
                // This random address should have no balance
                assert.equal(
                    gebProvider.decodeError(err.error),
                    'SAFEEngine/not-allowed'
                )
            }
        })
    })
}
