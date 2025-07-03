const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const photoRoutes = require('./routes/photos');
require('dotenv').config();

// Ensure you have a .env file with your MongoDB password
// and optionally your NASA API key if you want to use it in the future
// Example .env file content:
// MONGO_PASSWORD=your_mongo_password
// NASA_API_KEY=your_nasa_api_key
// const db_password = process.env.MONGO_PASSWORD || 'your_default_password'; // Use your MongoDB password here

const app = express();
const PORT = 8080;

// ✅ 1. Middleware to log all incoming requests
app.use((req, res, next) => {
  console.log(`➡ ${req.method} ${req.url}`);
  next();
});

// ✅ 2. Enable CORS for frontend at localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// ✅ 3. Parse incoming JSON bodies
app.use(express.json());

// ✅ 4. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
  console.log('✅ Connected to MongoDB Atlas');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
});

app.get('/', (req, res) => {
  res.send('🌌 Mars Photo API is running');
});

// ✅ 5. Use photo routes
app.use('/api/photos', photoRoutes);

// ✅ 6. Global error handler (for debugging)
app.use((err, req, res, next) => {
  console.error('💥 Global Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ✅ 7. Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
