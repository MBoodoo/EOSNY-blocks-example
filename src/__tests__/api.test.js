import React from "react"
import { getRecentBlockNum, getBlockInfo, getAbiActions} from "../services/api"
import { loadRecentBlocks } from "../utils"
import { cleanup } from "@testing-library/react";
import axios from 'axios';

jest.mock("axios")

afterEach(() => {
    cleanup()
  })

const url = 'https://api.eosnewyork.io/v1/chain'

////// Dummy Data //////
const infoMock = {
    status: 200,
    data: {
        "server_version": "",
        "chain_id": "",
        "head_block_num": 123456,
        "last_irreversible_block_num": 1,
        "last_irreversible_block_id": "",
        "head_block_id": "",
        "head_block_time": "",
        "head_block_producer": "",
        "virtual_block_cpu_limit": 1,
        "virtual_block_net_limit":1,
        "block_cpu_limit":1,
        "block_net_limit":1,
        "server_version_string":"",
        "fork_db_head_block_num":1,
        "fork_db_head_block_id": ""
    }
}

const blockInfoMock = {
    data: {
        "id": '123',
        "transactions": [
            {
                "trx": {
                    "transaction": {
                        "actions": [
                            "some data"
                        ]
                    }
                }
            }
        ],
    "timestamp": "binance"
    }
}

const abiMock = {
    "data": {
        "abi": {
            "actions": [
                {
                    "type": "close",
                    "ricardian_contract": "Markdown Data"
                }
            ]
        }
    }
}
    

/////////// Cases ///////////
test('should get block num recent block number', async () => {
    axios.post.mockResolvedValue(infoMock)
    await getRecentBlockNum()
        .then(res => {
            expect(axios.post).toHaveBeenCalledTimes(1)
            expect(axios.post).toHaveBeenCalledWith(url + '/get_info')
            expect(res).toBe(123456)
        });
})

test('should get block info by number', async () => {
    axios.post.mockResolvedValue(blockInfoMock)
    await getBlockInfo(123456)
        .then(res => {
            expect(axios.post).toHaveBeenCalledWith(url + '/get_block', {block_num_or_id: 123456})
            expect(res.id).toBe("123")
            expect(res.transactions[0].trx.transaction.actions[0]).toBe("some data")
            expect(res.timestamp).toBe("binance")
        });
})

test('should get abi by account name', async () => {
    axios.post.mockResolvedValue(abiMock)
    await getAbiActions('eosio.token')
        .then(res => {
            expect(axios.post).toHaveBeenCalledWith(url + '/get_abi', {account_name: "esosio.token"})
            expect(res.data.abi.actions[0].type).toBe("close")
            expect(res.data.abi.actions[0].ricardian_contract).toBe("Markdown Data")
        })
})
