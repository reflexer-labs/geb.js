import { ethers, Wallet } from 'ethers'
import {
    Geb,
    GebAdmin,
    utils,
    contracts,
    adminContracts,
} from '@reflexer-finance/geb-admin'

declare var _: any

let rpcUrl: string
let network: 'kovan' | 'mainnet'

if (process.env.NETWORK === 'mainnet') {
    console.log('Start geb-console on Mainnet...')
    rpcUrl = 'https://parity0.mainnet.makerfoundation.com:8545'
    network = 'mainnet'
} else {
    console.log('Start geb-console on Kovan...')
    rpcUrl = 'https://parity0.kovan.makerfoundation.com:8545'
    network = 'kovan'
}

if (process.env.RPC_URL) {
    rpcUrl = process.env.RPC_URL
}

const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
const geb = new Geb(network, provider)
const gebAdmin = new GebAdmin(network, provider)
const ETH_A = utils.ETH_A
const WAD = utils.WAD
const decodeChainError = utils.decodeChainError
const BigNumber = ethers.BigNumber

let wallet: Wallet
if (process.env.PK) {
    wallet = new ethers.Wallet(process.env.PK, provider)
}

const wait = <T>(promise: Promise<T>): T => {
    return require('deasync2').await(promise)
}
