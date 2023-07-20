const express = require('express');
const paperController = require('../controllers/paper.controller');


const router = express.Router();


router.post('/model-papers',paperController.modelPaperDownload)


module.exports = router;