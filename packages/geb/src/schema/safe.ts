import { BigNumber, FixedNumber } from '@ethersproject/bignumber'
import { ContractApis } from '@reflexer-finance/geb-contract-api'
import { RAY, ETH_A } from '../utils'

export class Safe {
    constructor(
        private contracts: ContractApis,
        public handler: string,
        public debt: BigNumber,
        public collateral: BigNumber,
        public collateralType: string,
        public isManaged: boolean
    ) {}

    /**
     * Ratio used to calculate the amount of debt that can be drawn. Returns null is ratio is +Infinity. !! Use unsafe division leading to precision loss.
     */
    public async getCRatio(): Promise<FixedNumber | null> {
        if (this.collateral.isZero()) {
            return FixedNumber.from('0')
        }

        if (this.debt.isZero()) {
            return null
        }

        const {
            accumulatedRate,
            safetyPrice,
        } = await this.contracts.safeEngine.collateralTypes(ETH_A)

        return FixedNumber.from(this.collateral.mul(safetyPrice)).divUnsafe(
            FixedNumber.from(this.debt.mul(accumulatedRate))
        )
    }
    /**
     * Ratio used for liquidation. If LRatio = 1 you can get liquidated, the greater LRatio the safer your safe is. !! Use unsafe division leading to precision loss.
     */
    public async getLRatio(): Promise<FixedNumber | null> {
        if (this.collateral.isZero()) {
            return FixedNumber.from('0')
        }

        if (this.debt.isZero()) {
            return null
        }

        const {
            accumulatedRate,
            liquidationPrice,
        } = await this.contracts.safeEngine.collateralTypes(ETH_A)

        return FixedNumber.from(
            this.collateral.mul(liquidationPrice)
        ).divUnsafe(FixedNumber.from(this.debt.mul(accumulatedRate)))
    }

    public async liquidationPrice(): Promise<FixedNumber | null> {
        if (this.collateral.isZero()) {
            return FixedNumber.from('0')
        }

        if (this.debt.isZero()) {
            return null
        }

        const {
            accumulatedRate,
        } = await this.contracts.safeEngine.collateralTypes(ETH_A)
        const redemptionPrice = await this.contracts.oracleRelayer.redemptionPrice_readOnly()
        const liqCRatio = (
            await this.contracts.oracleRelayer.collateralTypes(ETH_A)
        ).liquidationCRatio

        // Formula:
        // (debt x accumulatedRate x redemptionPrice x liquidationCRatio) / collateral

        const numerator = this.debt
            .mul(accumulatedRate)
            .mul(redemptionPrice)
            .mul(liqCRatio)
            .div(RAY.pow(3)) // Make it a WAD
        return FixedNumber.from(numerator).divUnsafe(
            FixedNumber.from(this.collateral)
        )
    }
}
