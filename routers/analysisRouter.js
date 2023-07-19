const express = require('express');
const analysisController = require('../controllers/analysisController');

const router = express.Router();

router.post('/company', analysisController.getCompanyAnalysis);
// router.post('/sector', analysisController.getSectorAnalysis);

module.exports = router;