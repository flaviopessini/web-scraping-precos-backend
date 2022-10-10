import puppeteer from 'puppeteer'

const userAgent =
    'Mozilla/5.0 (X11; Linux x86_64)' +
    'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36'

export class GetDataMercadolivre {
    constructor(url) {
        this.url = url
    }

    async getData(search) {
        const items = []
        const browser = await puppeteer.launch({
            headless: true,
        })
        const page = await browser.newPage()
        await page.setExtraHTTPHeaders({
            'Accept-Charset': 'utf-8',
            'Content-Type': 'text/html; charset=utf-8',
        })
        await page.setUserAgent(userAgent)
        await page.setViewport({ width: 1366, height: 768 })
        await page.goto(this.url, {
            waitUntil: 'domcontentloaded',
        })
        await page.waitForSelector('.nav-search-input')
        await new Promise((w) => setTimeout(w, 500))
        await page.type('.nav-search-input', search)
        await Promise.all([
            page.waitForNavigation(),
            page.click('.nav-search-btn'),
        ])
        const allLinks = await page.$$eval(
            '.ui-search-result__image > a',
            (element) => element.map((link) => link.href)
        )
        const links = [...new Set(allLinks)]
        let count = 0
        for (const l of links) {
            if (count >= 15) {
                break
            }
            await page.goto(l)
            await page.waitForSelector('.ui-pdp-title')
            const titulo = await page.$eval(
                '.ui-pdp-title',
                (element) => element.innerHTML
            )
            const preco = await page.$eval(
                '.andes-money-amount__fraction',
                (element) => element.innerHTML
            )
            items.push({ url: l, titulo: titulo, preco: preco })
            count++
        }
        //await new Promise((r) => setTimeout(r, 500));
        await page.close()
        await browser.close()
        return items
    }
}
