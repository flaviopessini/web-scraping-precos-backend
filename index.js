import { GetDataMagazineLuiza } from './src/GetDataMagazineLuiza.js'

export async function main(req, res) {
    // const productUrl = 'https://www.magazineluiza.com.br/pneu-aro-15-goodyear-185-60r15-88h-direction-sport/p/218806400/au/pine'
    const productUrl =
        'https://www.magazineluiza.com.br/guarda-roupa-casal-espelho-6-portas-2-gavetas-real-atualle/p/fk4hj374j2/mo/guro/'

    const magazineLuiza = new GetDataMagazineLuiza(productUrl)

    const response = await magazineLuiza.getData()

    console.log('executando...')

    res.status(200).send(response)
}
