import { GebEthersProvider } from '@reflexer-finance/geb-ethers-provider'
import { verifyContract } from '../utils'
import { ethers } from 'ethers'
import { GebDeployment } from '@reflexer-finance/geb-contract-base'
import { AdminApis } from '@reflexer-finance/geb-admin-api'

export const testContractPresence = (
    network: GebDeployment,
    ethNode: string
) => {
    describe(`Test that contracts are present at their expected address. Network ${network}`, () => {
        const provider = new GebEthersProvider(
            new ethers.providers.StaticJsonRpcProvider(ethNode)
        )
        const contractsApi = new AdminApis(network, provider)

        Object.values(contractsApi)
            // Skip this object since it's not a contract
            .filter((x) => x.constructor.name !== 'GebEthersProvider')
            // Don't check gnosis safe because at the address it's just an empty proxy, implementation is
            // elsewhere and is being delegate called to.
            .filter((x) => x.constructor.name !== 'GnosisSafe')
            .filter(
                (x) =>
                    !(
                        x.constructor.name === 'GovActions' &&
                        network == 'mainnet' &&
                        x.address ===
                            // Address hardcoded on purpose to make the test fail on new testnet deployment
                            '0xfcedcaaa80b497ac0171e9c09c10448a05b00314'
                    )
            )
            // ABI of geb deployed changed on mainnet
            .filter(
                (x) =>
                    !(
                        x.constructor.name === 'GebDeploy' &&
                        network == 'mainnet' &&
                        x.address ===
                            '0xfBC623Df947AA7F9B2E87ac051c962939de9A325'
                    )
            )
            .forEach((contract) =>
                it(`Check ${contract.constructor.name} contract address`, async () => {
                    await verifyContract(contract, ethNode)
                })
            )
    })
}
