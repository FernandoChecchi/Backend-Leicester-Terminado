const express = require ('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
require("dotenv").config();

const User = require ('../models/User')

//login de usuario y genera token por 6hs
router.post('/login', async (req, res, next) => {
    const {username, password} = req.body
    const user = await User.findOne({username: username})
    if (!user){
        return res.status(404).send("Username doesn't exist")
    }
    const validPassword = await user.validatePassword(password)
    if(!validPassword){
        return res.status(401).json({ auth: false, token:null })
    }
    const token = jwt.sign({id: user._id}, process.env.secret, {
        expiresIn: 60 * 60 * 6
    })
    res.json({auth: true, token})
})

//registra al usuario y genera token por 6hs
router.post('/register', async (req, res, next) => {
    const { username, password } = req.body
    const user = new User ({
        username,
        password
    })
    user.password = await user.encryptPassword(user.password)
    await user.save()
    .catch(err => res.send('Error al registrarse'))
    const token = jwt.sign({id: user._id}, process.env.secret, {
        expiresIn: 60 * 60 * 6
    })
    res.json({auth: true, token})
})

//verifica si esta registrado (como header)
router.get('/me', async (req, res, next) =>{
    const user = await User.findById(req.username, { password: 0 })
    if (!user) {
        return res.status(404).send('No user found')
    }
    res.json(user)
})

module.exports = router