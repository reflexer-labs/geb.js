# geb.js

Typescript library to interact with the GEB system. 

## IMPORTANT

This is the developer dev repo. 

Library users please check: [packages/geb/README.md](packages/geb/README.md)

Or on NPM: https://www.npmjs.com/package/geb.js

## Overview

Geb.js adopted a monorepo structure to allow more flexibility to use the different packages. The packages are managed by Lerna and published on NPM. 


Geb.js consist of the following packages:

- geb.js 

  Main package the most people should use to interract with the GEB system. 
- [@reflexer-finance/geb-contract-base](https://www.npmjs.com/package/@reflexer-finance/geb-contract-base)

  Base classes for contract API, Chain interface definition, etc.. Also includes some global config such as the GEB live deployment addresses.
- [@reflexer-finance/geb-ethers-provider](https://www.npmjs.com/package/@reflexer-finance/geb-ethers-provider)

   Chain interface implementation using Ether.js
- [@reflexer-finance/geb-contract-api](https://www.npmjs.com/package/@reflexer-finance/geb-contract-api)
  
  Common ABIs of the GEB system and their generated typed interface. 
- [@reflexer-finance/geb-admin-api](https://www.npmjs.com/package/@reflexer-finance/geb-admin-api)
  
  ABIs of non-core contracts such as governance, oracles, polling and other periphery contracts. These contracts are not included in the main `geb.js` package to avoid bloat.
- [@reflexer-finance/geb-admin](https://www.npmjs.com/package/@reflexer-finance/geb-admin)

   Admin/Advanced packages including the admin contracts.
- [@reflexer-finance/geb-typechain](https://www.npmjs.com/package/@reflexer-finance/geb-typechain)
   
  Class generator to create typed smart-contract interface. Dev only package that is used to generate code for geb-contract-api and geb-admin-api. 
- [@reflexer-finance/geb-test](https://www.npmjs.com/package/@reflexer-finance/geb-test)
  
  Package including all tests
## Build & Publish

Install npm dependencies:
```
npm i -d
```

To build Typescript run 

```
npm run build
```

To update internal dependencies between the different packages run:

```
npm run bootstrap
```

To build the typed contract interface in `packages/geb-contract-api/src/generated` and `packages/geb-admin-api/src/generated` using the custom typechain template in the `geb-typechain` package:

```
npm run api-codegen
```

Generate docs from natspec comments and push them to the gitbook repo (directly push to the website):
```
npm run docs
npm run docs-publish
```


## Test

The testsuite currently require `seth` to be installed and available.

Run all test
```
npm run test Test
```

Run a specific test using a keyword from their description:

```
npm run test <keyword>
```