const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema({
    url:{type:String, required:true},
    name:{type:String},
    user_id:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
})
module.exports = mongoose.model('Image', imageSchema )