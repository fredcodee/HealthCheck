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




//get schedule (doctor)
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
    try{
        const getUser = await User.findOne({ email: email })
        if (getUser) {
            await Schedules.findOneAndDelete({ doctor_id: getUser._id, _id:id })
            return true
        }
    }
    catch(error){
        throw Error(`Cant delete schedule ${error}`)
    }
}

async function getRandomDoctorsInUsersLocation(city) {
    try {
        const doctors = await User.find({ city: city, subscription_Mode: true,  account_type: 'Doctor' })
        //choose random 3
        const random = [...doctors].sort(() => 0.5 - Math.random()).slice(0, 3)
        return random
    } catch (error) {
        throw Error(`Cant get random doctor ${error}`)
    }
}





module.exports = {subToFreeTrail, updateSubscription, setSchedule, getSchedule, deleteSchedule, getRandomDoctorsInUsersLocation,  sortDataByDate}