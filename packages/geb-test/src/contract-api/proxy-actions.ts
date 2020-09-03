import assert from 'assert'

import {
    KOVAN_ADDRESSES,
    GebProxyRegistry,
    GebProxyActions,
    ContractApis,
} from '@reflexer-finance/geb-contract-api'
import { ChainProviderInterface } from '@reflexer-finance/geb-provider'
import { NULL_ADDRESS, ETH_A, ONE_ADDRESS, WAD } from './../const'

export const testsProxyActionWithGenericGebProvider = (
    gebProvider: ChainProviderInterface
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

        it('Test proxy wrapper', async () => {
            assert.equal(proxy.proxyAddress, KOVAN_ADDRESSES.PROXY_DEPLOYER)
            assert.equal(
                // @ts-ignore For test purposes, access private members
                proxy.proxyActionAddress,
                KOVAN_ADDRESSES.PROXY_ACTIONS
            )
            assert.equal(proxy.address, KOVAN_ADDRESSES.PROXY_ACTIONS)
            assert.equal(await proxy.proxy.owner(), KOVAN_ADDRESSES.ETH_FROM)

            // Transfer proxy ownership
            let tx = await proxy.proxy.setOwner(NULL_ADDRESS)
            tx['from'] = KOVAN_ADDRESSES.ETH_FROM
            try {
                await gebProvider.ethCallRequest(tx)
            } catch {
                assert.fail('Set Owner')
            }

            // Can't transfer proxy ownership
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

            // Try a proxy action function
            const contracts = new ContractApis('kovan', gebProvider)
            tx = await proxy.openSAFE(
                contracts.safeManager.address,
                ETH_A,
                ONE_ADDRESS
            )
            tx['from'] = KOVAN_ADDRESSES.ETH_FROM

            try {
                await gebProvider.ethCallRequest(tx)
            } catch (err) {
                assert.fail('openSAFE: ' + gebProvider.decodeError(err))
            }

            // Try another one more complicated
            tx = await proxy.openLockETHAndGenerateDebt(
                contracts.safeManager.address,
                contracts.taxCollector.address,
                contracts.joinETH_A.address,
                contracts.joinCoin.address,
                ETH_A,
                WAD.mul(20)
            )

            tx['from'] = KOVAN_ADDRESSES.ETH_FROM
            tx['value'] = WAD.mul(1).toString()

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
}
