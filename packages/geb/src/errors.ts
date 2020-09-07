export enum GebErrorTypes {
    DOES_NOT_OWN_HAVE_PROXY = 'The specified address does not own a proxy',
    NO_ETHSEND_WITH_MULTICALL = 'Multicall supports only functions of type "view"',
}

export class GebError extends Error {
    constructor(public code: GebErrorTypes, message?: string) {
        super(message ? message + ' | ' + code : code)
        this.name = 'Geb Error'
    }
}
