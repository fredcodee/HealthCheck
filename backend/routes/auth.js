const router = require('express').Router()
const errorHandler = require('../middlewares/errorHandler')
const userService  = require('../services/userServices')
const decode = require("jwt-decode")
const jwt = require('jsonwebtoken')



router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    //check if user is already registered
    const registered = await userService.checkIfUserIsRegistered(email);
    if (registered) {
      return res.status(401).json({ message: 'This email is already registered' });
    }
    await userService.addUserToDb(name, email, password);
    return res.json({ message: 'user is registered successfully' });
  } catch (error) {
    errorHandler.errorHandler(error, res)
  }
})

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userService.findAndVerifyUserCredentials(email, password);
    if (user) {
      const token = await userService.generateToken(user);
      return res.json({ request: "user details are valid", token: token })
    } else {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (error) {
    errorHandler.errorHandler(error, res)
  }
});

//google auth handler
router.post('/google-auth', async(req,res)=>{
  try {
    const {name, email, sub}= req.body
    const userAuth = await userService.googleAuth(name, email, sub)
    const token =  await userService.generateToken(userAuth)
    return res.json({ request: "user details are valid", token: token })
  } catch (error) {
    errorHandler.errorHandler(error, res)
  }
})

router.get('/check-token', async(req,res)=>{
    const token = req.header('Authorization').replace('Bearer ', '')
    if(!token){
        return res.status(401).json({message: 'No token Found'})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        res.status(200).json({message: 'Token is valid'})
    } catch (error) {
        return res.status(401).json({message: 'Token is invalid'})
    }
})

module.exports = router;