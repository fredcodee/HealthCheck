const errorHandler = require("../middlewares/errorHandler")
const appService = require("../services/appServices")

const health = async (req, res) => {
    return res.json({ 'status': 'ok' })
}

const subscriptionCheck = async(req, res) => {
    try{
        const user = req.user
        return res.json({subscription_mode: user.subscription_Mode, type: user.subscription_Type})
    }
    catch(error){
        errorHandler.errorHandler(error, res)
    }
}

const freeTrail = async (req, res) => {
    try {
        const user = req.user
        const sub = await appService.subToFreeTrail(user.email)
        if(sub){
            return res.json({ message: 'success' })
        }
        return res.status(401).json({ error: 'Free trail not allowed' })

    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

//set schedule (doctor)
const setSchedule = async (req, res) => {
    try {
        const user = req.user
        const { dates, startTime, endTime } = req.body
        const sub = await appService.setSchedule(user.email, dates, startTime, endTime)
        if(sub){
            return res.json({ message: 'success' })
        }
        return res.status(401).json({ error: 'Free trail not allowed' })
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

//get schedule (doctor)
const getSchedule = async (req, res) => {
    try {
        const user = req.user
        const schedule = await appService.getSchedule(user.email)
        return res.json( schedule )
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

module.exports = { health, freeTrail, subscriptionCheck , setSchedule, getSchedule}