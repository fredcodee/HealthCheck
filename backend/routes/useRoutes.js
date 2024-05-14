const router = require('express').Router()
const auth = require('../middlewares/auth')
const appcontroller = require('../controllers/userController')

router.post('/register', appcontroller.register)
router.post('/login', appcontroller.login)
router.post('/google-auth', appcontroller.googleAuth)
router.get('/check-token', appcontroller.checkToken)
router.get('/profile', auth.userAuth, appcontroller.getUserDetails)
module.exports= router