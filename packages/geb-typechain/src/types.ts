import {
    EvmType,
    EvmOutputType,
    TupleType,
    AbiParameter,
    AbiOutputParameter,
    StateMutability,
} from 'typechain'

export function generateInputTypes(
    input: Array<AbiParameter>,
    stateMutability: StateMutability
): string {
    let ret = ''

    if (stateMutability === 'payable') {
        if (input.map((x) => x.name).some((x) => x === 'ethValue')) {
            throw new Error('Payable contracts with variable named ethValue')
        }

        ret = 'ethValue: BigNumberish, '
    }

    if (input.length === 0) {
        return ret
    }

    const processedInputName = generateInputNames(input)

    ret +=
        input
            .map(
                (input, index) =>
                    `${processedInputName[index]}: ${generateInputType(
                        input.type
                    )}`
            )
            .join(', ') + ', '

    return ret
}

export function generateInputNames(input: Array<AbiParameter>): string[] {
    // Use the type for the name of anonymous variables
    let name = input.map((i) => i.name || i.type.type)

    let findDuplicates = (arr: string[]) =>
        arr.filter((item, index) => arr.indexOf(item) != index)

    // Suffixes duplicated variable names with a number
    // i.g: allowance(address,address) => allowance(address1,address2)
    let duplicates = [...new Set(findDuplicates(name))]
    for (let d of duplicates) {
        let count = 1
        for (let l in name) {
            if (name[l] === d) {
                name[l] = name[l] + count.toString()
                count++
            }
        }
    }

    return name
}

export function generateOutputTypes(
    outputs: Array<AbiOutputParameter>
): string {
    if (outputs.length === 1) {
        return generateOutputType(outputs[0].type)
    } else {
        // If there are multiple parameters, it return an object. If the return values don't have a name, call them '0', '1', etc...
        return `{
      ${outputs
          .map(
              (t, i) =>
                  `${t.name || i.toString()}: ${generateOutputType(t.type)}, `
          )
          .join('')}
      }`
    }
}

// https://docs.ethers.io/ethers.js/html/api-contract.html#types
export function generateInputType(evmType: EvmType): string {
    switch (evmType.type) {
        case 'integer':
            return 'BigNumberish'
        case 'uinteger':
            return 'BigNumberish'
        case 'address':
            return 'string'
        case 'bytes':
        case 'dynamic-bytes':
            return 'BytesLike'
        case 'array':
            if (evmType.size !== undefined) {
                return `[${Array(evmType.size)
                    .fill(generateInputType(evmType.itemType))
                    .join(', ')}]`
            } else {
                return `(${generateInputType(evmType.itemType)})[]`
            }
        case 'boolean':
            return 'boolean'
        case 'string':
            return 'string'
        case 'tuple':
            return generateTupleType(evmType, generateInputType)
    }
}

export function generateOutputType(evmType: EvmOutputType): string {
    switch (evmType.type) {
        case 'integer':
        case 'uinteger':
            return evmType.bits <= 48 ? 'number' : 'BigNumber'
        case 'address':
            return 'string'
        case 'void':
            return 'void'
        case 'bytes':
        case 'dynamic-bytes':
            return 'string'
        case 'array':
            if (evmType.size !== undefined) {
                return `[${Array(evmType.size)
                    .fill(generateOutputType(evmType.itemType))
                    .join(', ')}]`
            } else {
                return `(${generateOutputType(evmType.itemType)})[]`
            }
        case 'boolean':
            return 'boolean'
        case 'string':
            return 'string'
        case 'tuple':
            return generateOutputTupleType(evmType)
    }
}

export function generateTupleType(
    tuple: TupleType,
    generator: (evmType: EvmType) => string
) {
    return (
        '{' +
        tuple.components
            .map(
                (component) => `${component.name}: ${generator(component.type)}`
            )
            .join(',') +
        '}'
    )
}

export function generateOutputTupleType(tuple: TupleType) {
    return (
        '{' +
        tuple.components
            .map(
                (component) =>
                    `${component.name}: ${generateOutputType(component.type)} ,`
            )
            .join('\n') +
        tuple.components
            .map(
                (component, index) =>
                    `${index}: ${generateOutputType(component.type)}`
            )
            .join(', ') +
        '}'
    )
}
