const fs = require('fs')
const { loadJson, resolve, saveJson } = require('./src/utils')

if (process.argv.length < 3) {
    console.error('Give a name to the package')
    process.exit(1)
}

const name = process.argv[2]

fs.mkdirSync(`packages/${name}/src`, { recursive: true })

const packageJson = `
{
    "name": "@reflexer-finance/${name}",
    "version": "0.0.0",
    "description": "",
    "main": "./lib/index.js",
    "scripts": {
      "test": "echo \\"Error: no test specified\\" && exit 1"
    },
    "author": "Guillaume Felley <guillaume@reflexer.finance>",
    "license": "ISC"
  }
`

fs.writeFileSync(
    resolve(__dirname, `../packages/${name}/package.json`),
    packageJson
)

const tsconf = `
{
    "extends": "../../tsconfig.package.json",
    "compilerOptions": {
      "rootDir": "./src",
      "outDir": "./lib/"
    },
    "include": ["./src/*.ts"],
    "exclude": []
  }
`

fs.writeFileSync(
    resolve(__dirname, `../packages/${name}/tsconfig.json`),
    tsconf
)
fs.writeFileSync(resolve(__dirname, `../packages/${name}/src/index.ts`), '')

let path = resolve('../tsconfig.project.json')
let projectConfig = loadJson(path)

projectConfig.references.push({ path: `./packages/${name}` })
saveJson(path, projectConfig)
console.log(name)
