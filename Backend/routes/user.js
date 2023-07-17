const express = require('express');
const userController = require('../controllers/user.controller');
const imageUploader = require('../middleware/image-uploader');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/sign-up', userController.signUp);

router.post('/login', userController.login)
router.post('/admin', userController.adminLogin)



router.post('/get-details', checkAuth.checkAuth,userController.getDetails)


// must remove
router.post('/admin/add', userController.addAdmin)

module.exports = router;