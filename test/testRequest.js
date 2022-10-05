import fetch from 'node-fetch'

async function request() {
    // const url = 'http://localhost:8080/'
    const url =
        'https://southamerica-east1-valiant-carrier-357523.cloudfunctions.net/web-scraping-black-friday'

    const data = await fetch(url).then((data) => data)

    const response = await data.text()

    console.log(response)
}

request()
