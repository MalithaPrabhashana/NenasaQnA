const mongoose = require('../db');


// Create a schema
const modelPaperSchema = new mongoose.Schema({

    link: { type: String, },
    name: { type: String },
    subject: { type: String }
}
);

// Create a model using the schema
const modelPaper = mongoose.model('modelpspers', modelPaperSchema);


module.exports = {
    modelPaper: modelPaper,

}
