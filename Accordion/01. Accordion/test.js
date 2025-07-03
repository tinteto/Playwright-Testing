import { chromium } from 'playwright-chromium';
import { expect } from 'chai';
import { after, afterEach, before, beforeEach, describe, it } from 'mocha';


let browser;
let page; //declare reusable variables

describe("E2E tests", function () {
    this.timeout(5000);

  //преди началото на тестването
  before(async () => {
    browser = await chromium.launch({ headless: false });
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

  it('"More" button is working', async() => {
    await page.goto('http://127.0.0.1:5500/01.%20Accordion/index.html');

    await page.click('text=More');

    await page.waitForSelector('.extra p');

    const text = await page.textContent('.extra p');

    expect(text).to.contain('Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)');
  });

  it('"Less" button is working', async() => {
    await page.goto('http://127.0.0.1:5500/01.%20Accordion/index.html');

    await page.click('text=More');

    await page.waitForSelector('.extra p');

    const text = await page.textContent('.extra p');
    let visible = await page.isVisible('.extra p');

    expect(visible).to.be.true;

    await page.click('text=Less');
    visible = await page.isVisible('.extra p');
    expect(visible).to.be.false;
  })
});