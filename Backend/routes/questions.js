const express = require('express');
const questionController = require('../controllers/question.controller');
const checkAuth = require('../middleware/check-auth');
const checkUser = require('../middleware/checkUsers');

const router = express.Router();



router.get("/", questionController.getAllQuestions);

// // by user
router.get("/pending",checkAuth.checkAuth, questionController.getUserPendingQuestions);
router.get("/approved", checkAuth.checkAuth,questionController.getApprovedQuestions);

router.post("/", checkAuth.checkAuth,questionController.save);
router.patch("/:id",checkAuth.checkAuth, questionController.update);
router.delete("/:id", checkAuth.checkAuth,questionController.destroy);

router.post("/upvote", checkAuth.checkAuth,questionController.upVote);
router.post("/downvote", checkAuth.checkAuth,questionController.downVote);

router.post("/filter", checkAuth.checkAuth,questionController.filterQuestions);



// // by admin
router.get("/all-pending", checkAuth.checkAuth,checkUser.checkTeacherOrLecturer,questionController.getAllPendingQuestions);
router.post("/approve",checkAuth.checkAuth, checkUser.checkTeacherOrLecturer,questionController.approveQuestion);
router.post("/remove",checkAuth.checkAuth, checkUser.checkTeacherOrLecturer,questionController.rejectQuestion);


module.exports = router;
