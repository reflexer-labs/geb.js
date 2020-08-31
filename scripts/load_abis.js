const fs = require('fs')
const { loadJson, resolve, saveJson } = require('./src/utils')
const solc = require('solc')

const sources = {}

fs.readdirSync(resolve('./../deps/geb/src/'))
    .filter((x) => x.slice(-4) === '.sol')
    //.map((x) => x.slice(0, -4))
    .map(
        (x) =>
            (sources[x] = {
                content: fs.readFileSync(
                    resolve(`./../deps/geb/src/${x}`),
                    'utf-8'
                ),
            })
    )

const contract = fs.readFileSync(
    resolve('./../deps/geb/src/SAFEEngine.sol'),
    'utf-8'
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
    },
}

console.log('Compile contracts..')
const out = JSON.parse(solc.compile(JSON.stringify(config)))

for (let file in out.contracts) {
    for (let contract in out.contracts[file]) {
        if (contract.endsWith('Like')) continue
        fs.writeFileSync(
            resolve(`../packages/geb-contract-api/abis/${contract}.json`),
            JSON.stringify(out.contracts[file][contract])
        )
    }
}
