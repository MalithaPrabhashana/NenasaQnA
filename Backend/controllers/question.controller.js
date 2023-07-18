const Validator = require('fastest-validator');
const models = require('../models/questionMod');




function getAllQuestions(req, res) {
    models.approvedQuestion.find()
        .then(questions => {

            return res.status(200).json({
                questions: questions
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: "Something went wrong while getting data",

            });
        });
}






// usee question field
function getUserPendingQuestions(req, res) {
    const userid = req.userData.userId;
    models.pendingQuestion.find({ userId: userid })
        .then(questions => {

            return res.status(200).json({
                questions: questions
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: "Something went wrong while getting data",

            });
        });
}






function getApprovedQuestions(req, res) {
    const userid = req.userData.userId;
    models.approvedQuestion.find({ userId: userid })
        .then(questions => {

            return res.status(200).json({
                questions: questions
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: "Something went wrong while getting data",

            });
        });
}






async function save(req, res) {
    const question = {
        question: req.body.question,
        userId: req.userData.userId
    }

    const schema = {
        question: { type: "string", optional: false, max: "500", min: 5 },
    }

    const v = new Validator();
    const validationResponse = v.validate(question, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    try {
        const newPendingQuestion = new models.pendingQuestion(question);

        // Save the user to the database
        await newPendingQuestion.save();
        res.status(201).json({ message: 'Question is pending to approve.' });


    } catch (err) {
        // console.error(err);
        return res.status(500).json({ error: 'An error occurred while entering queston' });
    }
}










function update(req, res) {
    const question = {
        question: req.body.question,
        userId: req.userData.userId
    }

    const schema = {
        question: { type: "string", optional: false, max: "500", min: 5 },
    }

    const v = new Validator();
    const validationResponse = v.validate(question, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.pendingQuestion.findOneAndUpdate(
        { _id: req.params.id, userId: req.userData.userId }, // Specify the user to update based on the _id
        { $set: question },
        { new: true }
    )
        .then(updatedQuestion => {
            if (!updatedQuestion) {
                return res.status(404).json({ message: "Question not found" });
            }
            return res.status(200).json({
                message: "Post updated successfully",
                // post: updatedQuestion
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: "Something went wrong while updating",

            });
        });

}






function destroy(req, res) {

    models.pendingQuestion.deleteOne(
        { _id: req.params.id, userId: req.userData.userId })
        .then(deletedQuestion => {

            if (deletedQuestion.deletedCount == 0) {
                return res.status(404).json({ message: "Question not found" });
            }
            return res.status(200).json({
                message: "question deleted successfully",
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: "Something went wrong while updating",

            });
        });

}





function voting(data, res, req) {
    console.log(data);
    models.approvedQuestion.findOneAndUpdate(
        { _id: req.body.id }, // Specify the user to update based on the _id
        { $set: data },
        { new: true }
    )
        .then(updatedQuestion => {
            if (!updatedQuestion) {
                return res.status(404).json({ message: "Question not found" });
            }
            return res.status(200).json({
                message: "Vote added Successfully",
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: "Something went wrong while updating",

            });
        });
}




function upVote(req, res) {
    models.approvedQuestion.find({ _id: req.body.id })
        .then(question => {

            if (question) {
                voting({ upVots: question[0].upVots + 1 }, res, req);
            }
        })
        .catch(error => {
            return res.status(500).json({
                message: "Something went wrong while getting data",

            });
        });

}


function downVote(req, res) {
    models.approvedQuestion.find({ _id: req.body.id })
        .then(question => {

            if (question) {
                voting({ downVots: (question[0].downVots>0)? question[0].downVots + 1 : 0 }, res, req);
            }
        })
        .catch(error => {
            return res.status(500).json({
                message: "Something went wrong while getting data",

            });
        });
}




function filterQuestions(req, res) {
    const searchTerm=req.body.search;
    models.approvedQuestion.find({ question: { $regex: searchTerm, $options: 'i' } })
        .then(questions => {
            return res.status(201).json({
                questions:questions

            });
        })
        .catch(error => {
            return res.status(500).json({
                message: "Something went wrong while getting data",

            });
        })
}





// by admin
function getAllPendingQuestions(req, res) {
    models.pendingQuestion.find()
        .then(questions => {

            return res.status(200).json({
                questions: questions
            });

        })
        .catch(error => {
            return res.status(500).json({
                message: "Something went wrong while getting data",

            });
        });
}





function approveQuestion(req, res) {

    const questionId = req.body.id;

    models.pendingQuestion.findOne({ _id: questionId })
        .then(questions => {
            if (!questions) {
                return res.status(404).json({ message: "Question not found", });
            }



            // console.log(questions);
            models.pendingQuestion.deleteOne({ _id: questionId })
                .then(deletedQuestion => {

                    const questionNew = {
                        question: questions.question,
                        userId: questions.userId
                    }
                    const newQuestion = new models.approvedQuestion(questionNew)
                    newQuestion.save()
                        .then(savedQuestion => {
                            return res.status(200).json({
                                message: "Question approved"
                            });


                        })
                        .catch(error => {
                            return res.status(500).json({
                                message: "Error approving question",

                            });
                        });

                })
                .catch(error => {
                    return res.status(500).json({
                        message: "Something went wrong while removing",

                    });
                });


        })
        .catch(error => {
            return res.status(404).json({
                message: "question not found",

            });
        });
}





function rejectQuestion(req, res) {
    const questionId = req.body.id;
    models.pendingQuestion.deleteOne(
        { _id: questionId })
        .then(deletedQuestion => {

            if (deletedQuestion.deletedCount == 0) {
                return res.status(404).json({ message: "Question not found" });
            }
            return res.status(200).json({
                message: "question removed successfully",
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: "Something went wrong while updating",

            });
        });
}




module.exports = {
    getAllQuestions: getAllQuestions,

    getUserPendingQuestions: getUserPendingQuestions,
    getApprovedQuestions: getApprovedQuestions,
    save: save,
    update: update,
    destroy: destroy,
    upVote: upVote,
    downVote: downVote,
    filterQuestions: filterQuestions,

    getAllPendingQuestions: getAllPendingQuestions,
    approveQuestion: approveQuestion,
    rejectQuestion: rejectQuestion
}
