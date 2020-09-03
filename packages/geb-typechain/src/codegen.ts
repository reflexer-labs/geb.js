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
        contract.name === 'Weth' || contract.name === 'Coin' ? true : false

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
            import { ERC20 } from '@reflexer-finance/geb-provider'` + template
    }

    if (template.includes('TransactionRequest')) {
        template =
            `
        import { TransactionRequest } from '@reflexer-finance/geb-provider'` +
            template
    }

    template =
        `
        import { BaseContractAPI } from '@reflexer-finance/geb-provider'` +
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
    const processedInputName = generateInputNames(fn.inputs)

    // prettier-ignore
    return `
    ${generateFunctionDocumentation(fn.documentation)}
    ${fn.name}(${generateInputTypes(fn.inputs, fn.stateMutability)}): Promise<${fn.stateMutability === 'view'? `${generateOutputTypes(fn.outputs)}`: 'TransactionRequest'}> {
        
        // prettier-ignore 
        // @ts-ignore
        const abi = ${JSON.stringify(abiFragment)}
        
        return this.${fn.stateMutability === 'view' ? 'ethCall' : 'ethSend'}(abi, [
            ${processedInputName.join(", ")}
        ]${fn.stateMutability === 'payable' ? ', BigNumber.from(ethValue)' : ''})
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
