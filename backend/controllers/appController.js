const errorHandler = require("../middlewares/errorHandler")
const appService = require("../services/appServices")

const health = async (req, res) => {
    return res.json({ 'status': 'ok' })
}

const subscriptionCheck = async (req, res) => {
    try {
        const user = req.user
        return res.json({ subscription_mode: user.subscription_Mode, type: user.subscription_Type })
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

const freeTrail = async (req, res) => {
    try {
        const user = req.user
        const sub = await appService.subToFreeTrail(user.email)
        if (sub) {
            return res.json({ message: 'success' })
        }
        return res.status(401).json({ error: 'Free trail not allowed' })

    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}


const setSchedule = async (req, res) => {
    try {
        const user = req.user
        const { dates, startTime, endTime } = req.body
        const sub = await appService.setSchedule(user.email, dates, startTime, endTime)
        if (sub) {
            return res.json({ message: 'success' })
        }
        return res.status(401).json({ error: 'Free trail not allowed' })
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

const getSchedule = async (req, res) => {
    try {
        const user = req.user
        const schedules = await appService.getSchedule(user.email)
        let groupDates = {}
        if (schedules.length > 0) {
            for (const schedule of schedules) {
                const dateToCheck = schedule.date.toLocaleDateString()
                if (!groupDates[dateToCheck]) {
                    groupDates[dateToCheck] = []
                    groupDates[dateToCheck].push(schedule)
                }
                else {
                    groupDates[dateToCheck].push(schedule)
                }
            }

            groupDates = await appService.sortDataByDate(groupDates)
            return res.json(groupDates)
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
        if (sub) {
            return res.json({ message: 'success' })
        }
        return res.status(401).json({ error: 'error deleting schedule' })
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

const getRandomDoctorsInUsersLocation = async (req, res) => {
    try {
        const user = req.user
        const doctors = await appService.getRandomDoctorsInUsersLocation(user.city, user.email)
        return res.json(doctors)
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

const searchDoctor = async (req, res) => {
    try {
        const { name, city } = req.body
        const doctors = await appService.searchDoctor(name, city)
        return res.json(doctors)
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}


const getFreeSchedules = async (req, res) => {
    try {
        const userEmail = req.body.email
        const schedules = await appService.getFreeSchedules(userEmail)
        let groupDates = {}
        if (schedules.length > 0) {
            for (const schedule of schedules) {
                const dateToCheck = schedule.date.toLocaleDateString()
                if (!groupDates[dateToCheck]) {
                    groupDates[dateToCheck] = []
                    groupDates[dateToCheck].push(schedule)
                }
                else {
                    groupDates[dateToCheck].push(schedule)
                }
            }

            groupDates = await appService.sortDataByDate(groupDates)
            return res.json(groupDates)
        }
        return res.json(schedules)
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

const bookAppointment = async (req, res) => {
    try {
        const { doctorId, scheduleId, reason } = req.body
        const user = req.user
        const sub = await appService.bookAppointment(user.email, doctorId, scheduleId, reason)
        if (sub) {
            return res.json({ message: 'success' })
        }
        return res.status(401).json({ error: 'error booking appointment' })
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}



const review = async (req, res) => {
    try {
        const { doctorId, rating, comments } = req.body
        const user = req.user
        const sub = await appService.reviewDoctor(user._id, doctorId, rating, comments)
        if (sub) {
            return res.json({ message: 'success' })
        }
        return res.status(401).json({ error: 'error booking appointment' })
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}


const viewUserReviews = async (req, res) => {
    try {
        const user = req.user
        const reviews = await appService.viewUserReviews(user._id)
        return res.json(reviews)
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}


const viewDoctorReviews = async (req, res) => {
    try {
        const doctorId = req.body.doctorId
        const reviews = await appService.viewDoctorReviews(doctorId)
        return res.json(reviews)
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

const getUpcomingAppointmentsPatient = async (req, res) => {
    try {
        const user = req.user
        const appointments = await appService.getUpcomingAppointmentsPatient(user._id)
        return res.json(appointments)
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}


const appointmentsParams = async (req, res) => {
    try {
        const user = req.user
        const { type, params } = req.params
        const appointments = await appService.getAppointmentsParams(user._id, type, params)
        return res.json(appointments)
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}


const getUpcomingAppointmentsDoctor = async (req, res) => {
    try {
        const user = req.user
        const appointments = await appService.getUpcomingAppointmentsDoctor(user._id)
        return res.json(appointments)
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}


const getAllAppointments = async (req, res) => {
    try {
        const user = req.user
        const appointments = await appService.getAllAppointments(user._id)
        return res.json(appointments)
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}
const getAppointmentById = async (req, res) => {
    try {
        const user = req.user
        const { id } = req.params
        const appointment = await appService.getAppointmentById(id, user._id)
        return res.json(appointment)
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}


const updateAppointment = async (req, res) => {
    try {
        const user = req.user
        const { appointmentId, scheduleId, status } = req.body
        const sub = await appService.updateAppointment(user._id, appointmentId, scheduleId, status)
        if (sub) {
            return res.json({ message: 'success' })
        }
        return res.status(401).json({ error: 'error booking appointment' })
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}



const getDoctorProfile = async (req, res) => {
    try {
        const { doctorId } = req.body
        const doctor = await appService.getDoctorProfile(doctorId)
        return res.json(doctor)
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}



const rateAppointment = async (req, res) => {
    try {
        const user = req.user
        const { appointmentId, rating } = req.body
        const sub = await appService.rateAppointment(user._id, appointmentId, rating)
        if (sub) {
            return res.json({ message: 'success' })
        }
        return res.status(401).json({ error: 'error rating appointment' })
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

const reviewDoctor = async (req, res) => {
    try {
        const user = req.user
        const { doctorId, comments } = req.body
        const sub = await appService.reviewDoctor(user._id, doctorId, comments)
        if (sub) {
            return res.json({ message: 'success' })
        }
        return res.status(401).json({ error: 'error reviewing doctor' })
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}


const getDoctorReviews = async (req, res) => {
    try {
        const { doctorId } = req.body
        const reviews = await appService.viewDoctorReviews(doctorId)
        return res.json(reviews)
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

const getDoctorStats = async (req, res) => {
    try {
        const { id } = req.params
        const stats = await appService.getDoctorStats(id)
        return res.json(stats)
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

const parsedatatodb = async (req, res) => {
    try {
        const User = require('../models/UserModel')
        const bcrypt = require('bcrypt')
        const fs = require('fs');
        const path = require("path");

        //get json file
        const jsonFilePath = path.join("scripts", 'generated_users.json');
        const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
        

        // parse data to db
        for (const data of jsonData) {
            const checkUser = await User.findOne({ email: data.email })
            if (!checkUser) {
                const user = new User({
                    name: data.name,
                    email: data.email,
                    password: bcrypt.hashSync(data.password, 10),
                    account_type: data.account_type,
                    city: data.city,
                    country: data.country,
                    age: data.age,
                    free_trail_count: data.free_trail_count,
                    subscription_Type: data.subscription_Type,
                    subscription_Mode: data.subscription_Mode,
                    phone: data.phone,
                    gender: data.gender,
                    bio: data.bio
                })
                await user.save()
            }
        }

        return res.json({ message: 'success' })
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}


module.exports = {
    health, freeTrail, subscriptionCheck, setSchedule, getSchedule, deleteSchedule, getRandomDoctorsInUsersLocation, bookAppointment,
    searchDoctor, getFreeSchedules, review, viewUserReviews, viewDoctorReviews, getUpcomingAppointmentsPatient, getUpcomingAppointmentsDoctor,
    getAllAppointments, updateAppointment, getDoctorProfile, appointmentsParams, getAppointmentById, rateAppointment, reviewDoctor, getDoctorReviews,
    getDoctorStats, parsedatatodb
}