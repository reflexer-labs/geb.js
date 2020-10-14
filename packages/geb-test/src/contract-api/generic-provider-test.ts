import assert from 'assert'

import {
    SafeEngine,
    OracleRelayer,
    ContractApis,
    StabilityFeeTreasury,
} from '@reflexer-finance/geb-contract-api'
import {
    GebProviderInterface,
    KOVAN_ADDRESSES,
} from '@reflexer-finance/geb-contract-base'
import { NULL_ADDRESS, ETH_A, ONE_ADDRESS } from './../const'
import { utils } from 'geb.js'

export const testsWithGenericGebProvider = (
    gebProvider: GebProviderInterface
) => {
    describe('Using a provider (Ethers OR web3)', async () => {
        let safeEngine: SafeEngine

        beforeEach(() => {
            safeEngine = new SafeEngine(
                KOVAN_ADDRESSES.GEB_SAFE_ENGINE,
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

        it('Test send', async () => {
            const tx = await safeEngine.transferInternalCoins(
                NULL_ADDRESS,
                ONE_ADDRESS,
                '0'
            )
            assert.equal(tx.to, safeEngine.address)
            assert(tx.data.length >= 8) // Should at least have the function selector

            tx.from = NULL_ADDRESS

            try {
                await gebProvider.ethCall(tx)
            } catch (err) {
                assert.fail(utils.getRequireString(err))
            }
        })

        it('Test send fail error', async () => {
            const tx = await safeEngine.transferInternalCoins(
                NULL_ADDRESS,
                ONE_ADDRESS,
                '1'
            )

            tx.from = NULL_ADDRESS

            try {
                await gebProvider.ethCall(tx)
                assert.fail('Address 0x0 should have no balance')
            } catch (err) {
                assert.equal(utils.getRequireString(err), null)
            }
        })

        it('Test Oracle relayer', async () => {
            const oracleRelayer = new OracleRelayer(
                KOVAN_ADDRESSES.GEB_ORACLE_RELAYER,
                gebProvider
            )

            const rate = await oracleRelayer.redemptionRate()
            assert.ok(rate.gt(1))
        })

        it('Test Oracle relayer redemptionPrice_readOnly', async () => {
            const oracleRelayer = new OracleRelayer(
                KOVAN_ADDRESSES.GEB_ORACLE_RELAYER,
                gebProvider
            )

            const rate = await oracleRelayer.redemptionPrice_readOnly()
            assert.ok(rate.gt(0))
        })

        it('Test with contract API factory', async () => {
            const contracts = new ContractApis('kovan', gebProvider)

            assert.equal(
                contracts.debtAuctionHouse.address,
                KOVAN_ADDRESSES.GEB_DEBT_AUCTION_HOUSE
            )

            const debtHouse = await contracts.accountingEngine.debtAuctionHouse()

            assert.equal(debtHouse, KOVAN_ADDRESSES.GEB_DEBT_AUCTION_HOUSE)
        })

        it('Test overloaded function', async () => {
            const tx1 = safeEngine.modifyParameters1(ETH_A, ETH_A, '200')
            const tx2 = safeEngine.modifyParameters2(ETH_A, '1000')

            try {
                await gebProvider.ethCall(tx1)
                assert.fail()
            } catch (err) {
                assert.equal(
                    utils.getRequireString(err),
                    'SAFEEngine/account-not-authorized'
                )
            }

            try {
                await gebProvider.ethCall(tx2)
                assert.fail()
            } catch (err) {
                assert.equal(
                    utils.getRequireString(err),
                    'SAFEEngine/account-not-authorized'
                )
            }
        })

        it('Test function with anonymous return object', async () => {
            const treasury = new StabilityFeeTreasury(
                KOVAN_ADDRESSES.GEB_STABILITY_FEE_TREASURY,
                gebProvider
            )

            const allowance = await treasury.getAllowance(NULL_ADDRESS)

            assert.ok(allowance[0].isZero())
            assert.ok(allowance[1].isZero())
        })
    })
}
