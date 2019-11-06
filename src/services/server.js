const { JsonRpc } = require('eosjs');
const fetch = require('node-fetch');           // node only; not needed in browsers
const rpc = new JsonRpc('https://api.eosnewyork.io', { fetch })

const getBlock = async () => {
    console.log(await rpc.history_get_actions("eosio.token").catch(err => console.error(err)))
}

// should get a block

getBlock()