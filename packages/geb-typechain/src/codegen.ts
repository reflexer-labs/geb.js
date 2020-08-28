import { Contract, FunctionDeclaration, FunctionDocumentation } from 'typechain'

import { values } from 'lodash'
import { Dictionary } from 'ts-essentials'
import { generateInputTypes, generateOutputTypes } from './types'

export function codegenContract(contract: Contract) {
    return `
    import { BytesLike } from "@ethersproject/bytes"
    import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
    import { BaseContractAPI } from '@reflexer-finance/geb-provider'

    export class ${contract.name}<TX_OBJ> extends BaseContractAPI<TX_OBJ> {
        ${codegenForFunctions(contract.functions)}
    }
    `
}

export function codegenForFunctions(
    fns: Dictionary<FunctionDeclaration[]>
): string {
    return values(fns)
        .map((fns) => {
            return codegenForSingleFunction(fns[0])
        })
        .join('\n')
}

function codegenForSingleFunction(fn: FunctionDeclaration): string {
    // prettier-ignore
    return `
    ${generateFunctionDocumentation(fn.documentation)}
    ${fn.name}(${generateInputTypes(fn.inputs)}): ${fn.stateMutability === 'view'? `Promise<${generateOutputTypes(fn.outputs)}>`: 'TX_OBJ'
    } {
        return this.chainProvider.${fn.stateMutability === 'view' ? 'ethCall' : 'ethSend'}("${fn.name}", {
            ${fn.inputs.map((input, index) => input.name || `arg${index}` )}
        })
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
