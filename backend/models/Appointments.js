const mongoose =  require('mongoose')
const appointmentsSchema = new mongoose.Schema({
    user_id:{type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true},
    doctor_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{type:String, default:'pending'}, //accepted, cancelled, pending, completed
    schedule_id:{type: mongoose.Schema.Types.ObjectId,
        ref:'Schedules',
        required:true},
    reason:{
        type:String
    },
    notes:{
        type:String
    },
    rating:{
        type:Number,  // 0-5
        default:null
    }
    
})

module.exports = mongoose.model('Appointments', appointmentsSchema)