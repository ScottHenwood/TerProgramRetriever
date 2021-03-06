const puppeteer = require('puppeteer');

const schoolInfoList = [
  {
    prov: 'weltec',
    url: 'https://www.weltec.ac.nz/study-programmes/information-technology',
    selectionString: '.card__link--programme',
    getLinkFun: (async (item, page) => {
      let value = await page.evaluate(el => el.getAttribute('href'), item);
      let name = await item.$eval('.programme-card__title', el => el.textContent);
      qual = {name: name, link: value};
      return qual;
    })
  },
  {
    prov: 'ucol',
    url: 'https://ucol.ac.nz/programmes/information-technology',
    selectionString: '.qual-link-list a',
    getLinkFun: (async (item, page) => {
      let value = await page.evaluate(el => ({name: el.textContent, link: '//ucol.ac.nz' + el.getAttribute('href')}), item);
      return value;
    })
  },
  {
    prov: 'eit',
    url: 'https://www.eit.ac.nz/subject-areas/computing/',
    selectionString: '.coursetype a',
    getLinkFun: (async (item, page) => {
      let value = await page.evaluate(el => ({name: el.textContent, link:  el.getAttribute('href')}), item);
      return value;
    })
  }
];

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  let foundQuals = [];
  for (const schoolInfo of schoolInfoList) {
    await page.goto(schoolInfo.url);
    await page.waitForSelector(schoolInfo.selectionString);
    const result = await page.$$(schoolInfo.selectionString);
    for (const item of result) 
    {
      qual = await schoolInfo.getLinkFun(item, page);
      qual.prov = schoolInfo.prov;
      foundQuals.push(qual);
    }
  }
  console.log(foundQuals);
  await browser.close();
})();