const { Api, JsonRpc } = require('eosjs');
const fetch = require('node-fetch');           // node only; not needed in browsers
const rpc = new JsonRpc('https://api.eosnewyork.io/', { fetch })
import JsSignatureProvider from "eosjs/dist/eosjs-jssig"

const userLoad = async (action, data) => {
    const privateKey = localStorage.getItem("loadActionKey")
    const sigProvider = new JsSignatureProvider([privateKey])
    const api = new Api({
                    rpc,
                    sigProvider,
                    textDecoder: new TextDecoder(),
                    textEncoder: new TextEncoder()
                })

    try {
        const config = await api.transact({
            actions: [{
                account: "",
                name: action,
                authorization: [{
                    actor: localStorage.getItem("loadActionKey"),
                    permission: "active"
                }],
                data: data
            }]
        }, {
            blocksBehind: 10
        })
    } catch (error) {
        throw(error)
    }
}

export default class {
    static authorize({user, key}) {
        return new Promise((resolve, reject) => {
            localStorage.setItem("current_account", user)
            localStorage.setItem("current_key", key)
            userLoad("login", {username: user})
                .then(() => {
                    resolve()
                })
                .catch(error => {
                    localStorage.removeItem("current_account")
                    localStorage.removeItem("current_key")
                    reject(error)
                })
        })
    }
}

const getBlock = async () => {
    console.log(await rpc.history_get_actions("eosio.token").catch(err => console.error(err)))
}


// should get a block, state history plugin deprecated

getBlock()