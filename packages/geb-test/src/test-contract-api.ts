import assert from 'assert'

import { ethers } from 'ethers'
import { SafeEngine } from '@reflexer-finance/geb-contract-api'
import { EthersProvider } from '@reflexer-finance/geb-ethers-provider'

const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
const ONE_ADDRESS = '0x0000000000000000000000000000000000000001'
const DUMMY_PRIVATE_KEY =
    '0x0000000000000000000000000000000000000000000000000000000000000001'
const ETH_A =
    '0x4554482d41000000000000000000000000000000000000000000000000000000'

describe('Test contract API', async () => {
    let provider: ethers.providers.Provider
    describe('using ethers', async () => {
        let gebProvider: EthersProvider
        let safeEngine: SafeEngine<ethers.PopulatedTransaction>

        beforeEach(() => {
            // TODO: move to testchain
            provider = new ethers.providers.JsonRpcProvider(
                'https://kovan.infura.io/v3/7a5c8172af0d41fd896a18dd1d866f87'
            )
            gebProvider = new EthersProvider(provider)
            safeEngine = new SafeEngine(
                'SafeEngine',
                '0xc06e2cc879F306Ae1ad3eAAa450B6aA57cd6798C',
                gebProvider
            )
        })

        it('Test call with single return value', async () => {
            const globalDebt = await safeEngine.globalDebt()
            assert(globalDebt.gt(0))

            const coinBalance = await safeEngine.coinBalance(NULL_ADDRESS)
            assert(coinBalance.isZero())

            const collateralBalance = await safeEngine.tokenCollateral(
                ETH_A,
                NULL_ADDRESS
            )
            assert(collateralBalance.isZero())
        })

        it('Test call with several return values', async () => {
            const collateralInfo = await safeEngine.collateralTypes(ETH_A)
            assert(collateralInfo.accumulatedRate.gt(0))
            assert(collateralInfo.debtAmount.gte(0))
        })

        it('Test send with estimate gas', async () => {
            const tx = await safeEngine.transferInternalCoins(
                NULL_ADDRESS,
                ONE_ADDRESS,
                '0'
            )
            assert.equal(tx.to, safeEngine.address)
            assert(tx.data.length >= 8) // Should at least have the function selector

            // Estimate the gas cost which emulate the transaction on the node
            const gasEstimate = await provider.estimateGas(tx)
            assert(gasEstimate.gte(20000))
        })

        it('Test send fail with estimate gas', async () => {
            const tx = await safeEngine.transferInternalCoins(
                NULL_ADDRESS,
                ONE_ADDRESS,
                '1'
            )

            tx.from = NULL_ADDRESS

            try {
                await provider.estimateGas(tx)
                assert.fail('Address 0x0 should have no balance')
            } catch (err) {
                assert.equal(err.error.data, 'Reverted')
            }
        })

        it('Test send with signer (fail)', async () => {
            const tx = await safeEngine.transferInternalCoins(
                NULL_ADDRESS,
                ONE_ADDRESS,
                '0'
            )

            const wallet = new ethers.Wallet(DUMMY_PRIVATE_KEY, provider)

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
})
