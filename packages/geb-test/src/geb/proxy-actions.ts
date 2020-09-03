import assert from 'assert'

import {
    KOVAN_ADDRESSES,
    GebProxyRegistry,
} from '@reflexer-finance/geb-contract-api'
import { GebProviderInterface } from '@reflexer-finance/geb-provider'
import { GebProxyActions } from 'geb.js'
import { NULL_ADDRESS, ETH_A, ONE_ADDRESS, WAD } from '../const'

export const testsProxyActionWithGenericGebProvider = (
    gebProvider: GebProviderInterface
) => {
    describe('Using a provider (Ethers OR web3)', async () => {
        // let proxyAction: GebProxyActions

        // beforeEach(() => {
        //     const proxyAction = new GebProxyActions('', gebProvider)
        // })

        const registry = new GebProxyRegistry(
            KOVAN_ADDRESSES.PROXY_REGISTRY,
            gebProvider
        )

        const proxy = new GebProxyActions(
            KOVAN_ADDRESSES.PROXY_DEPLOYER,
            'kovan',
            gebProvider
        )

        it('Get proxy from registry', async () => {
            assert.equal(await registry.proxies(NULL_ADDRESS), NULL_ADDRESS)
            assert.equal(
                await registry.proxies(KOVAN_ADDRESSES.ETH_FROM),
                KOVAN_ADDRESSES.PROXY_DEPLOYER
            )
        })

        it('Test basic asserts', async () => {
            assert.equal(proxy.proxyAddress, KOVAN_ADDRESSES.PROXY_DEPLOYER)
            assert.equal(
                proxy.proxyActionAddress,
                KOVAN_ADDRESSES.PROXY_ACTIONS
            )
            assert.equal(proxy.address, KOVAN_ADDRESSES.PROXY_DEPLOYER)
            assert.equal(await proxy.proxy.owner(), KOVAN_ADDRESSES.ETH_FROM)
        })

        describe('Test proxy wraper', async () => {
            it('Test transfer proxy ownership', async () => {
                // Transfer proxy ownership
                let tx = await proxy.proxy.setOwner(NULL_ADDRESS)
                tx['from'] = KOVAN_ADDRESSES.ETH_FROM
                try {
                    await gebProvider.ethCallRequest(tx)
                } catch {
                    assert.fail('Set Owner')
                }
            })

            it('Test transfer proxy ownership failed', async () => {
                let tx = await proxy.proxy.setOwner(NULL_ADDRESS)
                // Not the owner
                tx['from'] = NULL_ADDRESS
                try {
                    await gebProvider.ethCallRequest(tx)
                    assert.fail()
                } catch (err) {
                    assert.equal(
                        gebProvider.decodeError(err),
                        'ds-auth-unauthorized'
                    )
                }
            })

            it('Test simple proxy action function', async () => {
                const tx = await proxy.openSAFE(ETH_A, ONE_ADDRESS)
                tx['from'] = KOVAN_ADDRESSES.ETH_FROM

                try {
                    await gebProvider.ethCallRequest(tx)
                } catch (err) {
                    assert.fail('openSAFE: ' + gebProvider.decodeError(err))
                }
            })

            it('Test complex payable proxy action function', async () => {
                const tx = await proxy.openLockETHAndGenerateDebt(
                    WAD,
                    ETH_A,
                    WAD.mul(20)
                )

                tx['from'] = KOVAN_ADDRESSES.ETH_FROM

                try {
                    await gebProvider.ethCallRequest(tx)
                } catch (err) {
                    assert.fail(
                        'openLockETHAndGenerateDebt: ' +
                            gebProvider.decodeError(err)
                    )
                }
            })
        })
    })
}
