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

    // prettier-ignore
    let template = `
    
    export class ${contract.name} extends BaseContractAPI {
        ${codegenForFunctions(contract.functions, abi)}
    }
    `
    template = addImports(template)

    return template
}

function addImports(template: string): string {
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
    // Flatten the overload by adding a number suffix to their name
    const flattened: Dictionary<FunctionDeclaration> = {}
    for (let name in fns) {
        if (fns[name].length === 1) {
            // No overload
            flattened[name] = fns[name][0]
        } else {
            // Function is overloaded, add a number suffix to the function name for each overload
            let i = 1
            for (let overload of fns[name]) {
                const overloadName = name + i.toString()
                flattened[overloadName] = overload
                flattened[overloadName].name = overloadName
                i++
            }
        }
    }

    // Generate the code
    return values(flattened)
        .map((fns) => {
            return codegenForSingleFunction(fns, getABIFragment(fns, abi))
        })
        .join('\n')
}

// Given a function declaration, finds the right abi fragment in it. Take into account overload with id suffixes
function getABIFragment(
    fn: FunctionDeclaration,
    abi: RawAbiDefinition[]
): RawAbiDefinition {
    for (let fragment of abi) {
        if (!fragment.name) {
            continue
        }

        // If overload, these are not equal because of the suffix
        const isOverloaded =
            fragment.name.length !== fn.name.length &&
            /^-?\d+$/.test(fn.name.slice(fragment.name.length))
        if (
            fn.name === fragment.name ||
            (fn.name.startsWith(fragment.name) &&
                isOverloaded &&
                fn.inputs.length === fragment.inputs.length &&
                fn.inputs.map(
                    (input, i) =>
                        input.type.originalType === fragment.inputs[i].type
                ))
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
    const isView =
        fn.stateMutability === 'view' || fn.stateMutability === 'pure'
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
