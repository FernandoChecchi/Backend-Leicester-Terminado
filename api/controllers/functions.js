const fetch = require("node-fetch")
const partidosModels = require('../models/Partidos')

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
module.exports = function data() {

    const url = 'https://footballapi-lcfc.pulselive.com/football/fixtures?teams=26&comps=&compSeasons=&homeTeams=&page=0&pageSize=80&sort=desc&statuses=C&altIds=true&provisional=false&detail=1'
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