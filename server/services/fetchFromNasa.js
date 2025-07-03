const axios = require('axios');
const Photo = require('../models/Photo');
require('dotenv').config();

const API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';; // Replace with your real API key

async function fetchMarsPhotos({ rover, sol, earth_date, camera, page }) {
  const query = {};
  const dbQuery = { rover }; // For MongoDB lookup

  // ✅ Enforce: only send either sol OR earth_date, not both
  if (sol) {
    query.sol = Number(sol);
    dbQuery.sol = Number(sol);
  }
  else if (earth_date) {
    query.earth_date = earth_date;
    dbQuery.earth_date = earth_date;
  } else {
    // 🔴 If neither is provided, NASA API will reject
    throw new Error('Either sol or earth_date must be provided');
  }

  if (camera) {
    query.camera = camera.toUpperCase(); // NASA API requires uppercase camera names
    dbQuery.camera = camera.toUpperCase();
  }

  if (page) {
    query.page = page;
    dbQuery.page = page;
  }

  // ✅ 1. Check MongoDB Cache
  const cached = await Photo.find(dbQuery);
  if (cached.length > 0) {
    console.log(`🔍 Found ${cached.length} cached photos in MongoDB for rover: ${rover}`);
    return { source: 'mongo', photos: cached };
  } else {
    console.log(`🔍 No cached photos found in MongoDB for rover: ${rover}`);
  }

  // ✅ 2. Fetch from NASA API
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`;

  console.log('[NASA API QUERY]', {
    rover,
    sol,
    earth_date,
    camera,
    page
  });

  try {
    console.log(`📡 Hitting NASA API: https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`);

    const response = await axios.get(url, {
      params: { ...query, api_key: API_KEY },
    });

    console.log(`Fetched ${response.data.photos.length} photos from NASA API for rover: ${rover}`);

    const nasaPhotos = response.data.photos.map(photo => ({
      rover,
      sol: photo.sol,
      earth_date: photo.earth_date,
      camera: photo.camera.name,
      photo_id: photo.id,
      img_src: photo.img_src,
      page,
    }));

    if (nasaPhotos.length > 0) {
      await Photo.insertMany(nasaPhotos);
    }

    return { source: 'nasa', photos: nasaPhotos };
  } catch (err) {
    console.error('NASA API Error:', err.response?.data || err.message);
    return { source: 'nasa', photos: [] }; // return empty so route doesn’t crash
  }
}

module.exports = fetchMarsPhotos;
