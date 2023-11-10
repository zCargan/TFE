const Exercice = require('../models/exercice');
const mongoose = require('mongoose');
const Test = require('../models/test')
const MDN = require('../models/MDN');
const TTI = require('../models/TTI')
const LDN = require('../models/LDN')
const TAT = require('../models/TAT')
const Abaque = require('../models/abaque');
const jwt = require("jsonwebtoken");
const { Client } = require('pg');




// ===================== MDN =====================


// POST
exports.registerMDN = (req, res) => {
    const MaisonDesNombres = new MDN({
        ...req.body.exo
    })
    MaisonDesNombres.save()
    .then(() => res.status(201).json({ message: 'MDN ajouté' }))
    .catch(error => res.status(400).json({ error }));
}

// GET

exports.getMDNexercice = (req, res) => {
    MDN.find().then((donnees) => {
        res.send(donnees)
    });
}

exports.getMDNexerciceId = (req,res) => {
    let idExo = req.params.id;
    console.log("on passe ici")
    MDN.find().then((donnees) => {
        res.send(donnees)
    });
}


// ===================== abaque =====================

// POST 
exports.postAbaque = (req, res) => {
    console.log(req.body.data);

    // Création d'une nouvelle instance du modèle Abaque
    const newAbaque = new Abaque({
        ...req.body.data.exercice
    });

    newAbaque.save()
        .then(() => res.status(201).json({ message: 'Abaque ajouté' }))
        .catch(error => res.status(400).json({ error }));
}


// GET

exports.getAbaqueExercice = (req, res) => {
    Abaque.find().then((donnees) => {
        res.send(donnees)
    });
}




// ===================== Exercice =====================

// POST
exports.postExercice = (req, res, next) => {
    console.log(req.body.data)
    const exercice = new Exercice({
        name: req.body
    })
    exercice.save()
}


//GET
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



// ===================== TTI =====================

// POST
exports.postTTI = (req, res) => {

    const token = req.header('Authorization');
    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test";

        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: "Token JWT invalide" });
            } else {
                const tti = new TTI({
                    ...req.body
                })
                tti.save()
            }
        })
    }
}


// GET
exports.getTTI = (req, res) => {

    const token = req.header('Authorization');
    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test";

        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: "Token JWT invalide" });
            } else {
                console.log(decoded.id)
                TTI.find().then((donnees) => {
                    res.send(donnees)
                });
            }
        })
    }
}


// ===================== LDN =====================

// POST
exports.postLDN = (req, res) => {
    //console.log(req.body.exo)
    
    const token = req.header('Authorization');
    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test";

        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: "Token JWT invalide" });
            } else {
                const ldn = new LDN({
                    ...req.body.exo
                })
                ldn.save()
            }
        })
    }
    
}

// GET
exports.getLDN = (req, res) => {

    const token = req.header('Authorization');
    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test";

        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: "Token JWT invalide" });
            } else {
                console.log(decoded.id)
                LDN.find().then((donnees) => {
                    res.send(donnees)
                });
            }
        })
    }
}



// ===================== TTA =====================

// POST 
exports.postTAT = (req, res) => {
    //console.log(req.body.exo)
    
    const token = req.header('Authorization');
    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test";

        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: "Token JWT invalide" });
            } else {
                const tat = new TAT({
                    ...req.body.data
                })
                tat.save()
            }
        })
    }
    
}

// GET 


exports.getTAT = (req, res) => {
    const token = req.header('Authorization');
    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test";

        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: "Token JWT invalide" });
            } else {
                console.log(decoded.id)
                TAT.find().then((donnees) => {
                    res.send(donnees)
                });
            }
        })
    }
}


// ===================== Answers =====================

exports.registerAnswer = (req, res) => {
    let idExo = req.body.data.idExercice;
    let type = req.body.data.type;
    console.log(type)
    let pourcentage = req.body.data.score; // Assurez-vous que les données sont valides avant utilisation
    

    const token = req.header('Authorization');
    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test";

        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: "Token JWT invalide" });
            } else {
                let utilisateurId = decoded.id;
            
                const query = `INSERT INTO exercices (utilisateur_id, identifiant, pourcentage, temps, type)
                VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4)`;
 

                const values = [utilisateurId, idExo, pourcentage, type];

                const client = new Client({
                    host: 'localhost',
                    port: 5432,
                    database: 'test',
                    user: 'postgres',
                    password: 'LoganTFE2023',
                });

                client.connect()
                    .then(() => {
                        return client.query(query, values);
                    })
                    .then((result) => {
                        client.end(); // Fermeture de la connexion à la base de données
                        console.log(result);
                        res.status(200).json({ success: "Données insérées avec succès" });
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).json({ error: "Erreur lors de l'insertion des données" });
                    });
            }
        });
    } else {
        res.status(401).json({ error: "Utilisateur non connecté" });
    }
};



// ===================== History =====================
exports.getExosFromExercice = (req, res) => {

    console.log(req.body.data.id)

    const client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'test',
        user: 'postgres',
        password: 'LoganTFE2023',
    });

    client.connect(); 

    client.query('SELECT * FROM exercices WHERE utilisateur_id = $1', [req.body.data.id], (err, result) => {        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            res.status(500).send('Erreur lors de la récupération des exercices.');
        } else {
            console.log('Résultats de la requête :', result.rows);
            res.status(200).json(result.rows); 
        }
        client.end(); 
    });
};


