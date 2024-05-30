const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to Google
  await page.goto('https://www.google.com');

  // Enter your search query
  const searchQuery = 'Your search query here';
  await page.type('input[name="q"]', searchQuery);

  // Wait for suggestions to appear
  await page.waitForSelector('.erkvQe');

  // Extract suggestions
  const suggestions = await page.evaluate(() => {
    const suggestionElements = document.querySelectorAll('.sbl1');
    const suggestions = [];
    suggestionElements.forEach((element) => {
      suggestions.push(element.textContent);
    });
    return suggestions;
  });

  // Print suggestions
  console.log('Search suggestions:', suggestions);

  await browser.close();
})();
