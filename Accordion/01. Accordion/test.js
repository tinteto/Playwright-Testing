import { chromium } from 'playwright-chromium';
import { expect } from 'chai';
import { after, afterEach, before, beforeEach, describe, it } from 'mocha';


let browser;
let page; //declare reusable variables

describe("E2E tests", async function () {
    this.timeout(5000);

  //преди началото на тестването
  before(async () => {
    browser = await chromium.launch({ headless: false});
  });
  //след края на тестването
  after(async () => {
    await browser.close();
  });
  //преди всеки тест
  beforeEach(async () => {
    page = await browser.newPage();
  });
  //след всеки тест
  afterEach(async () => {
    await page.close();
  });

  it('loads article titles', async () => {
    await page.goto('http://127.0.0.1:5500/01.%20Accordion/index.html');

    await page.waitForSelector('.accordion div.head>span');

    const content = await page.textContent('#main');

    expect(content).to.contain('Scalable Vector Graphics');
    expect(content).to.contain('Open standard');
    expect(content).to.contain('Unix');
    expect(content).to.contain('ALGOL');
  });
});