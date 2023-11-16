const mongoose = require('mongoose');
const exerciceRoute  = require('./routes/exerciceRoute')
const connectionRoute = require('./routes/connectionRoute')
const registerRoute = require('./routes/registerRoute')
const testRoute = require('./routes/testRoute')
const photosRoute = require('./routes/photosRoute')
const soundRoute = require('./routes/soundRoute')
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
                                              




app.use('/exercice', exerciceRoute);
app.use('/test', testRoute);
app.use('/register', registerRoute);
app.use('/connection', connectionRoute);
app.use('/photos', photosRoute);
app.use('/sound', soundRoute);


module.exports = app