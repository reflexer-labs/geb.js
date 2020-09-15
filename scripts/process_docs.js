const fs = require('fs')
const { resolve } = require('./src/utils')
const { execSync } = require('child_process')

main()
async function main() {
    // Copy only the files we want on the wesite
    execSync(
        `cp ${resolve('./../docs/classes/geb.md')} ${resolve(
            './../docs/geb.md'
        )}`
    )
    execSync(
        `cp ${resolve('./../docs/classes/gebproxyactions.md')} ${resolve(
            './../docs/gebproxyactions.md'
        )}`
    )

    execSync(
        `cp ${resolve(
            './../docs/classes/gebproxyactionsglobalsettlement.md'
        )} ${resolve('./../docs/gebproxyactionsglobalsettlement.md')}`
    )

    execSync(
        `cp ${resolve('./../docs/classes/safe.md')} ${resolve(
            './../docs/safe.md'
        )}`
    )

    execSync(
        `cp ${resolve('./../docs/classes/gebadmin.md')} ${resolve(
            './../docs/gebadmin.md'
        )}`
    )

    // Add the readme as a main page
    execSync(
        `cp ${resolve('./../packages/geb/README.md')} ${resolve(
            './../docs/gettingstarted.md'
        )}`
    )

    // Remove the rest
    execSync(`rm -f ${resolve('./../docs/README.md')}`)
    execSync(`rm -f ${resolve('./../docs/SUMMARY.md')}`)
    execSync(`rm -fr ${resolve('./../docs/classes')}`)
    execSync(`rm -fr ${resolve('./../docs/enums')}`)

    // Some minor edit of the files
    cleanUpTypeDoc(resolve('./../docs/geb.md'))
    cleanUpTypeDoc(resolve('./../docs/gebproxyactions.md'))
    cleanUpTypeDoc(resolve('./../docs/gebproxyactionsglobalsettlement.md'))
    cleanUpTypeDoc(resolve('./../docs/safe.md'))
    cleanUpTypeDoc(resolve('./../docs/gebadmin.md'))
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
