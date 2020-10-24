const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const fetch = require("node-fetch")
const schedule = require('node-schedule');

//importa rutas y el modelo
const partidos = require('./routes/partidos')
const partidosModels = require('./models/Partidos')

const app = express()
app.use(bodyParser.json())
app.use(cors())

//conexion a MongoDB con mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.catch((err)=>{console.log(`Error al conectar la Base de Datos => ${err}`); process.exit(1)});

app.use('/api', partidos)

//ejecuta la funcion data a la hora programada
var day = schedule.scheduleJob('0 0 0 * *', data())

//funcion que borra toda la BD
const deleteData = async () => {
 try {
  const d = await partidosModels.deleteMany({})
  console.log('Data Destroyed...',d)
 } catch (err) {
  console.error(err)
 }
}

//funcion que renueva la data
function data() {

  const url = 'https://footballapi-lcfc.pulselive.com/football/fixtures?teams=26&comps=&compSeasons=&homeTeams=&page=0&pageSize=60&sort=desc&statuses=C&altIds=true&provisional=false&detail=1'
  let match = {}
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if(data.content !== undefined){
          deleteData()
          match = data.content.map((p)=>{
              return {
                  idMatch: p.id,
                  teamLocal: p.teams[0].team.name,
                  teamVisitor: p.teams[1].team.name,
                  scoreLocal: p.teams[0].score,
                  scoreVisitor: p.teams[1].score,
                  competition: p.gameweek.compSeason.competition.description,
                  gameWeek: p.gameweek.gameweek,
                  date: p.kickoff.label.slice(4).split(",",1)
              }
          })
      }
      partidosModels.fecha instanceof Date
      partidosModels.insertMany(match)
      console.log(match)
    })
    .catch((err)=>{console.log(`Hubo un problema con la petición Fetch => ${err}`); process.exit(1)});

}


//app.listen(3000);

module.exports = app
