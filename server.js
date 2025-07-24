const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/count', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto('https://www.ottosimon.nl/nl-nl/search?q=Tcg', { timeout: 60000 });

    const content = await page.content();
    const match = content.match(/(\d+)\s+resultaten/);
    const count = match ? parseInt(match[1]) : null;

    await browser.close();
    res.json({ count });
  } catch (err) {
    console.error('Scrape fout:', err);
    res.status(500).json({ error: 'Scrape mislukt' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server draait op http://localhost:${PORT}`);
});
