import fetch from 'node-fetch'
// import fs from 'fs'

async function request() {
    // const serverUrl = 'http://localhost:8080/'
    const serverUrl =
        'https://southamerica-east1-macro-centaur-321823.cloudfunctions.net/web-scraping'
    const productUrl = 'https://www.mercadolivre.com.br/'
    const body = {
        loja: 'Mercadolivre',
        url: productUrl,
        search: 'ssd 1 tb samsung evo plus',
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
