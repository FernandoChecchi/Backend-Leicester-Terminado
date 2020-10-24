const jwt = require('jsonwebtoken')
require("dotenv").config();

//funcion que verifica el token
module.exports = function verifyToken (req, res, next){
    const token = req.headers['access-token']
    if (!token){
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        })
    }
    const decoded = jwt.verify(token, process.env.secret)
    req.userId = decoded.id
    next()
}