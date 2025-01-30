const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:8083'); // テスト対象のURLに変更してください

    // ページタイトルの確認
    const title = await page.title();
    console.log(`Page title: ${title}`);

    const h1Text = await page.$eval('h1', el => el.textContent);
    const expectedText = 'Hello Vue!';
    if (h1Text === expectedText) {
        console.log('h1 text matches expected value');
    } else {
        console.log(`h1 text does not match. Expected: "${expectedText}", but got: "${h1Text}"`);
    }

    await browser.close();
})();