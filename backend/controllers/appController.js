const errorHandler = require("../middlewares/errorHandler")
const appService = require("../services/appServices")

const health = async (req, res) => {
    return res.json({ 'status': 'ok' })
}

const freeTrail = async (req, res) => {
    try {
        const user = req.user
        const sub = await appService.subToFreeTrail(user.email)
        console.log(sub)
        if(sub){
            return res.json({ message: 'success' })
        }
        return res.status(401).json({ error: 'Free trail not allowed' })

    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}


module.exports = { health, freeTrail}