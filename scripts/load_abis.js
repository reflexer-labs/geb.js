const fs = require('fs')
const { loadJson, resolve, saveJson } = require('./src/utils')
const solc = require('solc')

const sources = {}

const addToSource = (name, path) => {
    sources[name] = {
        content: fs.readFileSync(resolve(path), 'utf-8'),
        // content: 'X',
    }
}

// geb repo
fs.readdirSync(resolve('./../deps/geb/src/'))
    .filter((x) => x.slice(-4) === '.sol')
    //.map((x) => x.slice(0, -4))
    .map((x) => addToSource(x, `./../deps/geb/src/${x}`))

// geb-safe-manager repo
addToSource(
    'GebSafeManager.sol',
    './../deps/geb-safe-manager/src/GebSafeManager.sol'
)
addToSource('GetSafes.sol', './../deps/geb-safe-manager/src/GetSafes.sol')

// geb-proxy-registry
addToSource(
    'GebProxyRegistry.sol',
    './../deps/geb-proxy-registry/src/GebProxyRegistry.sol'
)

// ds-proxy and its dependencies
addToSource('proxy.sol', './../deps/ds-proxy/src/proxy.sol')
addToSource('note.sol', './../deps/ds-proxy/lib/ds-note/src/note.sol')
addToSource('auth.sol', './../deps/ds-proxy/lib/ds-auth/src/auth.sol')

// geb-proxu-action
addToSource(
    'GebProxyActions.sol',
    './../deps/geb-proxy-actions/src/GebProxyActions.sol'
)

const config = {
    language: 'Solidity',
    sources: sources,
    settings: {
        outputSelection: {
            '*': {
                '*': ['abi', 'devdoc', 'userdoc'],
            },
        },
        remappings: [
            'ds-proxy/proxy.sol=proxy.sol',
            'ds-note/note.sol=note.sol',
            'ds-auth/auth.sol=auth.sol',
        ],
    },
}

// ds-token/=lib/ds-token/src/ ds-token=lib/ds-token/src/index.sol erc20/=lib/ds-token/lib/erc20/src/ erc20=lib/ds-token/lib/erc20/src/index.sol ds-math/=lib/ds-token/lib/ds-math/src/ ds-math=lib/ds-token/lib/ds-math/src/index.sol ds-test/=lib/ds-token/lib/ds-test/src/ ds-test=lib/ds-token/lib/ds-test/src/index.sol ds-stop/=lib/ds-token/lib/ds-stop/src/ ds-stop=lib/ds-token/lib/ds-stop/src/index.sol ds-auth/=lib/ds-token/lib/ds-stop/lib/ds-auth/src/ ds-auth=lib/ds-token/lib/ds-stop/lib/ds-auth/src/index.sol ds-note/=lib/ds-token/lib/ds-stop/lib/ds-note/src/ ds-note=lib/ds-token/lib/ds-stop/lib/ds-note/src/index.sol

console.log('Compile contracts..')
const out = JSON.parse(solc.compile(JSON.stringify(config)))
console.log(out.error)

for (let file in out.contracts) {
    console.log(`File ${file}`)
    for (let contract in out.contracts[file]) {
        // Blacklist contracts here
        if (contract.endsWith('Like')) continue
        if (contract === 'SAFEHandler') continue
        if (contract.startsWith('DS') && contract != 'DSProxy') continue
        if (contract === 'Common') continue
        console.log(`  - ${contract}`)
        fs.writeFileSync(
            resolve(`../packages/geb-contract-api/abis/${contract}.json`),
            JSON.stringify(out.contracts[file][contract])
        )
    }
}
