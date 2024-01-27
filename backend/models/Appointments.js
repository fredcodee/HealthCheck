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
    status:{type:String}, //confirmed, canceled, waiting
    scheduled:{type: mongoose.Schema.Types.ObjectId,
        ref:'Schedules',
        required:true},
    reason:{
        type:String
    }
    
})

module.exports = mongoose.model('Appointments', appointmentsSchema)