import { exec } from 'child_process'

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
