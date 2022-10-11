import { GetDataMercadolivre } from './src/GetDataMercadolivre.js'
import { GetDataMagazineLuiza } from './src/GetDataMagazineLuiza.js'

export async function main(req, res) {
    // const productUrl =
    //     'https://www.magazineluiza.com.br/pneu-aro-15-goodyear-185-60r15-88h-direction-sport/p/218806400/au/pine'
    // const productUrl =
    //     'https://www.magazineluiza.com.br/guarda-roupa-casal-espelho-6-portas-2-gavetas-real-atualle/p/fk4hj374j2/mo/guro/'

    const data = await req.body
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
    // response = await loja.getData(data.search) // COM BUSCA NO ML
    //loja = await loja.getData() // SEM BUSCA

    res.status(200).send(result)
}
