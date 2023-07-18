const express = require('express');
const paperController = require('../controllers/paper.controller');
const imageUploader = require('../middleware/image-uploader');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();


router.post('/model-papers',paperController.modelPaperDownload)


module.exports = router;