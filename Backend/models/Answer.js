// const mongoose = require("mongoose");

// const AnswerSchema = new mongoose.Schema({
//   answer: String,
//   questionId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "questions",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now(),
//   },
//   user: Object,
// });

// module.exports = mongoose.model("Answers", AnswerSchema);


const { ObjectId } = require('mongodb');

// Define the Answer model
const AnswerModel = {
  answer: String,
  questionId: ObjectId,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  user: Object,
};

module.exports = AnswerModel;
