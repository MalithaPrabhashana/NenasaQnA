const express = require('express');
const paperMarkingController = require('../controllers/paperMarking.controller');

const checkAuth = require('../middleware/check-auth');
const checkUsers = require('../middleware/checkUsers');

const router = express.Router();

router.post('/paper-upload',checkAuth.checkAuth,paperMarkingController.paperUpload);

router.get('/teachers/:subject',paperMarkingController.getTeachers);
router.post('/papers',checkAuth.checkAuth,paperMarkingController.getPapers);    //user
router.post('/make-open',checkAuth.checkAuth,paperMarkingController.makeOpen);    //user
router.post('/update-upload',checkAuth.checkAuth,paperMarkingController.markUploaded);     //user


router.post('/update-upload',checkAuth.checkAuth,paperMarkingController.updateMarks);     //teacher
router.get('/get-markables',checkAuth.checkAuth,checkUsers.checkTeacherOrLecturer,paperMarkingController.getMarkables);
router.post('/update-marks',checkAuth.checkAuth,checkUsers.checkTeacherOrLecturer,paperMarkingController.updateMarks);     //teacher

// router.get('/papers/:id',paperMarkingController.getPapers);
// router.post('/downloaded',paperMarkingController.markDownloaded);
// router.post('/uploaded',paperMarkingController.markUploaded);


module.exports = router;