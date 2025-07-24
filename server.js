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

    // 🛠 DEBUG - tijdelijk log de eerste 1000 tekens
    console.log('🔍 HTML snippet:', html.substring(0, 1000));

    const match = html.match(/(\d+)\s+resultaten/i); // voeg 'i' toe voor hoofdletter-ongevoelig
    const count = match ? parseInt(match[1]) : null;

    if (!match) {
      console.warn('⚠️ Geen match gevonden in HTML');
    }

    res.json({ count });
  } catch (err) {
    console.error('ScraperAPI fout:', err);
    res.status(500).json({ error: 'Scrape mislukt' });
  }
});
