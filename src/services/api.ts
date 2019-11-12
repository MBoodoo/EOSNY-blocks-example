const axios = require('axios').default;

interface AxiosResponse<T = any>  {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  request?: any;
}

interface AxiosError<T = any> extends Error {
  code?: string;
  request?: any;
  response?: AxiosResponse<T>;
  isAxiosError: boolean;
  toJSON: () => object
}

const getRecentBlockNum = async () => {
    return await axios.post('https://api.eosnewyork.io/v1/chain/get_info')
    .then((res: any) => {
        return res.data.head_block_num
    })
    .catch((err: any) => console.error(err))
}

const getBlockInfo = async (blockNum: number) => {
    return await axios.post('https://api.eosnewyork.io/v1/chain/get_block', {
    transformResponse: undefined,
    block_num_or_id: blockNum
})
  .then((res: any) => {
    const {id, transactions, timestamp} = res.data
    // last trx should be an object instead of string (first ones aren't objects)
    const { actions } = transactions[transactions.length - 1].trx.transaction
    
    return {id, transactions, timestamp, actions, raw: res.data}
  })
  .catch((err: any) => console.error(err))
}

// should expect data to be a string with "name" and "ricardian_contract"
// Also should expect a Promise

 const getAbiActions = async (accountName: String) => {
  return await axios.post('https://api.eosnewyork.io/v1/chain/get_abi', {
    account_name: accountName
  })
  .then((res: any) => {
    return res.data.abi.actions
  })
}

export {
  getRecentBlockNum,
  getBlockInfo,
  getAbiActions
}