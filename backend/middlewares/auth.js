const jwt = require('jsonwebtoken')
const userService = require('../services/userServices')

  const userAuth = async (req, res, next) => {
    try {
      let token = req.header('Authorization')
      if (!token) {
        return res.status(401).send({ error: 'Token not found.' })
      }
      
      token = token.replace('Bearer ', '')
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await userService.getUserById(decoded.id)
      if (!user) {
        return res.status(401).send({ error: 'Request Not Authorized.' })
      }
      req.user = user
      next()
    } catch (e) {
      next(e)
    }
  }

  //check subscription
  const checkSubscription = async (req, res, next) => {
    try {
      const user = req.user
      if(user.subscription_Mode === 'Free' && user.free_trail_count <= 0) {
        return res.status(401).send({ error: 'Free Subscription not allowed' })
      }
      next()
    } catch (e) {
      next(e)
    }
  }

  
module.exports = {userAuth, checkSubscription}