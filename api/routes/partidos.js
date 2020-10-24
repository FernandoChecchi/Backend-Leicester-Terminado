const express = require('express')
const Partidos = require('../models/Partidos')

const router = express.Router()

//devuelve todos los partidos
router.get('/', (req, res) => {
    Partidos.find()
        .exec()
        .then(x => res.status(200).send(x))
        .catch(err => res.send(err))
})

//devuelve los ultimos 50 partidos
router.get('/matches', (req, res) => {
    Partidos.find()
        .limit(10)
        .exec()
        .then(x => res.status(200).send(x))
        .catch(err => res.send(err))
})

//devuelve el resultado del ultimo partido
router.get('/latest', (req, res) => {
    Partidos.find()
        .limit(1)
        .exec()
        .then(x => res.status(200).send(x.map((p) => {
            return (`${p.teamLocal}: ${p.scoreLocal} - ${p.teamVisitor}: ${p.scoreVisitor}`)
        })))
        .catch(err => res.send(err))
})

//devuelve el resultado del partido buscado por id o fecha (AAAA MM DD)
router.get('/find/:id', (req, res) => {
    //const regex = new RegExp(req.params.id, 'i')
    Partidos.find({ $or: [{ idMatch: req.params.id },{ date: req.params.id }]})
        .exec()
        .then(x => res.status(200).send(x.map((p) => {
            return (`${p.teamLocal}: ${p.scoreLocal} - ${p.teamVisitor}: ${p.scoreVisitor}`)
        })))
        .catch(err => res.send(err))
})

//devuelve los partidos entre fechas (AAAA MM DD)
router.get('/interval/:start/:end', (req, res) => {
    Partidos.find({ date: { $gte: req.params.start, $lte: req.params.end} })
        .exec()
        .then(x => res.status(200).send(x))
        .catch(err => res.send(err))
})

//devuelve los puntos de los partidos entre fechas (AAAA MM DD)
router.get('/range/:start/:end', (req, res) => {
    var total = 0;
    Partidos.find({ date: { $gte: req.params.start, $lte: req.params.end} })
        .exec()
        .then(x => res.status(200).send(x.map((p) => {
            if (p.scoreLocal === p.scoreVisitor) total++
            else if (p.scoreLocal > p.scoreVisitor && p.teamLocal === 'Leicester City') total+=3
            else if (p.scoreLocal < p.scoreVisitor && p.teamVisitor === 'Leicester City') total+=3
            return (`Puntos: ${total}`)
        })))
        .catch(err => res.send(err))
        console.log('ultimo',total)
})

//crea un partido nuevo
router.post('/add', (req, res) => {
    Partidos.create(req.body).then(x => res.status(201).send(x))
})

module.exports = router