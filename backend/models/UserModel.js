const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    googleId: {
        default: null,
        type:String
    },
    name: String,
    password: String,
    email:{
       type:String,
       unique:true 
    },
    profileImage:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Image'
    },
    account_type:{
        type:String,  //Doctor or Patient
        required:true
    },
    city:{
        type:String
    },
    free_trail_count:{
        default: 3,
        type: Number
    }
});

module.exports = mongoose.model('User', userSchema);