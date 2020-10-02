import assert from 'assert'
import {
    NULL_ADDRESS,
    ONE_ADDRESS,
    DUMMY_PRIVATE_KEY,
    MAKER_KOVAN_NODE,
} from '../const'
import { ethers } from 'ethers'
import { GebEthersProvider } from '@reflexer-finance/geb-ethers-provider'
import {
    SafeEngine,
    BasicCollateralJoin,
    Weth9,
    ContractApis,
} from '@reflexer-finance/geb-contract-api'
import { KOVAN_ADDRESSES } from '@reflexer-finance/geb-contract-base'
import { utils } from 'geb.js'

export const testsWithEthersProvider = () => {
    describe('Test made only for Ethers', () => {
        let wallet: ethers.Wallet
        let gebProvider: GebEthersProvider
        beforeEach(() => {
            const provider = new ethers.providers.JsonRpcProvider(
                MAKER_KOVAN_NODE
            )
            wallet = new ethers.Wallet(DUMMY_PRIVATE_KEY, provider)
            gebProvider = new GebEthersProvider(provider)
        })
        it('Test ethers transferInternalCoins call failed', async () => {
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
                // This random address should not be allowed to control this wallet balance
                await wallet.call(tx)
                assert.fail('This dummy Address should have no balance')
            } catch (err) {
                assert.equal(
                    utils.decodeChainError(err.error),
                    'SAFEEngine/not-allowed'
                )
            }
        })

        // TODO: Due to whitelisting feature of the beta mainnet test, we can't test successful Join.
        // it('Test join function with ethers from contraApis', async () => {
        //     const contracts = new ContractApis('kovan', gebProvider)

        //     const tx = await contracts.joinETH_A.join(
        //         wallet.address,
        //         ethers.utils.parseEther('0')
        //     )

        //     try {
        //         await wallet.call(tx)
        //     } catch(err) {
        //         assert.fail(`Should not have failed. Error code ${utils.decodeChainError(err)}`)
        //     }
        // })

        it('Test join function failed with ethers', async () => {
            const ethJoin = new BasicCollateralJoin(
                KOVAN_ADDRESSES.GEB_JOIN_ETH_A,
                gebProvider
            )

            // We don't have funds
            const tx = await ethJoin.join(
                wallet.address,
                ethers.utils.parseEther('1')
            )

            try {
                await wallet.call(tx)
                assert.fail('Should have fail')
            } catch (err) {
                assert.equal(utils.decodeChainError(err), '0x')
            }
        })

        it('Test ethers transferInternalCoins sendTransaction (fail)', async () => {
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
                // This random address should not be allowed to control this wallet balance
                await wallet.sendTransaction(tx)
                assert.fail()
            } catch (err) {
                // This random address should have no balance
                assert.equal(utils.decodeChainError(err.error), 'Reverted')
            }
        })

        it('Test ethers payable call', async () => {
            const contracts = new ContractApis('kovan', gebProvider)

            const weth = new Weth9(
                await contracts.joinETH_A.collateral(),
                gebProvider
            )

            // Note: The value field is ignored when using 'call'
            const tx = await weth.deposit(ethers.utils.parseEther('1000000'))

            await wallet.call(tx)
        })

        it('Test ethers payable sendTransaction insufficient funds', async () => {
            const contracts = new ContractApis('kovan', gebProvider)

            const weth = new Weth9(
                await contracts.joinETH_A.collateral(),
                gebProvider
            )

            // Make sure to trigger insufficient funds error
            const tx = await weth.deposit(ethers.utils.parseEther('100000000'))

            try {
                await wallet.sendTransaction(tx)
            } catch (err) {
                assert.ok(
                    utils.decodeChainError(err).includes('Insufficient funds')
                )
            }
        })
    })
}
