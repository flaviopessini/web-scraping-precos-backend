import fetch from 'node-fetch'
import conf from '../src/utils/conf.js'
import constants from '../src/utils/constants.js'
// import fs from 'fs'

async function request() {
    //const serverUrl = conf.SERVER_URL
    const serverUrl = 'http://localhost:8080/'
    const productUrl =
        'https://www.gsuplementos.com.br/multivitaminico-120-caps-nova-formula-growth-supplements-p985851'
    const body = {
        secret: 'CHAVE_SECRETA_AQUI', // CHAVE SECRETA AQUI
        loja: constants.GROWTH_SUPLEMENTOS,
        url: productUrl,
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
