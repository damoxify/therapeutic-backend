// src/app.js
const express = require('express');
const authRoutes = require('./routes/authRoutes');
//const conversationRoutes = require('./routes/conversationRoutes');
// const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle authentication
app.use('/auth', authRoutes);

// Routes that may require authentication
//app.use('/conversation', conversationRoutes);
// app.use('/user', userRoutes);

module.exports = app;

