const Exercice = require('../models/exercice');
const mongoose = require('mongoose');
const Test = require('../models/test')

exports.postExercice = (req, res, next) => {
    let test1 = req.body.data;
    console.log(req.body)
    const test = new Test({
        nom: test1
    })
    test.save((err) => {
        if (err) {
          console.error("Erreur lors de l'enregistrement des données :", err);
        } else {
          console.log('Données enregistrées avec succès.');
        }
      });
} 


exports.postExercice = (req, res, next) => {
    console.log(req.body)
    const exercice = new Exercice({
        ...req.body
    })
    exercice.save()
}

exports.sendExercice = async (req, res, next) => {
    console.log(req.body.text)
    try {
        const exerciceData = req.body.text; // Assurez-vous que les données à insérer sont correctement formatées dans req.body

        await mongoose.connect('mongodb+srv://Cargan:LoganTFE2023@tfe.omhpimu.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("connecté")

        const exercice = new Exercice(exerciceData); // Créez une nouvelle instance de modèle Exercice
        exercice.save(); // Enregistrez les données dans la base de données
        console.log('réussi')
        res.status(201).json({ message: 'Exercice enregistré avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur est survenue lors de l'enregistrement de l'exercice" });
    }
    /*
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
        const collection = mongoose.connection.db.collection('exercice');
        collection.insertOne(dictionnaire)
          .then(() => {
            console.log('Dictionnaire inséré avec succès dans la collection "exercice" de la base de données "tfe".');
          })
          .catch(err => {
            console.error('Erreur lors de l\'insertion du dictionnaire :', err);
          });
        
    }

    )
    */
}