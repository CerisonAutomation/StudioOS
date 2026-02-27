const puppeteer = require('puppeteer');

describe('HORUS ZENITH Dashboard E2E Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should load dashboard and display stats', async () => {
    await page.goto('http://localhost:3000'); // Assuming dev server running
    await page.waitForSelector('h1'); // Wait for page load

    const title = await page.$eval('h1', el => el.textContent);
    expect(title).toContain('HORUS ZENITH Dashboard');

    // Check for stats cards
    const stats = await page.$$eval('.stat-card', cards => cards.map(card => card.textContent));
    expect(stats.length).toBeGreaterThan(0);
  });

  it('should navigate to HORUS MODE page', async () => {
    await page.click('a[href="/horus"]'); // Assuming link exists
    await page.waitForSelector('h1');

    const horusTitle = await page.$eval('h1', el => el.textContent);
    expect(horusTitle).toContain('HORUS MODE');
  });

  it('should handle agent orchestration', async () => {
    // Mock or test form submission if possible
    // This would require setting up test data
    // For now, just check if form exists
    const form = await page.$('form');
    expect(form).toBeTruthy();
  });
});
