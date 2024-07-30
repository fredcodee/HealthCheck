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
        const schedules = await appService.getSchedule(user.email)
        let groupDates = {}
        if (schedules.length > 0) {
            for (const schedule of schedules) {
                const dateToCheck= schedule.date.toLocaleDateString()
                if (!groupDates[dateToCheck]) {
                    groupDates[dateToCheck] = []
                    groupDates[dateToCheck].push(schedule)      
                }
                else{
                    groupDates[dateToCheck].push(schedule)}
            }

            groupDates =  await appService.sortDataByDate(groupDates)
            return res.json( groupDates )
        }
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}


const deleteSchedule = async (req, res) => {
    try {
        const user = req.user
        const { id } = req.params
        const sub = await appService.deleteSchedule(user.email, id)
        if(sub){
            return res.json({ message: 'success' })
        }
        return res.status(401).json({ error: 'error deleting schedule' })
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

const getRandomDoctorsInUsersLocation = async (req, res) => {
    try{
        const user = req.user
        const doctors = await appService.getRandomDoctorsInUsersLocation(user.city, user.email)
        return res.json(doctors)
    }
    catch(error){
        errorHandler.errorHandler(error, res)
    }
}

const  searchDoctor = async (req, res) => {
    try{
        const {name, city} = req.body
        const doctors = await appService.searchDoctor(name, city)
        return res.json(doctors)
    }
    catch(error){
        errorHandler.errorHandler(error, res)
    }
}

//get doctors free schedules
const getFreeSchedules = async (req, res) => {
    try{
        const userEmail = req.body.email
        const schedules = await appService.getFreeSchedules(userEmail)
        let groupDates = {}
        if (schedules.length > 0) {
            for (const schedule of schedules) {
                const dateToCheck= schedule.date.toLocaleDateString()
                if (!groupDates[dateToCheck]) {
                    groupDates[dateToCheck] = []
                    groupDates[dateToCheck].push(schedule)      
                }
                else{
                    groupDates[dateToCheck].push(schedule)}
            }

            groupDates =  await appService.sortDataByDate(groupDates)
            return res.json( groupDates )
        }
        return res.json(schedules)
    }
    catch(error){
        errorHandler.errorHandler(error, res)
    }
}

const bookAppointment = async (req, res) => {
    try{
        // params (doctor id, free schudule id, reason)
        const {doctorId, scheduleId, reason} = req.body
        const user = req.user
        const sub = await appService.bookAppointment(user.email, doctorId, scheduleId, reason)
        if(sub){
            return res.json({ message: 'success' })
        }
        return res.status(401).json({ error: 'error booking appointment' })
    }
    catch(error){
        errorHandler.errorHandler(error, res)
    }
}


//review
const review = async (req, res) => {
    try{
        const {doctorId, rating,comments} = req.body
        const user = req.user
        const sub = await appService.reviewDoctor(user._id, doctorId, rating, comments)
        if(sub){
            return res.json({ message: 'success' })
        }
        return res.status(401).json({ error: 'error booking appointment' })
    }
    catch(error){
        errorHandler.errorHandler(error, res)
    }
}

//view user reviews
const viewUserReviews = async (req, res) => {
    try{
        const user = req.user
        const reviews = await appService.viewUserReviews(user._id)
        return res.json(reviews)
    }
    catch(error){
        errorHandler.errorHandler(error, res)
    }
}

//view doctor reviews
const viewDoctorReviews = async (req, res) => {
    try{
        const doctorId = req.body.doctorId
        const reviews = await appService.viewDoctorReviews(doctorId)
        return res.json(reviews)
    }
    catch(error){
        errorHandler.errorHandler(error, res)
    }
}


module.exports = { health, freeTrail, subscriptionCheck , setSchedule, getSchedule, deleteSchedule, getRandomDoctorsInUsersLocation, bookAppointment,
    searchDoctor, getFreeSchedules, review, viewUserReviews, viewDoctorReviews
 }