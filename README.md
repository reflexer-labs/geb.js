# geb.js

Typescript library to interact with the GEB protocol. 

## IMPORTANT

This is a dev repo that is being regularly updated.

Library users can check the following to get a general idea of the functionality: [packages/geb/README.md](packages/geb/README.md)

You can also use this library with NPM: https://www.npmjs.com/package/geb.js

## Overview

geb.js adopted a monorepo structure to allow for more flexibility when using the different sub-packages. The packages are managed by Lerna and published on NPM. 

geb.js consist of the following packages:

- geb.js 

  Main package the most people should use to interact with the GEB system. 
- [@reflexer-finance/geb-contract-base](https://www.npmjs.com/package/@reflexer-finance/geb-contract-base)

  Base classes for contract APIs, Chain interface definitions, etc. Also includes some global configs such as the GEB mainnet addresses.
- [@reflexer-finance/geb-ethers-provider](https://www.npmjs.com/package/@reflexer-finance/geb-ethers-provider)

   Chain interface implementation using Ether.js
- [@reflexer-finance/geb-contract-api](https://www.npmjs.com/package/@reflexer-finance/geb-contract-api)
  
  Common GEB system ABIs and their generated typed interfaces. 
- [@reflexer-finance/geb-admin-api](https://www.npmjs.com/package/@reflexer-finance/geb-admin-api)
  
  ABIs for non-core contracts such as governance, oracles, polling and other periphery contracts. These contracts are not included in the main `geb.js` package in order to to avoid bloat.
- [@reflexer-finance/geb-admin](https://www.npmjs.com/package/@reflexer-finance/geb-admin)

  Admin/Advanced packages.
- [@reflexer-finance/geb-typechain](https://www.npmjs.com/package/@reflexer-finance/geb-typechain)
   
  Class generator to create typed smart-contract interfaces. Dev only package that is used to generate code for geb-contract-api and geb-admin-api. 
- [@reflexer-finance/geb-test](https://www.npmjs.com/package/@reflexer-finance/geb-test)
  
## Build & Publish

Install npm dependencies:
```
npm i -d
```

To build the library run:

```
npm run build
```

To update internal dependencies between the different packages you can run:

```
npm run bootstrap
```

To build the typed contract interface in `packages/geb-contract-api/src/generated` and `packages/geb-admin-api/src/generated` using the custom typechain template in the `geb-typechain` package, run:

```
npm run api-codegen
```

Generate docs from natspec comments and push them to the Gitbook repo, run:
```
npm run docs
npm run docs-publish
```

## Tests

The testsuite currently requires `seth` to be installed and available on your machine.

Run all tests:
```
npm run test Test
```

Run a specific test using a keyword from the test description:

```
npm run test <keyword>
```
