const mongoose =  require('mongoose')
const schedulesSchema = new mongoose.Schema({
    doctor_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    date:{
        type: Date},
    startTime:{
        type: Date
    },
    endTime:{
        type: Date
    },
    taken:{
        type:Boolean,
        default:false
    }

})

module.exports = mongoose.model('Schedules', schedulesSchema)