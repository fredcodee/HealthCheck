const router = require('express').Router()
const auth = require('../middlewares/auth')
const appcontroller = require('../controllers/appController')
const fix = require('../services/userServices')

router.get('/health', appcontroller.health)
router.get('/free-trial', auth.userAuth, appcontroller.freeTrail)
router.get('/subscription-check', auth.userAuth, appcontroller.subscriptionCheck)
router.post('/set-schedules', auth.userAuth, appcontroller.setSchedule)
router.get('/get-schedules', auth.userAuth, appcontroller.getSchedule)
router.delete('/delete-schedule/:id', auth.userAuth, appcontroller.deleteSchedule)
router.get('/get-random-doctors', auth.userAuth, appcontroller.getRandomDoctorsInUsersLocation)
router.post('/book-appointment', auth.userAuth, appcontroller.bookAppointment)
router.post('/search-doctor', auth.userAuth, appcontroller.searchDoctor)
router.post('/get-free-schedules', auth.userAuth, appcontroller.getFreeSchedules)

router.get("/admin/fix", auth.userAuth, fix.fix)
module.exports= router