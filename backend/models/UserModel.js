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
    }
});

module.exports = mongoose.model('User', userSchema);