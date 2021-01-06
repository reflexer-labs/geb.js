import { ContractApis } from '@reflexer-finance/geb-contract-api'
import { GebEthersProvider } from '@reflexer-finance/geb-ethers-provider'
import { verifyContract } from '../utils'
import { ethers } from 'ethers'
import { GebDeployment } from '@reflexer-finance/geb-contract-base'

export const testContractPresence = (
    network: GebDeployment,
    ethNode: string
) => {
    describe(`Test that contracts are present at their expected address. Network ${network}`, () => {
        const provider = new GebEthersProvider(
            new ethers.providers.StaticJsonRpcProvider(ethNode)
        )
        const contractsApi = new ContractApis(network, provider)

        Object.values(contractsApi)
            // Skip this object since it's not a contract
            .filter((x) => x.constructor.name !== 'GebEthersProvider')
            // List of contracts to skip the check for various reasons.
            // Note: Some addresses were hardcoded on purpose here to make the test fail upon new deployment.
            // TODO: Remove these filter once mainnet RAI was deployed
            // Skip the PI contracts on mainnet because they have an outdated ABI with PRAI
            .filter(
                (x) =>
                    !(
                        x.constructor.name === 'RateSetter' &&
                        network == 'mainnet' &&
                        x.address ===
                            '0x9262136738B9962cb8016b8421642aD65faEa055'
                    )
            )
            .filter(
                (x) =>
                    !(
                        x.constructor.name === 'PiRawPerSecondCalculator' &&
                        network == 'mainnet' &&
                        x.address ===
                            '0x64Ad684378770Fe3EE4b437737edF379f12A902a'
                    )
            )
            // Skip the auction house contract on mainnet because the ABI changed slightly
            .filter(
                (x) =>
                    !(
                        x.constructor.name ===
                            'FixedDiscountCollateralAuctionHouse' &&
                        network == 'mainnet' &&
                        x.address ===
                            '0x191ba53C077D3E9eC2CBE6f52Eb0a33Ea1A226f2'
                    )
            )
            // ABI changed slightly on mainnet
            .filter(
                (x) =>
                    !(
                        x.constructor.name === 'AccountingEngine' &&
                        network == 'mainnet' &&
                        x.address ===
                            '0x89E8bd799ab06Dd7EE2Be1325FAfEF1Ab48676bc'
                    )
            )
            .filter(
                (x) =>
                    !(
                        x.constructor.name === 'LiquidationEngine' &&
                        network == 'mainnet' &&
                        x.address ===
                            '0x8eA70611850d13856877d9ED8035D07E80Eb0B73'
                    )
            )
            .filter(
                (x) =>
                    !(
                        x.constructor.name === 'StabilityFeeTreasury' &&
                        network == 'mainnet' &&
                        x.address ===
                            '0xfF6D7479C0882dAa3212785adAF7786d1Df09cB8'
                    )
            )

            // Test all remaining contracts
            .forEach((contract) =>
                it(`Check ${contract.constructor.name} contract address`, async () => {
                    await verifyContract(contract, ethNode)
                })
            )
    })
}
