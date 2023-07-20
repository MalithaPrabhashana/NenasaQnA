const express = require('express');
const paperMarkingController = require('../controllers/paperMarking.controller');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/paper-upload',checkAuth.checkAuth,paperMarkingController.paperUpload);

router.get('/teachers',paperMarkingController.getTeachers);
router.get('/papers/:id',paperMarkingController.getPapers);
router.post('/downloaded',paperMarkingController.markDownloaded);
router.post('/uploaded',paperMarkingController.markUploaded);


module.exports = router;