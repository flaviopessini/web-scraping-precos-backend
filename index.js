import { GetDataMercadolivre } from './src/GetDataMercadolivre.js'
import { GetDataMagazineLuiza } from './src/GetDataMagazineLuiza.js'
import conf from './src/utils/conf.js'

export async function main(req, res) {
    const data = await req.body
    console.log(process.env.SECRET_KEY)
    if (data.secret == null || data.secret != conf.SECRET_KEY) {
        res.status(403).send('401 Unauthorized')
    }
    let loja
    let result
    switch (data.loja) {
        case 'Mercadolivre':
            loja = new GetDataMercadolivre(data.url)
            console.log('Mercadolivre')
            result = await loja.getData(data.search)
            break
        case 'Magazineluiza':
            loja = new GetDataMagazineLuiza(data.url)
            console.log('Magazineluiza')
            result = await loja.getData()
            break
        default:
            break
    }

    res.status(200).send(result)
}
