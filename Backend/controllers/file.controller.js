function upload(req, res){
    if(req.file && req.file.filename){
        res.status(201).json({
            mesaage: "upload successfully",
            url: req.file.filename
        });
    }else{
        res.status(500).json({
            mesaage: "type not supported"
        });
    }
}

module.exports = {
    upload: upload
}