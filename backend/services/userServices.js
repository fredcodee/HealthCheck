const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
const bcrypt = require('bcrypt')


async function generateToken(user) {
    try {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5d' });
        return token;
    }
    catch (error) {
        throw new Error(`Cant generate token ${error}`);
    }

}

async function getUserById(id) {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw new Error(`Cant get user details ${error}`);
    }
}


async function findAndVerifyUserCredentials(email, password) {
    try {
        const user = await User.findOne({ email: email });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return false;
        }

        return user;
    } catch (error) {
        throw new Error(`Cant find and verify user ${error}`);
    }
}


async function checkIfUserIsRegistered(email){
    try{
        const user  =await User.findOne({ email: email });
        if (user){
            return true
        }
        return false
    }
    catch(err){
        throw new Error(`Cant check if user is already registered ${err}`)
    }
}

async function addUserToDb(name, email, password){
    try {
        password = bcrypt.hashSync(password, 10)
         const user = new User({
             name : name || null,
             email: email || null,
             password: password || null
         });
         await user.save();
         return user;
    } catch (error) {
        throw new Error(`cant add user to database ${error}`)
    }
}

async function googleAuth(name, email, sub){
    try {
        const user  = await User.findOne({email:email})
        if(!user){
            const user = new User({
                name : name,
                email: email,
                googleId:sub
            })
            await user.save()
            return user
        }   
        return user
    } catch (error) {
       throw new Error(`caant save user from google auth ${error}`) 
    }
}

module.exports={generateToken,getUserById, findAndVerifyUserCredentials,checkIfUserIsRegistered, googleAuth, addUserToDb}
