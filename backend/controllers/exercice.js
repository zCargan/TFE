const Exercice = require('../models/exercice');
const mongoose = require('mongoose');
const Test = require('../models/test')
const MDN = require('../models/MDN');



exports.postExercice = (req, res, next) => {
    console.log(req.body.data)
    const exercice = new Exercice({
        name: req.body
    })
    exercice.save()
}

exports.sendExercice = async (req, res, next) => {
    console.log(req.body.user[0].exo)
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

        let dictionnaire = req.body[0];
        /*
        const collection = mongoose.connection.db.collection('exercices');
        collection.insertOne(dictionnaire)
          .then(() => {
            console.log('Dictionnaire inséré avec succès dans la collection "exercice" de la base de données "tfe".');
          })
          .catch(err => {
            console.error('Erreur lors de l\'insertion du dictionnaire :', err);
          });
          */
        
    }

    )
}

exports.getExos = (req, res) => {
    console.log("on passe par ici")
    Exercice.find().then((donnees) => {
        res.send(donnees)
    });
}

exports.registerMDNexercice = (req, res) => {
    //console.log(req.body.user[0].exo)
    console.log("on passe iciiii")
    const MaisonDesNombres = new MDN({
        ...req.body.user[0].exo
    })
    MaisonDesNombres.save()
    .then(() => res.status(201).json({ message: 'MDN ajouté' }))
    .catch(error => res.status(400).json({ error }));
}

exports.getMDNexercice = (req, res) => {
    MDN.find().then((donnees) => {
        res.send(donnees)
    });
}