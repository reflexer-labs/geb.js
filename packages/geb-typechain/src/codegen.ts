import {
    Contract,
    FunctionDeclaration,
    FunctionDocumentation,
    RawAbiDefinition,
} from 'typechain'

import { values } from 'lodash'
import { Dictionary } from 'ts-essentials'
import {
    generateInputTypes,
    generateOutputTypes,
    generateInputNames,
} from './types'

export function codegenContract(contract: Contract, abi: RawAbiDefinition[]) {
    // Implements the ERC20 interface for the contracts that are ERC20
    const isERCO20 =
        contract.name === 'Weth' ||
        contract.name === 'Coin' ||
        contract.name === 'Erc20'
            ? true
            : false

    // prettier-ignore
    let template = `
    
    export class ${contract.name} extends BaseContractAPI${isERCO20 ? ' implements ERC20' : ''} {
        ${codegenForFunctions(contract.functions, abi)}
    }
    `
    template = addImports(template, isERCO20)

    return template
}

function addImports(template: string, isERC20: boolean): string {
    if (
        template.includes('BigNumber)') ||
        template.includes('BigNumber ') ||
        template.includes('BigNumber\n') ||
        template.includes('BigNumber.') ||
        template.includes('BigNumber>')
    ) {
        template =
            `   
            import { BigNumber } from '@ethersproject/bignumber'` + template
    }

    if (template.includes('BigNumberish')) {
        template =
            `   
            import { BigNumberish } from '@ethersproject/bignumber'` + template
    }

    if (template.includes('BytesLike')) {
        template =
            `   
            import { BytesLike } from "@ethersproject/bytes"` + template
    }

    if (isERC20) {
        template =
            `
            import { ERC20 } from '@reflexer-finance/geb-contract-base'` +
            template
    }

    if (template.includes('TransactionRequest')) {
        template =
            `
        import { TransactionRequest } from '@reflexer-finance/geb-contract-base'` +
            template
    }

    if (template.includes('MulticallRequest')) {
        template =
            `
        import { MulticallRequest } from '@reflexer-finance/geb-contract-base'` +
            template
    }

    template =
        `
        import { BaseContractAPI } from '@reflexer-finance/geb-contract-base'` +
        template
    return template
}

export function codegenForFunctions(
    fns: Dictionary<FunctionDeclaration[]>,
    abi: RawAbiDefinition[]
): string {
    return values(fns)
        .map((fns) => {
            return codegenForSingleFunction(fns[0], getABIFragment(fns[0], abi))
        })
        .join('\n')
}

function getABIFragment(
    fn: FunctionDeclaration,
    abi: RawAbiDefinition[]
): RawAbiDefinition {
    for (let fragment of abi) {
        if (
            fragment.name === fn.name &&
            fn.inputs.length === fragment.inputs.length &&
            fn.inputs.map(
                (input, i) =>
                    input.type.originalType === fragment.inputs[i].type
            )
        ) {
            return fragment
        }
    }

    throw new Error('ABI type not matching parsed version')
}
function codegenForSingleFunction(
    fn: FunctionDeclaration,
    abiFragment: RawAbiDefinition
): string {
    const isView = fn.stateMutability === 'view'
    const inputTypes = generateInputTypes(fn.inputs, fn.stateMutability)
    const outputType = generateOutputTypes(fn.outputs)
    const processedInputName = generateInputNames(fn.inputs)

    // Example of what the template below generate for a view function:
    // balanceOf(address: string): Promise<BigNumber>
    // balanceOf(address: string, multicall: true): MulticallRequest<BigNumber>
    // balanceOf(address: string, multicall?: true): Promise<BigNumber> | MulticallRequest<BigNumber>{
    //     // prettier-ignore
    //     // @ts-ignore
    //     const abi = {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}

    //     return this.ethCallOrMulticall(abi, [address], multicall)
    // }

    // prettier-ignore
    return `
    ${generateFunctionDocumentation(fn.documentation)}
    ${isView ? `${fn.name}(${inputTypes}): Promise<${outputType}>`: ''}
    ${isView ? `${fn.name}(${inputTypes} multicall: true): MulticallRequest<${outputType}>`: ''}
    ${fn.name}(${inputTypes}${isView? 'multicall?: true' : ''}): ${isView ? `Promise<${outputType}> | MulticallRequest<${outputType}>`: 'TransactionRequest'} {
        
        // prettier-ignore 
        // @ts-ignore
        const abi = ${JSON.stringify(abiFragment)}
        
        return this.${isView ? 'ethCallOrMulticall' : 'getTransactionRequest'}(abi, [
            ${processedInputName.join(", ")}
        ]${fn.stateMutability === 'payable' ? ', BigNumber.from(ethValue)' : isView? ', multicall' : ''})
    }
    `
}

function generateFunctionDocumentation(doc?: FunctionDocumentation): string {
    if (!doc) return ''

    let docString = '/**'
    if (doc.details) docString += `\n * ${doc.details}`
    if (doc.notice) docString += `\n * ${doc.notice}`

    const params = Object.entries(doc.params || {})
    if (params.length) {
        params.forEach(([key, value]) => {
            docString += `\n * @param ${key} ${value}`
        })
    }

    if (doc.return) docString += `\n * @returns ${doc.return}`

    docString += '\n */'

    return docString
}
