import {
    Contract,
    FunctionDeclaration,
    FunctionDocumentation,
    RawAbiDefinition,
} from 'typechain'

import { values } from 'lodash'
import { Dictionary } from 'ts-essentials'
import { generateInputTypes, generateOutputTypes } from './types'

export function codegenContract(contract: Contract, abi: RawAbiDefinition[]) {
    let template = `
    import { BaseContractAPI } from '@reflexer-finance/geb-provider'

    export class ${contract.name}<TX_OBJ> extends BaseContractAPI<TX_OBJ> {
        ${codegenForFunctions(contract.functions, abi)}
    }
    `

    if (
        template.includes('BigNumber)') ||
        template.includes('BigNumber ') ||
        template.includes('BigNumber\n') ||
        template.includes('BigNumber>')
    ) {
        template =
            `   
    import { BigNumber } from '@ethersproject/bignumber'
    ` + template
    }

    if (template.includes('BigNumberish')) {
        template =
            `   
    import { BigNumberish } from '@ethersproject/bignumber'
    ` + template
    }

    if (template.includes('BytesLike')) {
        template =
            `   
        import { BytesLike } from "@ethersproject/bytes"
       ` + template
    }

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
    // prettier-ignore
    return `
    ${generateFunctionDocumentation(fn.documentation)}
    ${fn.name}(${generateInputTypes(fn.inputs)}): Promise<${fn.stateMutability === 'view'? `${generateOutputTypes(fn.outputs)}`: 'TX_OBJ'}> {
        
        // prettier-ignore 
        // @ts-ignore
        const abi = ${JSON.stringify(abiFragment)}
        
        return this.chainProvider.${fn.stateMutability === 'view' ? 'ethCall' : 'ethSend'}(this.address, abi, [
            ${fn.inputs.map((input, index) => input.name || `arg${index}` )}
        ])
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
