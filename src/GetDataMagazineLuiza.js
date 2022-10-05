import puppeteer from 'puppeteer'

export class GetDataMagazineLuiza {
    constructor(url) {
        this.url = url
    }


    async getData() {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        
        // await page.waitForSelector('.sc-kDTinF')
        
        const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' + 'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36'
        
        await page.setUserAgent(userAgent)
        
        await page.goto(this.url)

        // console.log('URL -> ', this.url);

        const data = await page.evaluate(() => {
            return {
                //productName: document.querySelectorAll("[data-testid='heading-product-title']")[0].innerText

                productName: document.querySelector('.iAaGpT').innerHTML,

                //productName: document.querySelector('.sc-kDTinF.iAaGpT').innerHTML,
                productValue: document.querySelector('.cSqnA').innerHTML,
                productStore: document.querySelector('.dMcJTO') ? document.querySelector('.dMcJTO').innerHTML : null,
                valuePix: document.querySelector('.kIKdrL').innerHTML
            }
        })
        
        // console.log('DATA -> ', data);

        await browser.close()

        return data;
    }
}

