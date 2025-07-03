const express = require('express');
const router = express.Router();
const fetchMarsPhotos = require('../services/fetchFromNasa');

router.get('/search', async (req, res) => {
  try {
    console.log('🔥 /api/photos/search called with:', req.query);
    const { rover, sol, earth_date, camera, page } = req.query;
    if (!rover) {
      return res.status(400).json({ error: 'Rover is required' });
    }
    const result = await fetchMarsPhotos({ rover, sol, earth_date, camera, page });
    if (!result.photos.length) {
      return res.status(404).json({ error: 'No photos found' });
    }
    res.json({ source: result.source, photos: result.photos });
  } catch (err) {
    console.error('Error fetching photos:', err);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
});

module.exports = router;
