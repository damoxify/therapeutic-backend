// src/routes/userRoutes.js
const express = require('express');
const { getUserProfile, updateUserProfile } = require('../src/userController');
const firebaseAuth = require('../firebase');

const router = express.Router();

router.get('/profile', firebaseAuth, getUserProfile);
router.put('/profile', firebaseAuth, updateUserProfile);

module.exports = router;

