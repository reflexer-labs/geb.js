import { TContext, TFileDesc, TsGeneratorPlugin } from 'ts-generator'

import { extractAbi, extractDocumentation, getFilename, parse } from 'typechain'

import { join, resolve } from 'path'

import { codegenContract } from './codegen'

const DEFAULT_OUT_PATH = './types/web3-v1-contracts/'

interface IWeb3Cfg {
    outDir?: string
}

export class ContractAPIGenerator extends TsGeneratorPlugin {
    public name = 'geb'

    private readonly outDirAbs: string

    constructor(ctx: TContext<IWeb3Cfg>) {
        super(ctx)

        const { cwd, rawConfig } = ctx

        this.outDirAbs = resolve(cwd, rawConfig.outDir || DEFAULT_OUT_PATH)
    }

    transformFile(file: TFileDesc): TFileDesc | void {
        const abi = extractAbi(file.contents)
        const isEmptyAbi = abi.length === 0
        if (isEmptyAbi) {
            return
        }

        const name = getFilename(file.path)
        const documentation = extractDocumentation(file.contents)

        const contract = parse(abi, name, documentation)

        return {
            path: join(this.outDirAbs, `${name}.d.ts`),
            contents: codegenContract(contract),
        }
    }
}
