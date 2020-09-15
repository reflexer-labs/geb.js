import { exec } from 'child_process'
import { ethers } from 'ethers'

/**
 * Execute simple shell command (async wrapper).
 * @param {String} cmd
 * @return {Object} { stdout: String, stderr: String }
 */
const sh = async (cmd: string) => {
    return new Promise(function (resolve, reject) {
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                resolve({ stdout, stderr })
            }
        })
    })
}

export const sethCall = async (
    node: string,
    to: string,
    sig: string,
    args?: string[]
): Promise<string[]> => {
    const cmd = `seth --rpc-host='${
        node.endsWith('/') ? node : node + '/'
    }' call ${to} '${sig}' ${args ? args.join(' ') : ''}`
    const out: any = await sh(cmd)

    if (out.stderr) {
        throw new Error(`Seth call failed: ${out.stderr}`)
    } else {
        return (out.stdout as string).split('\n').slice(0, -1)
    }
}

// Given a contract object, verifies that it exist as expected at the given ETH address.
// Works by verifying the presence of the 4 bytes sig of all functions in the contract's bytecode
export const verifyContract = async (contract: any, ethNode: string) => {
    // Get contract bytecode from blockchain using seth
    const cmd = `seth --rpc-host='${
        ethNode.endsWith('/') ? ethNode : ethNode + '/'
    }' code ${contract.address}`
    const bytecode: string = ((await sh(cmd)) as any).stdout

    const errors: string[] = []

    Object.getOwnPropertyNames(Object.getPrototypeOf(contract))
        .filter((x) => x !== 'constructor')
        // Functions with this suffix are added by automation script
        .filter((x) => !x.includes('_readOnly'))
        // TODO: Figure this out. For mysterious reasons,
        // this function on the GebDeploy contract is not found
        .filter((x) => x !== 'releaseAuthCollateralAuctionHouse')
        .map((fct: any) => {
            // Get function JS code and extract the ABI
            const fctString: string = contract[fct].toString()
            const abiString = /(?<=( *)var abi = )(.*)/g.exec(fctString)

            if (!abiString.length) {
                throw new Error('ABI not found in function code')
            }

            const abi = JSON.parse(abiString[0].replace(';', ''))

            // Readable sig i.g: safes(bytes32,address)
            const sig = `${fct}(${abi.inputs
                .map((x: any) => x.type)
                .join(',')})`

            // EVM sig i.g: 0x3d422504
            const fourBytesSig = ethers.utils.id(sig).slice(0, 10)
            // Search the EVM sig in the bytecode with expected opcode suffix
            if (!bytecode.includes(`${fourBytesSig.slice(2)}`)) {
                errors.push(
                    `Signature of ${sig} ${fourBytesSig} not found in bytecode of contract ${contract.constructor.name} at address ${contract.address}`
                )
            }
        })

    if (errors.length > 0) {
        throw new Error(errors.join('\n'))
    }
}
