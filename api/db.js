const mongoose = require('mongoose')
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('Database is conected')) 
    .catch((err)=>{console.log(`Error al conectar la Base de Datos => ${err}`); process.exit(1)});