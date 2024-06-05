const multer = require('multer');
const path = require('path')

//save to destination
const destinationDir =  path.join(__dirname, '..','images')

//set up multer
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, destinationDir)
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storage})

module.exports = upload;