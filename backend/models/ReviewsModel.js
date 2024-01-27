const mongoose = require('mongoose')
const reviewsSchema = new mongoose.Schema({
    user_id:{ type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    content:{ type:String},
    rating:{type:Number}, // 0-5
    doctor_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

module.exports= mongoose.model('Reviews', reviewsSchema)