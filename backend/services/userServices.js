const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
const Image = require('../models/ImageModel')
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
        const user = await User.findById(id)
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

async function fix(){
    try{
        // for(const doctor of moreDoctors){
        //     const newUser = await addUserToDb(doctor.name, doctor.email, doctor.password, doctor.accountType, doctor.bio, doctor.city, doctor.age, doctor.country, doctor.gender, doctor.phone)
        //     console.log(newUser)
        // }
    }
    catch(error){
        throw new Error(`Cant add more users ${error}`)
    }   
}

async function addUserToDb(name, email, password, accountType, bio, city, age, country, gender, phone){
    try {
        password = bcrypt.hashSync(password, 10)
         const user = new User({
             name : name || null,
             email: email || null,
             password: password || null,
             account_type: accountType || null,
             bio: bio || null,
             city: city || null,
             age: age || null,
             country: country || null,
             gender: gender || null,
             phone: phone || null
         });
         await user.save();
         return user;
    } catch (error) {
        throw new Error(`cant add user to database ${error}`)
    }
}

async function googleAuth(name, email, sub, accountType){
    try {
        const user  = await User.findOne({email:email})
        if(!user){
            const user = new User({
                name : name,
                email: email,
                googleId:sub, 
                account_type:accountType
            })
            await user.save()
            return user
        }   
        return user
    } catch (error) {
       throw new Error(`caant save user from google auth ${error}`) 
    }
}

async function editUserProfile(name, email,bio,city, age,country,gender,phone){
    try {
        const user  = await User.findOne({email:email})
        if (!user) {
            throw new Error(`user not found`)
        }
        user.name = name || user.name
        user.bio = bio || user.bio
        user.city = city || user.city
        user.age = age || user.age
        user.country =   country ||user.country
        user.gender = gender || user.gender
        user.phone = phone || user.phone 
        user.save()
        return user
    }
    catch(err){
        throw new Error(`cant edit user profile ${err}`)
    }
}

async function addUpdateProfileImage(imageName,path,userId){
    try {
        //check if user already has profile image
        const image = await Image.findOne({user_id:userId})
        if(image){
            //update image
            image.name = imageName
            image.url = path
            image.save()
            return true
        }
        const newImage = new Image({
            name:imageName,
            url:path,
            user_id:userId
        })
        await newImage.save()
        return true
    } catch (error) {
        throw new Error(`Error updating store image ${error.message}`)
    }

}

module.exports={generateToken,getUserById, findAndVerifyUserCredentials,checkIfUserIsRegistered, googleAuth, addUserToDb, editUserProfile, addUpdateProfileImage, fix}
