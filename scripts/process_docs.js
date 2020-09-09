const fs = require('fs')
const { resolve } = require('./src/utils')
const { execSync } = require('child_process')

main()

async function main() {
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
        `cp ${resolve('./../docs/classes/safe.md')} ${resolve(
            './../docs/safe.md'
        )}`
    )

    execSync(
        `cp ${resolve('./../packages/geb/README.md')} ${resolve(
            './../docs/gettingstarted.md'
        )}`
    )

    execSync(`rm -f ${resolve('./../docs/README.md')}`)
    execSync(`rm -f ${resolve('./../docs/SUMMARY.md')}`)
    execSync(`rm -fr ${resolve('./../docs/classes')}`)
    execSync(`rm -fr ${resolve('./../docs/enums')}`)
}
