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
            // Function is overloaded, create a custom name for each overload. e.g for modifyParameters:
            // - modifyParameters_Bytes32Address
            // - modifyParameters_Bytes32Uint256

            for (let overload of fns[name]) {
                let inputParamTypeConcat = ''
                for (let input of overload.inputs) {
                    // Get the type of the parameter
                    let inputTypes = input.type.originalType
                    // First letter of the type to upper case
                    inputTypes =
                        inputTypes.charAt(0).toUpperCase() + inputTypes.slice(1)
                    // Concatenate the types
                    inputParamTypeConcat += inputTypes
                }

                let overloadName =
                    overload.inputs.length > 0
                        ? overload.name + '__' + inputParamTypeConcat
                        : overload.name
                flattened[overloadName] = overload
                flattened[overloadName].name = overloadName
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
        if (!fragment.name || fragment.type !== 'function') {
            continue
        }
        // Check that the function name are the same
        // Note that with .split("_")[0] we remove the suffix added to overloaded functions
        if (
            fragment.name.toLocaleLowerCase() !==
            fn.name.split('__')[0].toLocaleLowerCase()
        ) {
            continue
        }

        // Make sure they have the same number of arguments
        if (fragment.inputs.length !== fn.inputs.length) {
            continue
        }

        // Check that the functions have the same input arguments
        let wrongInputTypes = false
        for (let i = 0; i < fragment.inputs.length; i++) {
            // They need the same type
            if (fragment.inputs[i].type !== fn.inputs[i].type.originalType) {
                wrongInputTypes = true
            }
        }

        if (wrongInputTypes) {
            continue
        } else {
            return fragment
        }
    }
    console.log(fn, '\n ==== \n', abi)
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
