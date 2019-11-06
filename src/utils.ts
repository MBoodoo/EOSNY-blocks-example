import { getBlockInfo } from "./services/api"

// blockNumber type?

const loadRecentBlocks = async (recentBlockNumber: number, limit: number = 10) => {
    const blocks = []
    for (let i = 0; i < limit; i++ ) {
        const block = await getBlockInfo(recentBlockNumber - i)
        blocks.push(block)
    }
    return blocks
}

export {
    loadRecentBlocks
}