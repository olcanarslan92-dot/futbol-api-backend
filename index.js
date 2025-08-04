const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://v3.football.api-sports.io';

app.get('/api/leagues', async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/leagues`, {
      headers: { 'x-apisports-key': API_KEY },
    });
    const data = await response.json();
    res.json(data.response);
  } catch (err) {
    res.status(500).json({ error: 'Veri alınamadı' });
  }
});

app.get('/api/live', async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/fixtures?live=all`, {
      headers: { 'x-apisports-key': API_KEY },
    });
    const data = await response.json();
    res.json(data.response);
  } catch (err) {
    res.status(500).json({ error: 'Canlı skor alınamadı' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});