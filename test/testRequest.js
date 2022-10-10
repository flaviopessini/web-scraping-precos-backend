import fetch from 'node-fetch'

async function request() {
    const url = 'https://southamerica-east1-macro-centaur-321823.cloudfunctions.net/web-scraping'

    const body = {
        loja: 'Magazineluiza',
        url: url
        // search: 'ssd 1 tb samsung evo plus',
    }

    // const url =
    //     'http://localhost:8080/'

    const data = await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }).then((data) => data)

    const response = await data.text()

    console.log(data)
}

request()
