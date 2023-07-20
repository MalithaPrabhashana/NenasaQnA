const mongoose = require('../db');


// Create a schema
const paperSchemaTeacher = new mongoose.Schema({

    link: { type: String, },
    teacherId: { type: String, },
    paperName: { type: String },
    subject: { type: String },

}
);


// Create a schema
const paperMarkingSchema = new mongoose.Schema({
    paperId: { type: String, },
    userId: { type: String, },
    teacherId: { type: String, },
    userUpload: { type: String ,default:null},
    marks: { type: Number,default:null },
    teacherUpload: { type: String,default:null },
 }
);

// Create a model using the schema
const PaperMarking = mongoose.model('paperMarking', paperMarkingSchema);
const PaperTeacher = mongoose.model('paperTeacher', paperSchemaTeacher);

module.exports = {
    PaperTeacher: PaperTeacher,
    PaperMarking:PaperMarking

}
