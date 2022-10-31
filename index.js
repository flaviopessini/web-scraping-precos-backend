import { GetDataMercadolivre } from './src/GetDataMercadolivre.js'
import { GetDataMagazineLuiza } from './src/GetDataMagazineLuiza.js'
import { GetDataAmazon } from './src/GetDataAmazon.js'
import conf from './src/utils/conf.js'
import constants from './src/utils/constants.js'

export async function main(req, res) {
    const data = await req.body
    if (data.secret == null || data.secret != conf.SECRET_KEY) {
        return res.status(403).send('401 Unauthorized')
    }
    let loja
    let result
    switch (data.loja) {
        case constants.MERCADO_LIVRE:
            try {
                loja = new GetDataMercadolivre(data.url)
                result = await loja.getData(data)
            } catch (error) {
                if (error == 'Campo de busca inválido') {
                    return res.status(400).send(error)
                }
                return res.status(500).send(error)
            }
            break
        case constants.MAGAZINE_LUIZA:
            loja = new GetDataMagazineLuiza(data.url)
            result = await loja.getData()
            break
        case constants.AMAZON:
            loja = new GetDataAmazon(data.url)
            result = await loja.getData()
            break
        default:
            break
    }

    return res.status(200).send(result)
}
