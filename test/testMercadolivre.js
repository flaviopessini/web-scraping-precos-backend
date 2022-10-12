import fetch from 'node-fetch'
import conf from './src/utils/conf.js'
// import fs from 'fs'

async function request() {
    const serverUrl = conf.SERVER_URL
    const productUrl = 'https://www.mercadolivre.com.br/'
    const body = {
        loja: 'Mercadolivre',
        url: productUrl,
        search: 'ssd 1 tb samsung evo plus',
        secret: null,
    }
    const data = await fetch(serverUrl, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    }).then((data) => data)
    const response = await data.text()
    console.log(response)

    // const jsonObj = JSON.parse(response)
    // fs.writeFileSync(
    //     'output.json',
    //     JSON.stringify(jsonObj),
    //     {
    //         encoding: 'utf8',
    //     },
    //     (err) => {
    //         if (err) {
    //             console.error(
    //                 'An error occured while writing JSON Object to File'
    //             )
    //             return console.error(err)
    //         }
    //     }
    // )
}

request()
