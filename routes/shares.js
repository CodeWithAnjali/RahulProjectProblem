const express = require('express');
const router = express.Router();
const Share = require('../models/Share'); // Assuming you have a Share model
const authenticate = require('../middleware/authenticate'); // Middleware for authentication

// Buy shares route
router.post('/buy', authenticate, async (req, res) => {
  const { shareName, quantity, price } = req.body;

  try {
    const share = new Share({
      userId: req.userId,
      shareName,
      quantity,
      price,
    });
    await share.save();

    res.status(201).json({ message: 'Shares purchased successfully!', share });
  } catch (err) {
    res.status(500).json({ error: 'Failed to purchase shares' });
  }
});

// Get holdings route
router.get('/holdings', authenticate, async (req, res) => {
  try {
    const holdings = await Share.find({ userId: req.userId });
    res.json(holdings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve holdings' });
  }
});

module.exports = router;
