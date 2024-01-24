const errorHandler = require("../middlewares/errorHandler")

const health = async (req, res) => {
    return res.json({ 'status': 'ok' })
}


module.exports = {health}