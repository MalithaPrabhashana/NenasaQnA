const mongoose = require('../db');


// Create a schema
const pendingQuestionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  question: {
    type: String,
  },
}, {
  timestamps: true
});

// Create a model using the schema
const pendingQuestion = mongoose.model('PendingQuestion', pendingQuestionSchema);
const approvedQuestion = mongoose.model('approvedQuestion', pendingQuestionSchema);

module.exports = {
    pendingQuestion: pendingQuestion,
    approvedQuestion: approvedQuestion,
}


