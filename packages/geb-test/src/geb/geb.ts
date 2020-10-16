import { ethers } from 'ethers'
import assert from 'assert'

import { ETH_A, NULL_ADDRESS, ONE_ADDRESS } from '../const'
import { Geb, GebErrorTypes, utils, contracts } from 'geb.js'
import { sethCall } from '../utils'
import {
    GebProviderInterface,
    KOVAN_ADDRESSES,
} from '@reflexer-finance/geb-contract-base'

export const testsGeb = (gebProvider: GebProviderInterface, node: string) => {
    describe('Using a provider (Ethers OR web3)', async () => {
        let geb: Geb

        beforeEach(async () => {
            geb = new Geb('kovan', gebProvider)
        })

        it('Create geb with ethers', async () => {
            const provider = new ethers.providers.JsonRpcProvider(node)
            geb = new Geb('kovan', provider)

            const rate = await geb.contracts.oracleRelayer.redemptionRate()
            assert.ok(rate)
        })

        it('Create geb with gebProvider and test redemption Rate', async () => {
            const value = await geb.contracts.oracleRelayer.redemptionRate()
            const expected = await sethCall(
                node,
                KOVAN_ADDRESSES.GEB_ORACLE_RELAYER,
                'redemptionRate()(uint256)'
            )
            assert.equal(value.toString(), expected[0])
        })

        it('Test collateral types', async () => {
            const value = await geb.contracts.safeEngine.collateralTypes(ETH_A)
            const expected = await sethCall(
                node,
                KOVAN_ADDRESSES.GEB_SAFE_ENGINE,
                'collateralTypes(bytes32)(uint256,uint256,uint256,uint256,uint256,uint256)',
                [ETH_A]
            )

            assert.equal(value.debtAmount, expected[0])
            assert.equal(value.accumulatedRate, expected[1])
            assert.equal(value.safetyPrice, expected[2])
            assert.equal(value.debtCeiling, expected[3])
            assert.equal(value.debtFloor, expected[4])
            assert.equal(value.liquidationPrice, expected[5])
        })

        it('Check a safe debt/collateral', async () => {
            const value = await geb.contracts.safeEngine.safes(
                ETH_A,
                NULL_ADDRESS
            )
            const expected = await sethCall(
                node,
                KOVAN_ADDRESSES.GEB_SAFE_ENGINE,
                'safes(bytes32,address)(uint256,uint256)',
                [ETH_A, NULL_ADDRESS]
            )

            assert.equal(value.lockedCollateral, expected[0])
            assert.equal(value.generatedDebt, expected[1])
        })

        it('Get proxy action with geb', async () => {
            const proxy = await geb.getProxyAction(KOVAN_ADDRESSES.ETH_FROM)
            assert.equal(proxy.proxyAddress, KOVAN_ADDRESSES.PROXY_DEPLOYER)
        })

        it('Get proxy action global settlement with geb', async () => {
            const proxy = await geb.getProxyActionGlobalSettlement(
                KOVAN_ADDRESSES.ETH_FROM
            )
            assert.equal(proxy.proxyAddress, KOVAN_ADDRESSES.PROXY_DEPLOYER)
        })

        it('Get safe owner by manager with id', async () => {
            const safe = await geb.getSafe(1)

            assert.equal(safe.collateralType, ETH_A)
            assert.equal(safe.handler, await geb.contracts.safeManager.safes(1))
            const expected = await geb.contracts.safeEngine.safes(
                ETH_A,
                safe.handler
            )
            assert.equal(safe.debt.toString(), expected.generatedDebt)
            assert.equal(safe.collateral.toString(), expected.lockedCollateral)
        })

        it('Check non-empty safe with debt and collateral', async () => {
            const safeId = 1
            const safe = await geb.getSafe(safeId)
            const handler = await geb.contracts.safeManager.safes(safeId)

            const expected = await sethCall(
                node,
                KOVAN_ADDRESSES.GEB_SAFE_ENGINE,
                'safes(bytes32,address)(uint256,uint256)',
                [ETH_A, handler]
            )
            assert.equal(safe.debt.toString(), expected[1])
            assert.equal(safe.collateral.toString(), expected[0])
        })

        it('Get safe by id error', async () => {
            const safeId = (await geb.contracts.safeManager.safei()).add(1)

            try {
                await geb.getSafe(safeId.toNumber())
                assert.fail()
            } catch (err) {
                assert.equal(err.code, GebErrorTypes.SAFE_DOES_NOT_EXIST)
            }
        })

        it('Get safe owner by manager with handler', async () => {
            const handler = await geb.contracts.safeManager.safes(1)

            const safe = await geb.getSafe(handler, ETH_A)

            assert.equal(safe.collateralType, ETH_A)
            assert.equal(safe.handler, handler, 'handler')
            const expected = await geb.contracts.safeEngine.safes(
                ETH_A,
                safe.handler
            )
            assert.equal(safe.debt.toString(), expected.generatedDebt)
            assert.equal(safe.collateral.toString(), expected.lockedCollateral)
        })

        it('Get CRatio and Liquidation ratio', async () => {
            const safe = await geb.getSafe(1)
            const cRatio = await safe.getCRatio()
            const lRatio = await safe.getLRatio()
            assert.ok(cRatio.toUnsafeFloat() > 1)
            assert.ok(lRatio.toUnsafeFloat() > 1)

            // Always true for cdp 1 but it the way it should be
            assert.ok(cRatio.toUnsafeFloat() >= lRatio.toUnsafeFloat())
        })

        it('Liquidation Price', async () => {
            const safe = await geb.getSafe(1)
            const liqPrice = await safe.liquidationPrice()
            assert.ok(liqPrice.toUnsafeFloat() > 1)
        })

        it('multicall with 1 call', async () => {
            const res = await geb.multiCall([
                geb.contracts.safeEngine.globalDebt(true),
            ])

            // More than 1 wei of global debt
            assert.ok(res[0].gt('1'))
        })

        it('multicall with 2 calls', async () => {
            const res = await geb.multiCall([
                geb.contracts.safeEngine.globalDebt(true),
                geb.contracts.safeEngine.collateralTypes(ETH_A, true),
            ])

            // More than 1 wei of global debt
            assert.ok(res[0].gt('1'))

            // debtFloor is 15
            res[1].debtAmount
            assert.ok(res[1].debtFloor.eq(utils.RAD.mul(70)))
        })

        it('multicall with 3 calls', async () => {
            const res = await geb.multiCall([
                geb.contracts.safeEngine.globalDebt(true),
                geb.contracts.safeEngine.collateralTypes(ETH_A, true),
                geb.contracts.liquidationEngine.collateralTypes(ETH_A, true),
            ])

            // More than 1 wei of global debt
            assert.ok(res[0].gt('1'))

            // debtFloor is 15
            assert.ok(res[1].debtFloor.eq(utils.RAD.mul(70)))

            // Should get the right ETH auction house
            assert.ok(
                res[2].collateralAuctionHouse,
                KOVAN_ADDRESSES.GEB_COLLATERAL_AUCTION_HOUSE_ETH_A
            )
        })

        it('ERC20 balance', async () => {
            const erc20 = geb.getErc20Contract(KOVAN_ADDRESSES.GEB_COIN)
            const balance = await erc20.balanceOf(NULL_ADDRESS)
            assert.equal(balance.toString(), '0')
        })

        it('ERC20 transfer', async () => {
            const erc20 = geb.getErc20Contract(KOVAN_ADDRESSES.GEB_COIN)
            const tx = erc20.transferFrom(NULL_ADDRESS, ONE_ADDRESS, '0')
            await gebProvider.ethCall(tx)
        })

        it('ERC20 transfer fail', async () => {
            const erc20 = geb.getErc20Contract(KOVAN_ADDRESSES.GEB_COIN)
            const tx = erc20.transferFrom(NULL_ADDRESS, ONE_ADDRESS, '1')
            try {
                await gebProvider.ethCall(tx)
                assert.fail()
            } catch (err) {
                assert.equal(
                    'Coin/insufficient-balance',
                    utils.getRequireString(err)
                )
            }
        })

        it('Test get gebContract', async () => {
            const or = geb.getGebContract(
                contracts.OracleRelayer,
                KOVAN_ADDRESSES.GEB_ORACLE_RELAYER
            )
            const expected = await sethCall(
                node,
                KOVAN_ADDRESSES.GEB_ORACLE_RELAYER,
                'redemptionRate()(uint256)'
            )
            assert.equal((await or.redemptionRate()).toString(), expected[0])
        })

        it('Test get gebContract static gebProvider', async () => {
            const or = Geb.getGebContract(
                contracts.OracleRelayer,
                KOVAN_ADDRESSES.GEB_ORACLE_RELAYER,
                gebProvider
            )
            const expected = await sethCall(
                node,
                KOVAN_ADDRESSES.GEB_ORACLE_RELAYER,
                'redemptionRate()(uint256)'
            )
            assert.equal((await or.redemptionRate()).toString(), expected[0])
        })

        it('Test get gebContract static ether', async () => {
            const provider = new ethers.providers.JsonRpcProvider(node)
            const or = Geb.getGebContract(
                contracts.OracleRelayer,
                KOVAN_ADDRESSES.GEB_ORACLE_RELAYER,
                provider
            )
            const expected = await sethCall(
                node,
                KOVAN_ADDRESSES.GEB_ORACLE_RELAYER,
                'redemptionRate()(uint256)'
            )
            assert.equal((await or.redemptionRate()).toString(), expected[0])
        })
    })
}
