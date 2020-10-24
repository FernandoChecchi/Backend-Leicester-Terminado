const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Partidos = mongoose.model('Partido', new Schema({
    idMatch: String,
    teamLocal: String,
    teamVisitor: String,
    scoreLocal: Number,
    scoreVisitor: Number,
    competition: String,
    gameWeek: Number,
    date: Date
}))


module.exports = Partidos