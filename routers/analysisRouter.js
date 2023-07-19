const express = require('express');
const analysisController = require('../controllers/analysisController');

const router = express.Router();

router.get('/company', analysisController.getCompanyAnalysis);
// router.post('/sector', analysisController.getSectorAnalysis);

module.exports = router;