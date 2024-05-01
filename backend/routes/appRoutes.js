const router = require('express').Router()
const auth = require('../middlewares/auth')
const appcontroller = require('../controllers/appController')

router.get('/health', appcontroller.health)
router.get('/free-trial', auth.userAuth, appcontroller.freeTrail)
router.get('/subscription-check', auth.userAuth, appcontroller.subscriptionCheck)

module.exports= router