const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name : "dseyfjjko",
    api_key : "571751651995451",
    api_secret : "rDZj-qqwgi9U7wPrT7EOVOeG_KU" 
})

const imageUploadController = async(req, res) =>{
    try {
        const result = await cloudinary.uploader.upload(req.files.image?.path)
        res.json({
            url: result.secure_url,
            public_id: result.public_id,
        })
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

module.exports = imageUploadController;