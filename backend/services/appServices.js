const User = require('../models/UserModel')
const Appointments = require('../models/Appointments')
const Schedules = require('../models/SchedulesModel')



// free trail 
async function subToFreeTrail(email) {
    try {
        //check free trail count
        const getUser = await User.findOne({ email: email })
        if (getUser.free_trail_count > 0) {
            getUser.subscription_Mode = true
            getUser.subscription_Type = 'Free'
            getUser.save()
            console.log('true')
            return true
        }
        return false

    } catch (error) {
        throw Error(`Cant sub to free trail ${error}`)
    }
}

//update subscription
async function updateSubscription(email, type, subscriptionMode) {
    try {
        const getUser = await User.findOne({ email: email })    
        getUser.subscription_Mode = subscriptionMode
        getUser.subscription_Type = type
        getUser.free_trail_count = 0
        getUser.save()
    } catch (error) {
        throw Error(`Cant update subscription ${error}`)
    }
}

//set schedule (doctor)
async function setSchedule(email, schedule) {
    try {
        const getUser = await User.findOne({ email: email })    
        if (getUser) {
            //
        }
    } catch (error) {
        throw Error(`Cant set schedule ${error}`)
    }
}


//get schedule (doctor)
async function getSchedule(email) {
    try {
        const getUser = await User.findOne({ email: email })    
        //
    } catch (error) {
        throw Error(`Cant get schedule ${error}`)
    }
}





module.exports = {subToFreeTrail, updateSubscription, setSchedule, getSchedule}