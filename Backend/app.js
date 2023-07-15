const express = require('express');
const bodyParser = require('body-parser');


const userRoute = require('./routes/user');
const questionRoute = require('./routes/questions');
const replyRoute = require('./routes/reply');
const uploads=require('./routes/uploads');


const app = express();

app.use(bodyParser.json());

app.use('/get-uploads',express.static('uploads') );
app.use('/uploads', uploads);
app.use("/user", userRoute);
app.use("/questions", questionRoute);
app.use("/reply", replyRoute);


module.exports = app;
