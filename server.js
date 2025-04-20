// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'https://job-portal-frontend-orcin-omega.vercel.app/'], // Your frontend URL
    credentials: true
  }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/jobs', require('./routes/jobs'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));