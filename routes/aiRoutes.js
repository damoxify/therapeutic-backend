const express = require('express');
const axios = require('axios');
const { protect } = require('../middleware/authMiddleware');
const functionsBaseUrl = 'https://your-project-id.cloudfunctions.net';

const router = express.Router();

router.post('/input', protect, async (req, res) => {
  try {
    const response = await axios.post(`${functionsBaseUrl}/sendInputToAI`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

router.get('/output/:userId', protect, async (req, res) => {
  try {
    const response = await axios.get(`${functionsBaseUrl}/getAIOutput`, { params: req.params });
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

module.exports = router;
