const models = require('../models/paperMod');
const { model } = require('../db');


function modelPaperDownload(req,res){
    const subject=req.body.subject;
   
        models.modelPaper.find({subject:subject})
            .then(papers => {
                return res.status(200).json({
                    papers: papers
                });
            })
            .catch(error => {
                return res.status(500).json({
                    message: "Something went wrong while getting data",
    
                });
            }); 
    
}

module.exports = {
    modelPaperDownload: modelPaperDownload,
    
} 