const models = require('../models/userMod');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { model } = require('../db');




async function signUp(req, res) {

    //Sign up

    const { username, email, password, role,address,image,phone ,subjects} = req.body;
    try {
      

        // Check if the username or email already exist in the database
        const existingUserName = await models.User.findOne({ username });
        if (existingUserName) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const existingUserEmail = await models.User.findOne({ email });
        if (existingUserEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }



        bcryptjs.genSalt(10, function (err, salt) {
            bcryptjs.hash(req.body.password, salt, async function (err, hash) {

                // Create a new user
                let Data = {
                    username: username,
                    email, email,
                    password: hash,
                    role: role,
                    address: address,
                    image: image,
                    phone:phone,
                    subjects:subjects}

                const newUser = new models.User(Data);

                // Save the user to the database
                await newUser.save();
                res.status(201).json({ message: 'User registered successfully.' });

            });
        });


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred during registration' });
    }
}











async function login(req, res) {

    const { email, password } = req.body;

    try {
        // Find the user by username
        const user = await models.User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        bcryptjs.compare(password, user.password, function (err, result) {
            if (result) {
                const token = jwt.sign({
                    email: user.email,
                    userId: user.id
                }, process.env.JWT_KEY, function (err, token) {
                    res.status(200).json({
                        message: "Authentication successful!",
                        token: token,
                        // userID:user.id
                    });
                });
            } else {
                return res.status(401).json({
                    message: "Invalid credentials!",
                });
            }
        });
        // Compare the provided password with the stored password
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred during login' });
    }


}


function getDetails(req,res){
    const userid = req.userData.userId;
    models.User.find({ _id: userid })
        .then(user => {
          if(user){
            return res.status(200).json({
                user: user
            });
          }
          return res.status(400).json({
            message: "user not found"
        }); 
            
        })
        .catch(error => {
            return res.status(500).json({
                message: "Something went wrong while getting data",

            });
        });
}

function getUsersByRole(req,res){
   
    models.User.find({ role: req.body.role })
        .then(user => {
          if(user){
            return res.status(200).json({
                user: user
            });
          }
          return res.status(400).json({
            message: "user not found"
        }); 
            
        })
        .catch(error => {
            return res.status(500).json({
                message: "Something went wrong while getting data",

            });
        });
}

function getDetailsByID(req,res){
    models.User.find({ _id: req.body.id })
    .then(user => {
      if(user){
        return res.status(200).json({
            user: user
        });
      }
      return res.status(400).json({
        message: "user not found"
    }); 
        
    })
    .catch(error => {
        return res.status(500).json({
            message: "Something went wrong while getting data",

        });
    });
}


// admin login

async function adminLogin(req, res) {

    const { email, password } = req.body;

    try {
        // Find the user by username

        const user = await models.Admin.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        bcryptjs.compare(password, user.password, function (err, result) {
            if (result) {
                const token = jwt.sign({
                    email: user.email,
                    userId: user.id
                }, process.env.JWT_KEY, function (err, token) {
                    res.status(200).json({
                        message: "Authentication successful!",
                        token: token,
                        // userID:user.id
                    });
                });
            } else {
                return res.status(401).json({
                    message: "Invalid credentials!",
                });
            }
        });
        // Compare the provided password with the stored password
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred during login' });
    }


}























async function addAdmin(req, res) {

    //Sign up
    const { username, email, password } = req.body;
    try {
        // Check if the username or email already exist in the database
        const existingUserName = await models.Admin.findOne({ username });
        if (existingUserName) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const existingUserEmail = await models.Admin.findOne({ email });
        if (existingUserEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        bcryptjs.genSalt(10, function (err, salt) {
            bcryptjs.hash(req.body.password, salt, async function (err, hash) {

                // Create a new user
                const newUser = new models.Admin({
                    username,
                    email,
                    password: hash,
                });

                // Save the user to the database
                await newUser.save();
                res.status(201).json({ message: 'Admin registered successfully.' });

            });
        });


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred during registration' });
    }
}





module.exports = {
    signUp: signUp,
    login: login,
    getDetails:getDetails,
    adminLogin, adminLogin,
    getUsersByRole:getUsersByRole,
    getDetailsByID:getDetailsByID,

    // must remove
    addAdmin: addAdmin,
} 