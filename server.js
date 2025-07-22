const cors = require('cors');

const express = require('express');
const puppeteer = require(' 'puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/count', async (req, res) => {
  const url = 'https://www.ottosimon.nl/nl-nl/search?q=Tcg';
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    await page.waitForSelector('span.total-results', { timeout: 10000 });

    const count = await page.$eval('span.total-results', el => parseInt(el.innerText));
    res.json({ count });
  } catch (err) {
    console.error('Fout bij ophalen:', err);
    res.status(500).json({ error: 'Fout bij ophalen van resultaten' });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server draait op http://localhost:${PORT}/count`);
});
