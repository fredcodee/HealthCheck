const mongoose = require("mongoose")
const imageSchema = new mongoose.Schema({
    url:{type:String, required:true},
    name:{type:String}
})
module.exports = mongoose.model('Image', imageSchema )