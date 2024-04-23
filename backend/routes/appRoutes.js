const router = require('express').Router()
const auth = require('../middlewares/auth')
const appcontroller = require('../controllers/appController')

router.get('/health', appcontroller.health)
router.get('/free-trail', auth.userAuth, appcontroller.freeTrail)

module.exports= router