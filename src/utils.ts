import { getBlockInfo, getAbiActions } from "./services/api"
import { BlockType, abiActionType } from "./App"

// blockNumber type?

const loadRecentBlocks = async (recentBlockNumber: number, limit: number = 10) => {
    let blocks: BlockType[] = []
    for (let i = 0; i < limit; i++ ) {
        const block = await getBlockInfo(recentBlockNumber - i)   
        blocks.push(block)
    }
    return blocks
}

const loadAbis = (blockList: BlockType[]) => {
    let actionsList: abiActionType[][] = []

    blockList.map( async (block: BlockType, i) => {
        const { account } = block.actions[i]
        const abiActions = await getAbiActions(account)
        actionsList.push(abiActions)
    })
    return actionsList
}

export {
    loadRecentBlocks,
    loadAbis
}