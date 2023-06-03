const mongoose = require('mongoose');
const exerciceRoute  = require('./routes/exercice')
const { Pool } = require('pg');

const cors = require('cors');



const express = require('express');
const app = express();
app.use(express.json())

app.use(cors());

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'test',
    user: 'postgres',
    password: 'LoganTFE2023',
});

pool.query('SELECT NOW()', (error, result) => {
    if (error) {
      console.error('Erreur lors de la connexion à la base de données :', error);
    } else {
      console.log('Résultat de la requête SELECT NOW() :', result.rows[0]);
    }
  
    // Libère la pool de connexions
    pool.end();
});

mongoose.connect('mongodb+srv://Cargan:LoganTFE2023@tfe.omhpimu.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB echoué !'));



app.use('/exercice', exerciceRoute);


module.exports = app