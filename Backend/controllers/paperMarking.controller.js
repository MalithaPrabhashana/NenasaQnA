const models = require('../models/paperMarkingMod');
const modelsUser = require('../models/userMod');
const { model } = require('../db');


function paperUpload(req, res) {
    const { link, paperName, subject } = req.body;
    const userid = req.userData.userId;
    try {
        modelsUser.User.find({ _id: userid })
            .then(async (user) => {
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



async function getTeachers(req, res) {
    try {
        const distinctValues = await models.PaperTeacher.distinct('teacherId', { subject: req.params.subject });
        return res.status(200).json({
            teachers: distinctValues
        });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
}




function getPapers(req, res) {
    const finalPapers = [];
    // let papersTemp=[];
    const { teacherId, subject } = req.body;
    const userId = req.userData.userId;

    models.PaperTeacher.find({ teacherId: teacherId, subject: subject })
        .then(async (papers) => {
            // papersTemp=papers;
            if (papers) {
                // console.log(papers);
                const promises = papers.map(async (paper) => {
                    const pastPaper = await models.PaperMarking.findOne({ paperId: paper._id, userId: userId });
                    if (pastPaper) {
                        const pastPaper1 = pastPaper.toObject();
                        pastPaper1['link'] = paper['link'];
                        pastPaper1['paperName'] = paper['paperName'];
                        pastPaper1['paperName'] = paper['paperName'];
                        pastPaper1['subject'] = paper['subject'];
                        finalPapers.push(pastPaper1);
                        // console.log(pastPaper1);
                    } else {
                        finalPapers.push(paper);
                    }
                });

                await Promise.all(promises);

                return res.status(200).json({
                    papers: finalPapers
                });
            }
            return res.status(200).json({
                papers: finalPapers
            });
        })

}

async function makeOpen(req, res) {
    const { teacherId, paperId } = req.body;
    const userid = req.userData.userId;
    try {
        const paperTeacher = new models.PaperMarking({
            teacherId: teacherId,
            paperId: paperId,
            userId: userid
        });

        const result = await paperTeacher.save();
        return res.status(200).json({
            message: "ok"
        });
    }

    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    }
}





function markUploaded(req, res) {
    const data = req.body;
    models.PaperMarking.findOneAndUpdate(
        { _id: data.paperId }, // Specify the user to update based on the _id
        { $set: { userUpload: data.link } },
        { new: true }
    )
        .then(updatedQuestion => {
            if (!updatedQuestion) {
                return res.status(404).json({ message: "Question not found" });
            }
            return res.status(200).json({
                message: "updated successfully",
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: "Something went wrong while updating",

            });
        });
}



function updateMarks(req, res) {
    const data = req.body;
    models.PaperMarking.findOneAndUpdate(
        { _id: data.paperId }, // Specify the user to update based on the _id
        { $set: { marks: data.marks } },
        { new: true }
    )
        .then(updatedQuestion => {
            if (!updatedQuestion) {
                return res.status(404).json({ message: "Question not found" });
            }
            return res.status(200).json({
                message: "updated successfully",
            });
        })
        .catch(error => {
            return res.status(500).json({
                error:error,
                message: "Something went wrong while updating",

            });
        });
}


function getMarkables(req, res) {
    const finalPapers = [];
    // let papersTemp=[];
    const { teacherId, subject } = req.body;
    const userId = req.userData.userId;

    models.PaperMarking.find({ teacherId: req.userData.userId})
        .then(async (papers) => {
            if (papers) {
                // console.log(papers);
                const promises = papers.map(async (paper) => {
                    const pastPaper = await models.PaperTeacher.findOne({ _id: paper.paperId.toString()});
                    if (pastPaper) {
                        const pastPaper1 = paper.toObject();
                        pastPaper1['paperName'] = pastPaper['paperName'];
                        pastPaper1['subject'] = pastPaper['subject'];
                        finalPapers.push(pastPaper1);
                        // console.log(pastPaper1);
                    } else {
                        finalPapers.push(paper);
                    }
                });

                await Promise.all(promises);

                return res.status(200).json({
                    papers: finalPapers
                });
            }
            return res.status(200).json({
                papers: finalPapers
            });
        })

}





module.exports = {
    paperUpload: paperUpload,


    getTeachers: getTeachers,
    getPapers: getPapers,

    markUploaded: markUploaded,
    makeOpen: makeOpen,

    updateMarks: updateMarks,
    getMarkables: getMarkables

} 