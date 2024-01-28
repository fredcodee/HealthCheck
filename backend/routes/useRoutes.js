const router = require('express').Router()
const appcontroller = require('../controllers/userController')

router.post('/register', appcontroller.register)
router.post('/login', appcontroller.login)
router.post('/google-auth', appcontroller.googleAuth)
router.get('/check-token', appcontroller.checkToken)

module.exports= router