const fs = require('fs')
const { resolve } = require('./src/utils')
const { execSync } = require('child_process')

main()
async function main() {
    // Copy only the files we want on the website
    execSync(
        `cp ${resolve('./../docs/classes/geb.md')} ${resolve(
            './../docs/geb-js-core-package.md'
        )}`
    )
    execSync(
        `cp ${resolve('./../docs/classes/gebproxyactions.md')} ${resolve(
            './../docs/geb-js-proxy-actions.md'
        )}`
    )

    execSync(
        `cp ${resolve(
            './../docs/classes/gebproxyactionsglobalsettlement.md'
        )} ${resolve('./../docs/geb-js-global-settlement-proxies.md')}`
    )

    execSync(
        `cp ${resolve('./../docs/classes/safe.md')} ${resolve(
            './../docs/geb-js-safe-management.md'
        )}`
    )

    execSync(
        `cp ${resolve('./../docs/classes/gebadmin.md')} ${resolve(
            './../docs/geb-js-admin-utilities.md'
        )}`
    )

    // Add the readme as a main page
    execSync(
        `cp ${resolve('./../packages/geb/README.md')} ${resolve(
            './../docs/geb-js-get-started.md'
        )}`
    )

    // Remove the rest
    execSync(`rm -f ${resolve('./../docs/README.md')}`)
    execSync(`rm -f ${resolve('./../docs/SUMMARY.md')}`)
    execSync(`rm -fr ${resolve('./../docs/classes')}`)
    execSync(`rm -fr ${resolve('./../docs/enums')}`)

    // Some minor edit of the files
    cleanUpTypeDoc(resolve('./../docs/geb-js-core-package.md'))
    cleanUpTypeDoc(resolve('./../docs/geb-js-proxy-actions.md'))
    cleanUpTypeDoc(resolve('./../docs/geb-js-global-settlement-proxies.md'))
    cleanUpTypeDoc(resolve('./../docs/geb-js-safe-management.md'))
    cleanUpTypeDoc(resolve('./../docs/geb-js-admin-utilities.md'))
}

function regexReplaceInFile(filePath, regex, replace) {
    let file = fs.readFileSync(filePath, 'utf8')
    file = file.replace(regex, replace)
    fs.writeFileSync(filePath, file)
}

function cleanUpTypeDoc(filePath) {
    // Remove the index and Hierarchy
    regexReplaceInFile(filePath, /## Hierarchy(.*)(?=## Constructors)/gs, '')
    regexReplaceInFile(filePath, /\n###  constructor/g, '')
    regexReplaceInFile(filePath, /\*Overrides void\*\n/g, '')
}
