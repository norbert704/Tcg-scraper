const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/count', async (req, res) => {
  try {
    const url = 'https://www.ottosimon.nl/nl-nl/search?q=Tcg';
    const apiKey = 'b9a69e11e452b65b3a1f339efe9ab2ab';

    const response = await axios.get('http://api.scraperapi.com', {
      params: {
        api_key: apiKey,
        url: url,
        render: true
      }
    });

    const html = response.data;
    const match = html.match(/(\d+)\\s+resultaten/);
    const count = match ? parseInt(match[1]) : null;

    res.json({ count });
  } catch (err) {
    console.error('ScraperAPI fout:', err);
    res.status(500).json({ error: 'Scrape mislukt' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server draait op http://localhost:${PORT}`);
});
