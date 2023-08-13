const express = require('express');
const listController = require('../controllers/listController');

const router = express.Router();

router.get('/ticker', listController.getTickerList);
router.get('/sector', listController.getSectorList);

module.exports = router;