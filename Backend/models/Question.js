const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  questionName: String,
  questionUrl: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  answers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answers",
  },
  user: Object,
});

module.exports = mongoose.model("Questions", QuestionSchema);



// const { ObjectId } = require('mongodb');

// // Define the Question model
// const QuestionModel = {
//   questionName: String,
//   questionUrl: String,
//   createdAt: {
//     type: Date,
//     default: new Date(),
//   },
//   answers: ObjectId,
//   user: Object,
// };

// module.exports = QuestionModel;
