const fs = require('fs')
const { loadJson, resolve, saveJson } = require('./src/utils')
const solc = require('solc')
const { execSync } = require('child_process')

const sources = {}

const addToSource = (name, path) => {
    sources[name] = {
        content: fs.readFileSync(resolve(path), 'utf-8'),
        // content: 'X',
    }
}

// geb repo
fs.readdirSync(resolve('./../deps/geb/src/'))
    .filter((x) => x.slice(-4) === '.sol' && x !== 'CoinSavingsAccount.sol')
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

// Remove some unwanted contracts
execSync(
    `rm -f ${resolve(
        './../packages/geb-contract-api/abis/GebProxyActionsCoinSavingsAccount.json'
    )}`
)
