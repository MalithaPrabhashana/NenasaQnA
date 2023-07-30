const express = require('express');
const paperMarkingController = require('../controllers/paperMarking.controller');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/paper-upload',checkAuth.checkAuth,paperMarkingController.paperUpload);

router.get('/teachers/:subject',paperMarkingController.getTeachers);
router.post('/papers',checkAuth.checkAuth,paperMarkingController.getPapers);    //user
router.post('/make-open',checkAuth.checkAuth,paperMarkingController.makeOpen);    //user
router.post('/update-upload',checkAuth.checkAuth,paperMarkingController.markUploaded);  

// router.get('/papers/:id',paperMarkingController.getPapers);
router.post('/downloaded',paperMarkingController.markDownloaded);
router.post('/uploaded',paperMarkingController.markUploaded);


module.exports = router;