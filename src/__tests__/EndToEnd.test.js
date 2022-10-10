import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
      ignoreDefaultArgs: ['--disable-extensions']
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });
// Scenario 1
  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .event-info');
    expect(eventDetails).toBeNull();
  });
// Scenario 2
  test('User can expand an event to see its details', async () => {
    await page.click('.event .event-showDtls-btn');
    const eventDetails = await page.$('.event .event-info');
    expect(eventDetails).toBeDefined();
  });
// Scenario 3
  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .event-hideDtls-btn');
    const eventDetails = await page.$('.event .event-info');
    expect(eventDetails).toBeNull();
  });

});