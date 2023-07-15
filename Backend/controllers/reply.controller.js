const Validator = require('fastest-validator');
const models = require('../models/replyMod');






function get(req, res) {
    const replyParentId = req.params.id;
    models.reply.find({ parentId: replyParentId })
        .then(replies => {
            return res.status(200).json({
                replies: replies
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: "Something went wrong while getting data",

            });
        });
}








async function save(req, res) {
    const reply = {
        reply: req.body.reply,
        userId: req.userData.userId,
        parentId: req.body.parentId
    }

    const schema = {
        reply: { type: "string", optional: false, max: "500", min: 5 },
    }

    const v = new Validator();
    const validationResponse = v.validate(reply, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    try {
        const newreply = new models.reply(reply);

        // Save the user to the database
        await newreply.save();
        res.status(201).json({ message: 'reply saved' });


    } catch (err) {
        // console.error(err);
        return res.status(500).json({ error: 'An error occurred while saving reply' });
    }
}









function deleteMtchings(model,replyId,res) {

    model.find({ parentId: replyId })
        .then(replies => {
           
            replies.forEach(reply => {
              
                deleteMtchings(model,reply._id.toString(),res);
                
              });
              
        })
        .catch(error => {  
        });
    // console.log(replyId);
    model.deleteOne({_id:replyId})
        .then(deletedReplies => {

        })
        .catch(error => {
        });
    
}



function destroy(req, res) {
    try{
        deleteMtchings(models.reply,req.params.id,res);
        return res.status(200).json({ message: "Successfully deleted" });
    }catch(err){
        return res.status(500).json({ message: "Cant delete" });
    }
 
}





module.exports = {
    get: get,
    save: save,
    destroy: destroy,
}
