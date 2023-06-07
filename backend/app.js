const mongoose = require('mongoose');
const exerciceRoute  = require('./routes/exercice')
const connectionRoute = require('./routes/connectionRoute')
const registerRoute = require('./routes/registerRoute')
const testRoute = require('./routes/test')
const { Client } = require('pg');

const cors = require('cors');



const express = require('express');
const app = express();
app.use(express.json())

app.use(cors());

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'test',
    user: 'postgres',
    password: 'LoganTFE2023',
});

client.connect()
    .then(()=> console.log('Connexion à PostgresSQL réussie !'))
    .catch(() => console.log('Connexion à PostgresSQL échouée !'))
    // Libère la pool de connexions
                                              

mongoose.connect('mongodb+srv://Cargan:LoganTFE2023@tfe.omhpimu.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB echoué !'));



app.use('/exercice', exerciceRoute);
app.use('/test', testRoute);
app.use('/register', registerRoute);
app.use('/connection', connectionRoute);
/*
app.use("/test", (req, res) => {
  client.query("SELECT * FROM public.utilisateurs", (error, result) => {
    if (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    } else {
      console.log(result.rows);
    }}
)});
*/

module.exports = app