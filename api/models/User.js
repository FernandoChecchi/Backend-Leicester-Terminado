const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
})

//metodo que encripta la contraseña
User.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

//metodo que valida la contraseña
User.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', User)