import assert from 'assert'

import { ethers } from 'ethers'
import {
    SafeEngine,
    OracleRelayer,
    ContractApis,
    KOVAN_ADDRESSES,
} from '@reflexer-finance/geb-contract-api'
import { ChainProviderInterface } from '@reflexer-finance/geb-provider'
import { NULL_ADDRESS, ETH_A, ONE_ADDRESS } from './../const'

export const testsWithGenericGebProvider = (
    gebProvider: ChainProviderInterface
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

        it('Test send with estimate gas', async () => {
            const tx = await safeEngine.transferInternalCoins(
                NULL_ADDRESS,
                ONE_ADDRESS,
                '0'
            )
            assert.equal(tx.to, safeEngine.address)
            assert(tx.data.length >= 8) // Should at least have the function selector

            // Estimate the gas cost which emulate the transaction on the node
            const gasEstimate = await gebProvider.estimateGas(tx)
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
                await gebProvider.estimateGas(tx)
                assert.fail('Address 0x0 should have no balance')
            } catch (err) {
                assert.equal(err.error.data, 'Reverted')
            }
        })

        it('Test Oracle relayer', async () => {
            const oracleRelayer = new OracleRelayer(
                '0x896A6203F4Df153B5F233740346Aa61B98dF7E61',
                gebProvider
            )

            const rate = await oracleRelayer.redemptionRate()
            assert.ok(rate.gt(ethers.BigNumber.from('10').pow(27)))
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
