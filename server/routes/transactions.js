const express = require('express');
// SECURITY: Trading bot transaction endpoints disabled
// const transactionController = require('../controllers/transactionController');

const router = new express.Router();
const { getNFTStats } = require('../controllers/transactionController');

// SECURITY: Trading bot transaction endpoints have been disabled
// router.get('/snipping', transactionController.snipping);
// router.get('/front', transactionController.front);

// Return empty arrays for disabled endpoints to prevent frontend errors
router.get('/snipping', (req, res) => {
  res.status(200).json({
    error: false,
    data: []
  });
});

router.get('/front', (req, res) => {
  res.status(200).json({
    error: false,
    data: []
  });
});

/**
 * GET /transactions/nft-stats
 * Returns NFT statistics
 */
router.get('/nft-stats', getNFTStats);

module.exports = router;