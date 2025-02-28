const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const dataRoutes = require('./Routes/Inforoutes.js');
const topRevenueRoutes = require('./Routes/toprevRoutes.js');
const floodRiskRoutes = require('./Routes/floodriskRoutes.js');
const enviSafetyRoutes = require('./Routes/enviRoutes.js');
const usercreate=require('./Routes/usercreateroute.js');
const Land =require('./Routes/landRoute.js');
const Market = require('./Routes/marketRoutes.js');

const app = express();
const port = 4000;
app.use(bodyParser.json());
app.use(cors());

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB:', error));

// Graceful shutdown
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

// API endpoints

app.use('/api/bus-stations', dataRoutes);
app.use('/api/top-revenue', topRevenueRoutes);
app.use('/api/flood-risk', floodRiskRoutes);
app.use('/api/envi-safety', enviSafetyRoutes);
app.use('/api/user',usercreate);
app.use('/api/agri',Land);
app.use('/api/market',Market);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
