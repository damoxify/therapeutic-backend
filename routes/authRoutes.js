const express = require('express');
const { googleSignIn, signup, login } = require('../src/authController');

const router = express.Router();

router.post('/google-signin', googleSignIn);
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
