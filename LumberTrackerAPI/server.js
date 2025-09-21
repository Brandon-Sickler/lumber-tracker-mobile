const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('Failed to connect to MongoDB:', err.message);
  process.exit(1);
});

// Add this to log any errors after initial connection
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

// Routes
const lumberPackagesRouter = require('./routes/lumberPackages');
app.use('/api/lumberPackages', lumberPackagesRouter);

app.get('/', (req, res) => {
  console.log('Received a request on the / route');
  res.send('Lumber Tracker API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});