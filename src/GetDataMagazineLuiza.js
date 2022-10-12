import puppeteer from 'puppeteer'
import constants from './utils/constants.js'

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

        await page.setUserAgent(constants.USER_AGENT)

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
