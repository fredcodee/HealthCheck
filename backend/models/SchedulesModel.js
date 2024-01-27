const mongoose =  require('mongoose')
const schedulesSchema = new mongoose.Schema({
    doctor_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    availableTime:{
        type: Date
    },
    taken:{
        type:Boolean
    }

})

module.exports = mongoose.model('Schedules', schedulesSchema)