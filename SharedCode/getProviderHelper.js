const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://ucol.ac.nz/programmes/information-technology');
  //await page.screenshot({path: 'example.png'});
  await page.waitForSelector('.qual-link-list a');
  const result = await page.$$('.qual-link-list a');
  for (const item of result) 
  {
    let value = await page.evaluate(el => ({name: el.textContent, link: el.getAttribute('href')}), item);
    //let link = await page.evaluate(el => el.getAttribute('href'), item);
    console.log(value);
  }
  await browser.close();
})();