const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoute = require('./routes/user');
const questionRoute = require('./routes/questions');
const replyRoute = require('./routes/reply');
const paperRoute=require('./routes/paper');

const uploads = require('./routes/uploads');
const axios = require("axios");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/get-uploads', express.static('uploads'));
app.use('/uploads', uploads);
app.use("/user", userRoute);
app.use("/questions", questionRoute);
app.use("/reply", replyRoute);
app.use("/papers", paperRoute);





app.post("/authenticate", async (req, res) => {
    const { username } = req.body;
    // Get or create user on Chat Engine!
    try {
        const r = await axios.put(
            "https://api.chatengine.io/users/",
            { username: username, secret: username, first_name: username },
            { headers: { "Private-Key": "6b4e6970-4a3d-4fbf-bb53-856c31d974ca" } }
        );
        return res.status(201).json({ message: "user created successfully" });
    } catch (e) {
        return res.status(500).json({ meaasge: "Error" });
    }
});





app.post("/carete-chat", async (req, res) => {
    const { username1 } = req.body;
    const { username2 } = req.body;
    // Get or create user on Chat Engine!
    try {
        const r = await axios.put(
            "https://api.chatengine.io/chats/",
            {
                "usernames": [username1, username2],
                "is_direct_chat": true,
                "title": username1+"/"+username2,
            },
            { headers: { "Project-ID": "f6aff6c0-ca83-4900-abfb-df2dd6c44a93" ,"User-Name":username1,"User-Secret":username1} }
        );
        return res.status(201).json({ message: "chat created successfully",data: r.data});
        console.log(r.data);
    } catch (e) {
        return res.status(500).json({ meaasge: e });
    }
});


module.exports = app;
