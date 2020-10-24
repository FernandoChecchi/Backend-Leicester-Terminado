const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const schedule = require('node-schedule');


//configuraciones
require('./db')
const app = express()
const partidos = require('./routes/partidos')
const auth = require('./routes/authController')
app.use(bodyParser.json())
app.use(cors())
app.use('/api', partidos)
app.use(auth)
app.set('superScret', process.env.secret)

//ejecuta la funcion data a la hora programada
const data = require('./controllers/functions')
var day = schedule.scheduleJob('0 0 0 * *', data())


app.listen(3000);

module.exports = app
