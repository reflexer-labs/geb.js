import { BigNumber } from '@ethersproject/bignumber'

export class Safe {
    constructor(
        public handler: string,
        public debt: BigNumber,
        public collateral: BigNumber,
        public collateralType: string,
        public isManaged: boolean
    ) {}
}
