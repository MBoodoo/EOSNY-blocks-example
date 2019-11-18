import { getBlockInfo, getAbiActions } from "./services/api"
import { BlockType, abiActionType } from "./App"

// blockNumber type?

const loadRecentBlocks = async (recentBlockNumber: number, limit: number = 10) => {
    let blocks: BlockType[] = []
    for (let i = 0; i < limit; i++ ) {
        const block = await getBlockInfo(recentBlockNumber - i)   

        console.log(block)

        blocks.push(block)
    }
    return await blocks
}

const loadAbis = async (blockList: BlockType[]) => {
    let actionsList: Array<abiActionType[]> = []
    await blockList.map( async (block: BlockType) => {

        const account = block.actions[0].account
        const abiActions = await getAbiActions(account)
        console.log(abiActions)

        actionsList.push(abiActions)
    }) 
    return await actionsList 

}

export {
    loadRecentBlocks,
    loadAbis
}