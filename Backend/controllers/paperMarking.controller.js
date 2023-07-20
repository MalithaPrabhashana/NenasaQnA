const models = require('../models/paperMarkingMod');
const modelsUser = require('../models/userMod');
const { model } = require('../db');


function paperUpload(req, res) {
    const { link, paperName, subject } = req.body;
    const userid = req.userData.userId;
    try {
        modelsUser.User.find({ _id: userid })
            .then( async (user) => {
                if (user) {
                    if (user[0].role == 2) {
                        const paperTeacher = new models.PaperTeacher({
                            link: link,
                            paperName: paperName,
                            subject: subject,
                            teacherId: user[0]._id.toString()
                        });
        
                        const result = await paperTeacher.save();
                        return res.status(200).json({
                            message: "paper uploaded",
                            result: result
                        });
                    }

                }
                return res.status(400).json({
                    message: "user not found"
                });

            })

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred during registration' });
    }
}



function getTeachers(req, res) {


}


function getPapers(req, res) {

}


function markDownloaded(req, res) {

}



function markUploaded(req, res) {

}



module.exports = {
    paperUpload: paperUpload,


    getTeachers: getTeachers,
    getPapers: getPapers,
    markDownloaded: markDownloaded,
    markUploaded, markUploaded

} 