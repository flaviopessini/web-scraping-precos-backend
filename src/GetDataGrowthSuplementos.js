import puppeteer from 'puppeteer'
import constants from './utils/constants.js'

export class GetDataGrowthSuplementos {
    constructor(url) {
        this.url = url
    }

    async getData() {
        const browser = await puppeteer.launch({
            headless: true,
            args: constants.PUPPETEER_ARGS,
        })
        const page = await browser.newPage()
        await page.setExtraHTTPHeaders({
            'Accept-Charset': 'utf-8',
            'Content-Type': 'text/html; charset=utf-8',
        })
        await page.setUserAgent(constants.USER_AGENT)
        await page.setViewport({ width: 1366, height: 768 })
        await page.goto(this.url, {
            waitUntil: 'domcontentloaded',
        })
        const items = []
        const titulo = await page.$eval('.topoDetalhe-boxRight', (element) =>
            element.querySelector('.topoDetalhe-boxLeft-nome').innerHTML.trim()
        )
        const preco = await page.$eval(
            '.topoDetalhe-boxRight-precoDe',
            (element) => element.children[0].innerHTML.replace('R$', '')
        )
        items.push({ url: this.url, titulo: titulo, preco: preco })

        await page.close()
        await browser.close()
        return items
    }
}
