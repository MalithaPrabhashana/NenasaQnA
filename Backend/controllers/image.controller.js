function upload(req, res){
    if(req.file && req.file.filename){
        res.status(201).json({
            mesaage: "Image upload successfully",
            url: req.file.filename
        });
    }else{
        res.status(500).json({
            mesaage: "Image type not supported"
        });
    }
}

module.exports = {
    upload: upload
}