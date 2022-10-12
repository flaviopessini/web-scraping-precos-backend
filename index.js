import { GetDataMercadolivre } from './src/GetDataMercadolivre.js'
import { GetDataMagazineLuiza } from './src/GetDataMagazineLuiza.js'
import conf from './src/utils/conf.js'
import constants from './src/utils/constants.js'

export async function main(req, res) {
    const data = await req.body
    console.log(process.env.SECRET_KEY)
    if (data.secret == null || data.secret != conf.SECRET_KEY) {
        res.status(403).send('401 Unauthorized')
    }
    let loja
    let result
    switch (data.loja) {
        case constants.MERCADO_LIVRE:
            loja = new GetDataMercadolivre(data.url)
            result = await loja.getData(data.search)
            break
        case constants.MAGAZINE_LUIZA:
            loja = new GetDataMagazineLuiza(data.url)
            result = await loja.getData()
            break
        default:
            break
    }

    res.status(200).send(result)
}
