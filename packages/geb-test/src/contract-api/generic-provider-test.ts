import assert from 'assert'

import { ethers } from 'ethers'
import {
    SafeEngine,
    OracleRelayer,
    ContractApis,
    KOVAN_ADDRESSES,
} from '@reflexer-finance/geb-contract-api'
import { GebProviderInterface } from '@reflexer-finance/geb-provider'
import { NULL_ADDRESS, ETH_A, ONE_ADDRESS } from './../const'

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

        it('Test send + estimate gas', async () => {
            const tx = await safeEngine.transferInternalCoins(
                NULL_ADDRESS,
                ONE_ADDRESS,
                '0'
            )
            assert.equal(tx.to, safeEngine.address)
            assert(tx.data.length >= 8) // Should at least have the function selector

            tx.from = NULL_ADDRESS

            // Estimate the gas cost which emulate the transaction on the node
            const gasEstimate = await gebProvider.estimateGas(tx)
            assert(gasEstimate.gte(20000))

            try {
                await gebProvider.ethCallRequest(tx)
            } catch (err) {
                assert.fail(gebProvider.decodeError(err))
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
                await gebProvider.ethCallRequest(tx)
                assert.fail('Address 0x0 should have no balance')
            } catch (err) {
                assert.equal(gebProvider.decodeError(err), '0x')
            }
        })

        it('Test Oracle relayer', async () => {
            const oracleRelayer = new OracleRelayer(
                KOVAN_ADDRESSES.GEB_ORACLE_RELAYER,
                gebProvider
            )

            const rate = await oracleRelayer.redemptionRate()
            assert.ok(rate.gt(ethers.BigNumber.from('10').pow(27)))
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
            const debHouseExpect = '0x0E742BDF585e3EC1Bf0B7A2a52562EC3D17D7adC'

            assert.equal(contracts.debtAuctionHouse.address, debHouseExpect)

            const debtHouse = await contracts.accountingEngine.debtAuctionHouse()

            assert.equal(debtHouse, debHouseExpect)
        })
    })
}
