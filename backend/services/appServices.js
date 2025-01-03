const User = require('../models/UserModel')
const Appointments = require('../models/Appointments')
const Schedules = require('../models/SchedulesModel')
const Reviews = require('../models/ReviewsModel')
const Image = require('../models/ImageModel')



// free trail 
async function subToFreeTrail(email) {
    try {
        //check free trail count
        const getUser = await User.findOne({ email: email })
        if (getUser.free_trail_count > 0) {
            getUser.subscription_Mode = true
            getUser.subscription_Type = 'Free'
            getUser.save()
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
async function setSchedule(email, dates, startTime, endTime) {
    try {
        const getUser = await User.findOne({ email: email })
        if (getUser) {
            for (const date of dates) {
                const combinedDateStartTime = await combineDateAndTime(date, startTime)
                const combinedDateEndTime = await combineDateAndTime(date, endTime)
                const checkScheduleExists = await Schedules.findOne({ doctor_id: getUser._id, startTime: combinedDateStartTime, endTime: combinedDateEndTime })
                if (!checkScheduleExists) {
                    const newSchedule = new Schedules({
                        doctor_id: getUser._id,
                        date: new Date(date),
                        startTime: combinedDateStartTime,
                        endTime: combinedDateEndTime
                    })
                    await newSchedule.save()
                }
            }
        }
        return true
    } catch (error) {
        throw Error(`Cant set schedule ${error}`)
    }
}



// const dateObj = new Date('Wed Jun 19 2024 00:18:22 GMT+0800 (Taipei Standard Time)');
// const timeStr = '1:15:00 AM GMT+8';
const combineDateAndTime = async (dateObj, timeStr) => {
    dateObj = new Date(dateObj);
    if (!(dateObj instanceof Date)) {
        throw new Error("Invalid date object");
    }

    // Extract date components from dateObj
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const day = dateObj.getDate();

    // Extract time components from timeStr
    const timeParts = timeStr.match(/(\d+):(\d+):(\d+)\s(AM|PM)\sGMT([+-]\d+)/);
    let hours = parseInt(timeParts[1], 10);
    const minutes = parseInt(timeParts[2], 10);
    const seconds = parseInt(timeParts[3], 10);
    const period = timeParts[4];

    // Convert to 24-hour format
    if (period === 'PM' && hours !== 12) {
        hours += 12;
    } else if (period === 'AM' && hours === 12) {
        hours = 0;
    }

    // Combine the date and time parts into a new Date object
    const combinedDate = new Date(year, month, day, hours, minutes, seconds);
    return combinedDate;
};




//get schedule (doctor) all
async function getSchedule(email) {
    try {
        const getUser = await User.findOne({ email: email })
        if (getUser) {
            const schedules = await Schedules.find({ doctor_id: getUser._id })
            return schedules
        }
    } catch (error) {
        throw Error(`Cant get schedule ${error}`)
    }
}

//get doctor schedule , (open)
async function getFreeSchedules(email) {
    try {
        const getUser = await User.findOne({ email: email, account_type: 'Doctor' })
        if (getUser) {
            const schedules = await Schedules.find({ doctor_id: getUser._id, taken: false })
            return schedules
        }
    } catch (error) {
        throw Error(`Cant get doctor schedule ${error}`)
    }
}

async function sortDataByDate(data) {
    // Convert object keys to an array and sort them
    const sortedKeys = Object.keys(data).sort((a, b) => new Date(a) - new Date(b));

    // Create a new object with sorted keys
    const sortedData = {};
    sortedKeys.forEach(key => {
        sortedData[key] = data[key];
    });

    return sortedData;
}

async function deleteSchedule(email, id) {
    try {
        const getUser = await User.findOne({ email: email })
        if (getUser) {
            await Schedules.findOneAndDelete({ doctor_id: getUser._id, _id: id })
            return true
        }
    }
    catch (error) {
        throw Error(`Cant delete schedule ${error}`)
    }
}

async function getRandomDoctorsInUsersLocation(city, email) {
    try {
        const doctors = await User.find({ city: city, account_type: 'Doctor' }) // add subscription_Mode: true
        //remove user
        doctors.splice(doctors.indexOf(email), 1)
        //choose random 3
        const random = [...doctors].sort(() => 0.5 - Math.random()).slice(0, 3)
        return random
    } catch (error) {
        throw Error(`Cant get random doctor ${error}`)
    }
}


async function searchDoctor(namePrefix, city) {
    try {
        if (namePrefix && city) {
            const doctors = await User.find({ name: { $regex: `^${namePrefix}`, $options: 'i' }, city: city, account_type: 'Doctor' })
            return doctors
        }
        else if (namePrefix && !city) {
            const doctors = await User.find({ name: { $regex: `^${namePrefix}`, $options: 'i' }, account_type: 'Doctor' })
            return doctors
        }
        else if (city && !namePrefix) {
            const doctors = await User.find({ city: city, account_type: 'Doctor' })
            return doctors
        }
    }
    catch (error) {
        throw Error(`Cant search doctor ${error}`)
    }
}


//book appointment
async function bookAppointment(email, doctor_id, schedule_id, reason) {
    try {
        const getSchedule = await Schedules.findOne({ _id: schedule_id, taken: false })
        const getUser = await User.findOne({ email: email })

        if (getSchedule) {
            const newAppointment = new Appointments({
                user_id: getUser._id,
                doctor_id: doctor_id,
                schedule_id: schedule_id,
                reason: reason
            })
            await newAppointment.save()

            if (getUser.free_trail_count > 0) {
                getUser.free_trail_count -= 1
                await getUser.save()
            }
            return true
        }
    }
    catch (error) {
        throw Error(`Cant book appointment ${error}`)
    }
}



// view user reviews
async function viewUserReviews(user_id) {
    try {
        const reviews = await Reviews.find({ user_id: user_id })
        return reviews
    } catch (error) {
        throw Error(`Cant view user reviews ${error}`)
    }
}

// view doctor reviews
async function viewDoctorReviews(doctor_id) {
    try {
        const reviews = await Reviews.find({ doctor_id: doctor_id }).populate('user_id')
        return reviews
    } catch (error) {
        throw Error(`Cant view doctor reviews ${error}`)
    }
}

//get upcoming appointments
async function getUpcomingAppointmentsPatient(userId) {
    try {
        const getAppointments = await Appointments.find({ user_id: userId, status: 'accepted' }).populate('doctor_id schedule_id user_id')
        return getAppointments
    } catch (error) {
        throw Error(`Cant get upcoming appointments ${error}`)
    }
}

//get upcoming appointments doctors
async function getUpcomingAppointmentsDoctor(doctorId) {
    try {
        const getAppointments = await Appointments.find({ doctor_id: doctorId, status: 'accepted' }).populate('doctor_id schedule_id user_id')
        return getAppointments
    } catch (error) {
        throw Error(`Cant get upcoming appointments ${error}`)
    }
}

//get all appointments
async function getAllAppointments(userId) {
    try {
        const getAppointments = await Appointments.find({ doctor_id: userId })
        return getAppointments
    } catch (error) {
        throw Error(`Cant get all appointments ${error}`)
    }
}

//update appointment
async function updateAppointment(user_id, appointment_id, schedule_id, status) {
    try {
        const getAppointment = await Appointments.findOne({ _id: appointment_id })
        const getSchedule = await Schedules.findOne({ _id: schedule_id })
        const getUser = await User.findOne({ _id: user_id })

        if (getUser.free_trail_count > 0) {
            getUser.free_trail_count -= 1
            await getUser.save()
        }

        if (getAppointment && getSchedule) {
            getAppointment.status = status
            await getAppointment.save()
            
            //set schedule taken to true
            if (status === 'accepted' || status === 'completed') {
                //find all other appointments for this schedule and set status to cancelled except this  apointment id
                await Appointments.updateMany({ schedule_id: getSchedule._id, _id: { $ne: getAppointment._id } }, { $set: { status: 'cancelled' } })
                getSchedule.taken = true
                await getSchedule.save()
            }
            else if (status === 'cancelled') {
                getSchedule.taken = false
                await getSchedule.save()
            }

            return true
        }
    } catch (error) {
        throw Error(`Cant update appointment ${error}`)
    }
}

async function getDoctorProfile(doctorId) {
    try {
        const doctor = await User.findOne({ _id: doctorId }).lean()
        if (!doctor) throw new Error('Doctor not found')
        const schedules = await Schedules.find({ doctor_id: doctor._id, taken: false })
        const profileImage = await Image.findOne({ user_id: doctor._id })
        if(profileImage){
            doctor.profile_image = profileImage.url
            doctor.profile_image_name = profileImage.name
        }
        else{
            doctor.profile_image = null
            doctor.profile_image_name = null
        }
       
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
            groupDates = await sortDataByDate(groupDates)
        }

        const data = {
            doctorDetails: doctor,
            freeSchedules: groupDates
        }
        return data
    }
    catch (error) {
        throw Error(`Cant get doctor profile ${error}`)
    }
}


async function getAppointmentsParams(user_id, type, params) {
    try {
        //type = doctor or patient
        //params = accepted, pending, canceled, completed
        if (type === 'Doctor') {
            const getAppointments = await Appointments.find({ doctor_id: user_id, status: params }).populate('doctor_id schedule_id user_id')
            return getAppointments
        }
        else if (type === 'Patient') {
            const getAppointments = await Appointments.find({ user_id: user_id, status: params }).populate('doctor_id schedule_id')
            return getAppointments
        }
    } catch (error) {
        throw Error(`Cant get pending appointments ${error}`)
    }
}


async function getAppointmentById(id, userId) {
    try {
        const appointment = await Appointments.findOne({ _id: id }).populate('doctor_id schedule_id user_id').lean()
        // check if user has review doctor
        const hasReview = await Reviews.findOne({ user_id: userId, doctor_id: appointment.doctor_id })
        if (hasReview) {
            appointment.has_review = true
        }
        else {
            appointment.has_review = false
        }
        return appointment
    }
    catch (error) {
        throw Error(`Cant get appointment ${error}`)
    }
}


async function rateAppointment(user_id, appointment_id, rating) {
    try {
        const getAppointment = await Appointments.findOne({ _id: appointment_id, user_id: user_id , status: 'completed' })
        if (getAppointment) {
            getAppointment.rating = rating
            await getAppointment.save()
            return true
        }
    } catch (error) {
        throw Error(`Cant rate appointment ${error}`)
    }
}

async function reviewDoctor(user_id, doctor_id,comments) {
    try {
        const newReview = new Reviews({
            user_id: user_id,
            doctor_id: doctor_id,
            content: comments
        })
        await newReview.save()
        return true
    } catch (error) {
        throw Error(`Cant review doctor ${error}`)
    }
}
async function getDoctorStats(user_id) {
    try {
        const getDoctor = await User.findOne({ _id: user_id })
        if (getDoctor) {
           //num of app completed
           const getNumOfApp = await Appointments.find({ doctor_id: user_id, status: 'completed' })
           const numOfApp = getNumOfApp.length

           // total ratings  calculation
           let numOfRatings = 0
           let totalRatings = 0
           for (const app of getNumOfApp) {
               totalRatings += app.rating
               if(app.rating) {
                   numOfRatings+=1
               }
           }
           const avgRating = totalRatings / numOfRatings
           const data = {
               numOfAppointments: numOfApp,
               avgRating: avgRating 
           }

           return data
        }
    } catch (error) {
        throw Error(`Cant get doctor stats ${error}`)
    }
}

module.exports = {
    subToFreeTrail, updateSubscription, setSchedule, getSchedule, deleteSchedule, getRandomDoctorsInUsersLocation, sortDataByDate,
    searchDoctor, getFreeSchedules, bookAppointment, reviewDoctor, viewUserReviews, viewDoctorReviews,
    getUpcomingAppointmentsPatient, getUpcomingAppointmentsDoctor, getAllAppointments, updateAppointment, getDoctorProfile, 
    getAppointmentsParams, getAppointmentById, rateAppointment, getDoctorStats
}