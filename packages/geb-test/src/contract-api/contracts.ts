import { ContractApis } from '@reflexer-finance/geb-contract-api'
import { GebEthersProvider } from '@reflexer-finance/geb-ethers-provider'
import { verifyContract } from '../utils'
import { ethers } from 'ethers'
import { GebDeployment } from '@reflexer-finance/geb-contract-base'

export const testContractPresence = (
    network: GebDeployment,
    ethNode: string
) => {
    describe('Test that contracts are present at their expected address', () => {
        const provider = new GebEthersProvider(
            new ethers.providers.JsonRpcProvider(ethNode)
        )
        const contractsApi = new ContractApis(network, provider)

        Object.values(contractsApi)
            .filter((x) => x.constructor.name !== 'GebEthersProvider')
            .forEach((contract) =>
                it(`Check ${contract.constructor.name} contract address`, async () => {
                    await verifyContract(contract, ethNode)
                })
            )
    })
}
