import {
    ContractAddresses,
    ContractList,
    KOVAN_ADDRESSES,
    MAINNET_ADDRESSES,
} from '.'

export const getAddressList = (network: ContractAddresses): ContractList => {
    if (network === 'kovan') {
        return KOVAN_ADDRESSES
    } else if (network === 'mainnet') {
        return MAINNET_ADDRESSES
    } else {
        return network
    }
}
