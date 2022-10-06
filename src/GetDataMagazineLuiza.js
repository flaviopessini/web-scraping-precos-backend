import puppeteer from 'puppeteer'

const userAgent =
    'Mozilla/5.0 (X11; Linux x86_64)' +
    'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36'

export class GetDataMagazineLuiza {
    constructor(url) {
        this.url = url
    }

    async getData() {
        const browser = await puppeteer.launch({
            headless: true,
        })

        const page = await browser.newPage()

        await page.setExtraHTTPHeaders({
            'Accept-Charset': 'utf-8',
            'Content-Type': 'text/html; charset=utf-8',
        })

        await page.setUserAgent(userAgent)

        await page.setViewport({ width: 1280, height: 720 })

        await page.goto(this.url, {
            waitUntil: 'domcontentloaded',
        })

        const data = await page.evaluate(() => {
            return {
                //productName: document.querySelectorAll("[data-testid='heading-product-title']")[0].innerText

                productName: document.querySelector('.iAaGpT').innerHTML,

                //productName: document.querySelector('.sc-kDTinF.iAaGpT').innerHTML,
                productValue: document.querySelector('.cSqnA').innerHTML,
                productStore: document.querySelector('.dMcJTO')
                    ? document.querySelector('.dMcJTO').innerHTML
                    : null,
                valuePix: document.querySelector('.kIKdrL').innerHTML,
            }
        })

        await page.close()
        await browser.close()

        return data
    }
}
