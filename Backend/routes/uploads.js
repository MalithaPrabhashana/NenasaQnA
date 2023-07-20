const express = require('express');
const fileController = require('../controllers/file.controller');
const uploader = require('../middleware/uploader');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/image', uploader.upload.single('image'), fileController.upload);
router.post('/pdf', uploader.pdfUpload.single('pdf'), fileController.upload);
// router.get('/:id', express.static('../uploads'));


module.exports = router;