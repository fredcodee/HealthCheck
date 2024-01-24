const router = require('express').Router()
const appcontroller = require('../controllers/appController')

router.get('/health', appcontroller.health)

module.exports= router