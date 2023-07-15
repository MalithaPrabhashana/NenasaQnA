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

module.exports = {
    checkAdmin: checkAdmin
}