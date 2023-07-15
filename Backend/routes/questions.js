const express = require('express');
const questionController = require('../controllers/question.controller');
const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/checkAdmin');

const router = express.Router();



router.get("/", questionController.getAllQuestions);

// // by user
router.get("/pending",checkAuth.checkAuth, questionController.getUserPendingQuestions);
router.get("/approved", checkAuth.checkAuth,questionController.getApprovedQuestions);

router.post("/", checkAuth.checkAuth,questionController.save);
router.patch("/:id",checkAuth.checkAuth, questionController.update);
router.delete("/:id", checkAuth.checkAuth,questionController.destroy);


// // by admin
router.get("/all-pending", checkAuth.checkAuth,checkAdmin.checkAdmin,questionController.getAllPendingQuestions);
router.post("/approve",checkAuth.checkAuth, checkAdmin.checkAdmin,questionController.approveQuestion);
router.post("/remove",checkAuth.checkAuth, checkAdmin.checkAdmin,questionController.rejectQuestion);


module.exports = router;
