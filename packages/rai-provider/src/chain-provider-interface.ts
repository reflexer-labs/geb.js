export interface ChainProviderInterface<TX_OBJ> {
    ethCall(name: string, params: any): any
    ethSend(name: string, params: any): TX_OBJ
}
