import assert from 'assert'

import {
    SafeEngine,
    OracleRelayer,
    ContractApis,
    StabilityFeeTreasury,
} from '@reflexer-finance/geb-contract-api'
import {
    ContractList,
    GebProviderInterface,
} from '@reflexer-finance/geb-contract-base'
import { NULL_ADDRESS, ETH_A, ONE_ADDRESS } from './../const'
import { utils } from 'geb.js'

export const testsWithGenericGebProvider = (
    gebProvider: GebProviderInterface,
    addresses: ContractList,
    networkName: 'kovan' | 'mainnet'
) => {
    describe(`Generic provider test (ethers or web3) Network: ${networkName}`, async () => {
        let safeEngine: SafeEngine

        beforeEach(() => {
            safeEngine = new SafeEngine(addresses.GEB_SAFE_ENGINE, gebProvider)
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
                // TODO: remove the if statement after mainnet is running RAI
                if (networkName === 'kovan') {
                    assert.equal(
                        utils.getRequireString(err),
                        'SAFEEngine/sub-uint-uint-underflow'
                    )
                } else {
                    assert.equal(utils.getRequireString(err), null)
                }
            }
        })

        it('Test Oracle relayer', async () => {
            const oracleRelayer = new OracleRelayer(
                addresses.GEB_ORACLE_RELAYER,
                gebProvider
            )

            const rate = await oracleRelayer.redemptionRate()
            assert.ok(rate.gt(1))
        })

        it('Test Oracle relayer redemptionPrice_readOnly', async () => {
            const oracleRelayer = new OracleRelayer(
                addresses.GEB_ORACLE_RELAYER,
                gebProvider
            )

            const rate = await oracleRelayer.redemptionPrice_readOnly()
            assert.ok(rate.gt(0))
        })

        it('Test with contract API factory', async () => {
            const contracts = new ContractApis(networkName, gebProvider)

            assert.equal(
                contracts.debtAuctionHouse.address,
                addresses.GEB_DEBT_AUCTION_HOUSE
            )

            const debtHouse = await contracts.accountingEngine.debtAuctionHouse()

            assert.equal(debtHouse, addresses.GEB_DEBT_AUCTION_HOUSE)
        })

        it('Test overloaded function', async () => {
            const tx1 = safeEngine.modifyParameters__Bytes32Bytes32Uint256(
                ETH_A,
                ETH_A,
                '200'
            )
            const tx2 = safeEngine.modifyParameters__Bytes32Uint256(
                ETH_A,
                '1000'
            )

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
                addresses.GEB_STABILITY_FEE_TREASURY,
                gebProvider
            )

            const allowance = await treasury.getAllowance(NULL_ADDRESS)

            assert.ok(allowance[0].isZero())
            assert.ok(allowance[1].isZero())
        })
    })
}
