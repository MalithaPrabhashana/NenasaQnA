const express = require('express');
const imageController = require('../controllers/image.controller');
const imageUploader = require('../middleware/image-uploader');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/image', imageUploader.upload.single('image'), imageController.upload);
// router.get('/:id', express.static('../uploads'));


module.exports = router;