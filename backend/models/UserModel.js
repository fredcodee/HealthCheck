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
    bio:{
        type:String
    },
    profileImage:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Image',
        default: null
    },
    phone:{
        type:String},
    gender:{
        type:String

    },
    account_type:{
        type:String,  //Doctor or Patient
        required:true
    },
    city:{
        type:String
    },
    country:{
        type:String
    },
    age:{
        type:Number
    }, 
    free_trail_count:{
        default: 3,
        type: Number
    },
    subscription_Type:{
        type:String,
        default: "Free", //Free, Monthly, Yearly
    },
    subscription_Mode:{
        type:Boolean,
        default: false,
    },

});

module.exports = mongoose.model('User', userSchema);