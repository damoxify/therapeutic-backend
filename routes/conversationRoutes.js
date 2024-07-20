const express = require('express');
const axios = require('axios');
const { protect } = require('../middleware/authMiddleware');
const functionsBaseUrl = 'https://your-project-id.cloudfunctions.net';

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const response = await axios.get(`${functionsBaseUrl}/getConversationHistory`, { params: req.params });
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const response = await axios.post(`${functionsBaseUrl}/saveConversation`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

router.get('/real-time', protect, async (req, res) => {
  try {
    const response = await axios.get(`${functionsBaseUrl}/getRealTimeConversations`, { params: req.params });
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

module.exports = router;
