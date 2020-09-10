import { ethers, utils as ethersUtils } from 'ethers'
import assert from 'assert'

import { Geb, utils } from 'geb.js'
import { MAKER_KOVAN_NODE, DUMMY_PRIVATE_KEY } from '../const'
import { GebEthersProvider } from '@reflexer-finance/geb-ethers-provider'

export const testsDocExamples = () => {
    describe('Test of the examples included in the documentation', async () => {
        it('Getting started example', async () => {
            //prettier-ignore
            const example = async () => {
                // import { ethers, utils as ethersUtils } from "ethers"
                // import { Geb, utils } from "geb.js"

                // Setup Ether.js
                const provider = new ethers.providers.JsonRpcProvider(MAKER_KOVAN_NODE)
                const wallet = new ethers.Wallet(DUMMY_PRIVATE_KEY, provider) 

                // Create the main GEB object
                const geb = new Geb("kovan", provider)

                // Get a safe
                const safe = await geb.getSafe(4)
                console.log(`Safe id 4 has: ${utils.wadToFixed(safe.debt).toString()} RAI of debt`)
                // Open a new safe, lock ETH and draw RAI in a single transaction with a proxy
                // Note: You need a proxy prior doing that
                const proxy = await geb.getProxyAction(wallet.address);
                const tx = await proxy.openLockETHAndGenerateDebt(
                    ethersUtils.parseEther("1"),  // Lock 1 Ether
                    utils.ETH_A,                          // Of collateral ETH
                    ethersUtils.parseEther("15")    // Draw 15 RAI
                )
                
                const pending = await wallet.sendTransaction(tx) // Send the transaction
                console.log(`Transaction ${pending.hash} waiting to be mined...`)
                await pending.wait() // Wait for it to be mined
                console.log("Transaction mined, safe opened!")
            }

            try {
                await example()
                assert.fail()
            } catch (err) {
                const provider = new ethers.providers.JsonRpcProvider(
                    MAKER_KOVAN_NODE
                )
                const gebProvider = new GebEthersProvider(provider)
                assert.ok(
                    gebProvider.decodeError(err).includes('Insufficient funds')
                )
            }
        })
    })
}
