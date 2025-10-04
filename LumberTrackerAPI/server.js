// Express server for lumber tracker API

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('Failed to connect to MongoDB:', err.message);
  process.exit(1);
});

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

const lumberPackagesRouter = require('./routes/lumberPackages');
app.use('/api/lumberPackages', lumberPackagesRouter);

app.get('/', (req, res) => {
  console.log('Received a request on the / route');
  res.send('Lumber Tracker API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API accessible at: http://localhost:${PORT}`);
});