const mongoose = require('../db');


// Create a schema
const replySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  reply: {
    type: String,
    required: true
  },
  parentId: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create a model using the schema
const reply = mongoose.model('reply', replySchema);


module.exports = {
    reply: reply,
}


