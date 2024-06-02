const errorHandler = require('../middlewares/errorHandler')
const userService = require('../services/userServices')
const decode = require("jwt-decode")
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
    try {
        const { name, email, password, accountType } = req.body

        //check if user is already registered
        const registered = await userService.checkIfUserIsRegistered(email);
        if (registered) {
            return res.status(401).json({ message: 'This email is already registered' });
        }
        await userService.addUserToDb(name, email, password, accountType);
        return res.json({ message: 'user is registered successfully' });
    } catch (error) {
        errorHandler.errorHandler(error, res)
    }
}


const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await userService.findAndVerifyUserCredentials(email, password);
        if (user) {
            const token = await userService.generateToken(user);
            return res.json({ request: "user details are valid", token: token, accountType:user.account_type, freeTrail:user.free_trail_count, subscription_mode: user.subscription_Mode})
        } else {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
    } catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

//google auth handler

const googleAuth = async (req, res) => {
    try {
        const { name, email, sub ,accountType} = req.body
        const userAuth = await userService.googleAuth(name, email, sub, accountType)
        const token = await userService.generateToken(userAuth)
        return res.json({ request: "user details are valid", token: token, accountType:userAuth.account_type, freeTrail:userAuth.free_trail_count, subscription_mode: userAuth.subscription_Mode})
    } catch (error) {
        errorHandler.errorHandler(error, res)
    }
}



const checkToken = async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    if (!token) {
        return res.status(401).json({ message: 'No token Found' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        res.status(200).json({ message: 'Token is valid'})
    } catch (error) {
        return res.status(401).json({ message: 'Token is invalid' })
    }
}

const getUserDetails = async (req, res) => {
    try{
        const user = await userService.getUserById(req.user.id)
        return res.json(user)
    }
    catch(error){
        errorHandler.errorHandler(error, res)
    }
}

const editProfile = async (req, res) => {
    try{
        const {name, bio, city, age, country,gender,phone} = req.body
        const user = await userService.editUserProfile(name, req.user.email, bio, city, age, country,gender,phone)
        return res.json(user)
    }
    catch(error){
        errorHandler.errorHandler(error, res)
    }
}

const editProfilePicForDoctors = async (req, res) => {
    try{
        
    }
    catch(error){
        errorHandler.errorHandler(error, res)
    }
}


module.exports = { register, checkToken, googleAuth, login, getUserDetails, editProfile, editProfilePicForDoctors}