import { MAKER_KOVAN_NODE } from './../const'

import { testContractPresence } from './contracts'

describe('Test contract API', async () => {
    testContractPresence('kovan', MAKER_KOVAN_NODE)
})
