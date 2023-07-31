const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoute = require('./routes/user');
const questionRoute = require('./routes/questions');
const replyRoute = require('./routes/reply');
const paperRoute=require('./routes/paper');
const paperMarkingRoute=require('./routes/paperMarkingRoute');
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
app.use("/paper-marking", paperMarkingRoute);




app.post("/authenticate", async (req, res) => {
    const { username,role } = req.body;

    
    // 653cd4af-6d7b-4916-88d3-e4ab315af056 ==counselling
    try {
        const r = await axios.put(
            "https://api.chatengine.io/users/",
            { username: username, secret: username, first_name: username },
            { headers: { "Private-Key": (role==='0')?"e5e1eed1-0ee4-4558-a842-b50a35d6fa0e" :'653cd4af-6d7b-4916-88d3-e4ab315af056' } }
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
            { headers: { "Project-ID": "2a6ad684-5b78-4e11-846b-954ea2943433" ,"User-Name":username1,"User-Secret":username1} }
        );
        return res.status(201).json({ message: "chat created successfully",data: r.data});
        console.log(r.data);
    } catch (e) {
        return res.status(500).json({ meaasge: e });
    }
});


module.exports = app;
