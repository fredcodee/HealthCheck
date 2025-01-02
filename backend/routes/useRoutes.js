const router = require('express').Router()
const auth = require('../middlewares/auth')
const appcontroller = require('../controllers/userController')
const parser = require('../middlewares/multer')

router.post('/register', appcontroller.register)
router.post('/login', appcontroller.login)
router.post('/google-auth-login', appcontroller.googleAuthLogin)
router.post('/google-auth-register', appcontroller.googleAuthRegister)
router.get('/check-token', appcontroller.checkToken)
router.get('/profile', auth.userAuth, appcontroller.getUserDetails)
router.post('/edit-profile', auth.userAuth, appcontroller.editProfile)
router.post('/profile/image/upload', auth.userAuth,parser.single('image'), appcontroller.editProfilePicForDoctors)
router.get('/my-reviews', auth.userAuth, appcontroller.getMyReviews)
module.exports= router