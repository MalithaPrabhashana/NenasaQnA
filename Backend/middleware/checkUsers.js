const models = require('../models/userMod');

function checkAdmin(req, res, next) {
    models.Admin.findOne({ _id: req.userData.userId })
        .then(admin => {
            if (!admin) {
                return res.status(500).json({ message: "You are not an Admin", });
            }
            next();
        })
        .catch(error => {
            return res.status(500).json({
                message: "Something went wrong",

            });
        });

}





function checkUser(req, res,next ,role) {
    models.User.findOne({ _id: req.userData.userId, role: { $in: role } } )
        .then(user => {
            if (user) {
               next();
            } else {
                return res.status(500).json({ message: "Access Denied", });
            }
        })
        .catch(error => {
            return res.status(500).json({ message: "Something Wrong", });
        });

}

function checkTeacherOrLecturer(req, res, next){
    checkUser(req, res, next,[1, 2]);
}

// function checkTeacherOrLecturer(req,res,next){
//     console.log(checkUser(req, res,1));
//     // if((checkUser(req, res,1)==1) || (checkUser(req, res,2)==1) ){
//     //    next();
//     // }
//     // return res.status(500).json({ message: "Access Denied", });
// }

module.exports = {
    checkAdmin: checkAdmin,
    checkTeacherOrLecturer: checkTeacherOrLecturer

}