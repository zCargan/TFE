const Exercice = require('../models/exercice');
const mongoose = require('mongoose');
const Test = require('../models/test')

exports.postExercice = (req, res, next) => {
    console.log(req.body.data)
    const exercice = new Exercice({
        name: req.body
    })
    exercice.save()
}

exports.sendExercice = async (req, res, next) => {

    const exerciceSchema = new mongoose.Schema({}, { strict: false });
    let typeExercice = req.body.type;
    if(typeExercice === "LDN") {
        console.log()
    }
    mongoose.connect('mongodb+srv://Cargan:LoganTFE2023@tfe.omhpimu.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {

        let dictionnaire = req.body;
        const collection = mongoose.connection.db.collection('exercices');
        collection.insertOne(dictionnaire)
          .then(() => {
            console.log('Dictionnaire inséré avec succès dans la collection "exercice" de la base de données "tfe".');
          })
          .catch(err => {
            console.error('Erreur lors de l\'insertion du dictionnaire :', err);
          });
        
    }

    )
}

exports.getExos = (res, req) => {
    Exercice.find().then(
        (donnee) => {
            console.log(donnee)
        }
    )
}