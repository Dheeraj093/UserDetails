const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const cors = require("cors");
const UserRoutes =  require("./Routes/User");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();
app.use(cors());

app.use(express.json());

// Routes

app.use('/user',UserRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status_code: 500, status: 'error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});