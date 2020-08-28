import {
    Contract,
    FunctionDeclaration,
    FunctionDocumentation,
    AbiParameter,
    AbiOutputParameter,
    EvmType,
    EvmOutputType,
    TupleType,
    getSignatureForFn,
} from 'typechain'

import { values } from 'lodash'
import { Dictionary } from 'ts-essentials'

export function codegenContract(contract: Contract) {
    return `
    export const TEST = 'TEST'
    
    export class ${contract.name} {
        ${codegenForFunctions(contract.functions)}
    }
    `
}

export function codegenForFunctions(
    fns: Dictionary<FunctionDeclaration[]>
): string {
    return values(fns)
        .map((fns) => {
            if (fns.length === 1) {
                return codegenForSingleFunction(fns[0])
            } else {
                return codegenForOverloadedFunctions(fns)
            }
        })
        .join('\n')
}

function codegenForOverloadedFunctions(fns: FunctionDeclaration[]): string {
    return fns
        .map((f) => codegenForSingleFunction(f, `"${getSignatureForFn(f)}"`))
        .join('\n')
}

function codegenForSingleFunction(
    fn: FunctionDeclaration,
    overloadedName?: string
): string {
    return `
    ${generateFunctionDocumentation(fn.documentation)}
    ${overloadedName ?? fn.name}(${codegenInputTypes(
        fn.inputs
    )}): ${getTransactionObject(fn)}<${codegenOutputTypes(fn.outputs)}>;
  `
}

function getTransactionObject(fn: FunctionDeclaration): string {
    return fn.stateMutability === 'payable'
        ? 'PayableTransactionObject'
        : 'NonPayableTransactionObject'
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

function codegenInputTypes(input: AbiParameter[]): string {
    if (input.length === 0) {
        return ''
    }
    return (
        input
            .map(
                (input, index) =>
                    `${input.name || `arg${index}`}: ${codegenInputType(
                        input.type
                    )}`
            )
            .join(', ') + ', '
    )
}

export function codegenOutputTypes(outputs: AbiOutputParameter[]): string {
    if (outputs.length === 1) {
        return codegenOutputType(outputs[0].type)
    } else {
        return `{
        ${outputs
            .map((t) => t.name && `${t.name}: ${codegenOutputType(t.type)}, `)
            .join('')}
        ${outputs
            .map((t, i) => `${i}: ${codegenOutputType(t.type)}`)
            .join(', ')}
      }`
    }
}

function codegenInputType(evmType: EvmType): string {
    switch (evmType.type) {
        case 'integer':
        case 'uinteger':
            return 'number | string'
        case 'address':
            return 'string'
        case 'bytes':
        case 'dynamic-bytes':
            return 'string | number[]'
        case 'array':
            return `(${codegenInputType(evmType.itemType)})[]`
        case 'boolean':
            return 'boolean'
        case 'string':
            return 'string'
        case 'tuple':
            return codegenTupleType(evmType, codegenInputType)
    }
}

function codegenOutputType(evmType: EvmOutputType): string {
    switch (evmType.type) {
        case 'integer':
            return 'string'
        case 'uinteger':
            return 'string'
        case 'address':
            return 'string'
        case 'void':
            return 'void'
        case 'bytes':
        case 'dynamic-bytes':
            return 'string'
        case 'array':
            return `(${codegenOutputType(evmType.itemType)})[]`
        case 'boolean':
            return 'boolean'
        case 'string':
            return 'string'
        case 'tuple':
            return codegenTupleType(evmType, codegenOutputType)
    }
}

function codegenTupleType(
    tuple: TupleType,
    generator: (evmType: EvmType) => string
) {
    return (
        '[' +
        tuple.components
            .map((component) => generator(component.type))
            .join(', ') +
        ']'
    )
}
