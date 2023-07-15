const express = require('express');
const replyController = require('../controllers/reply.controller');
const checkAuth = require('../middleware/check-auth');


const router = express.Router();


router.get("/:id", checkAuth.checkAuth,replyController.get);
router.post("/",checkAuth.checkAuth,replyController.save);
router.delete("/:id", checkAuth.checkAuth,replyController.destroy);


module.exports = router;
