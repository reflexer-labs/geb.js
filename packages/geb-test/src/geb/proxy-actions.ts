import assert from 'assert'

import { GebProxyRegistry } from '@reflexer-finance/geb-contract-api'
import {
    ContractList,
    GebProviderInterface,
} from '@reflexer-finance/geb-contract-base'
import { GebProxyActions, GebProxyActionsGlobalSettlement, utils } from 'geb.js'
import { NULL_ADDRESS, ETH_A, ONE_ADDRESS, WAD } from '../const'

export const testsProxyActionWithGenericGebProvider = (
    gebProvider: GebProviderInterface,
    addresses: ContractList,
    networkName: 'kovan' | 'mainnet'
) => {
    describe(`Using a provider (Ethers OR web3) network ${networkName}`, async () => {
        const registry = new GebProxyRegistry(
            addresses.PROXY_REGISTRY,
            gebProvider
        )

        const proxy = new GebProxyActions(
            addresses.PROXY_DEPLOYER,
            networkName,
            gebProvider
        )

        it('Get proxy from registry', async () => {
            assert.equal(await registry.proxies(NULL_ADDRESS), NULL_ADDRESS)
            assert.equal(
                await registry.proxies(addresses.ETH_FROM),
                addresses.PROXY_DEPLOYER
            )
        })

        it('Test basic asserts', async () => {
            assert.equal(proxy.proxyAddress, addresses.PROXY_DEPLOYER)
            assert.equal(proxy.proxyActionAddress, addresses.PROXY_ACTIONS)
            assert.equal(proxy.address, addresses.PROXY_DEPLOYER)
            assert.equal(await proxy.proxy.owner(), addresses.ETH_FROM)
        })

        describe('Test proxy wraper', async () => {
            it('Test transfer proxy ownership', async () => {
                // Transfer proxy ownership
                let tx = await proxy.proxy.setOwner(NULL_ADDRESS)
                tx['from'] = addresses.ETH_FROM
                try {
                    await gebProvider.ethCall(tx)
                } catch {
                    assert.fail('Set Owner')
                }
            })

            it('Test transfer proxy ownership failed', async () => {
                let tx = await proxy.proxy.setOwner(NULL_ADDRESS)
                // Not the owner
                tx['from'] = NULL_ADDRESS
                try {
                    await gebProvider.ethCall(tx)
                    assert.fail()
                } catch (err) {
                    assert.equal(
                        utils.getRequireString(err),
                        'ds-auth-unauthorized'
                    )
                }
            })

            it('Test simple proxy action function', async () => {
                const tx = await proxy.openSAFE(ETH_A, ONE_ADDRESS)
                tx['from'] = addresses.ETH_FROM

                try {
                    await gebProvider.ethCall(tx)
                } catch (err) {
                    assert.fail('openSAFE: ' + utils.getRequireString(err))
                }
            })

            it('Test complex payable proxy action function', async () => {
                const tx = await proxy.openLockETHAndGenerateDebt(
                    '0',
                    ETH_A,
                    WAD.mul(0) // 100 RAI debt
                )

                tx['from'] = addresses.ETH_FROM

                try {
                    await gebProvider.ethCall(tx)
                } catch (err) {
                    assert.fail(
                        'openLockETHAndGenerateDebt: ' +
                            utils.getRequireString(err)
                    )
                }
            })

            it('Global settlement proxy action', async () => {
                const settlementProxy = new GebProxyActionsGlobalSettlement(
                    addresses.PROXY_DEPLOYER,
                    networkName,
                    gebProvider
                )

                const tx = settlementProxy.freeTokenCollateral(
                    addresses.GEB_JOIN_ETH_A,
                    1
                )

                try {
                    await gebProvider.ethCall(tx)
                    assert.fail()
                } catch (err) {
                    assert.equal(
                        utils.getRequireString(err),
                        'ds-auth-unauthorized'
                    )
                }
            })
        })
    })
}
