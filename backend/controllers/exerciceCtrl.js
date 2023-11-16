const mongoose = require('mongoose');
const MDN = require('../models/MDN');
const TTI = require('../models/TTI')
const LDN = require('../models/LDN')
const TAT = require('../models/TAT')
const MB = require('../models/MB')
const STT = require('../models/STT')
const ABAQUE = require('../models/abaque');
const jwt = require("jsonwebtoken");
const { Client } = require('pg');




// mongodb+srv://Cargan:LoganTFE2023@tfe.omhpimu.mongodb.net/monProjet'
mongoose.connect('mongodb+srv://Cargan:LoganTFE2023@tfe.omhpimu.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connexion réussie à la base de données depuis exercice.js');
    })
    .catch((err) => {
        console.error('Erreur de connexion à la base de données :', err);
    });


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

// GET BY ID
exports.getMDNexerciceId = (req, res) => {
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
    const newAbaque = new ABAQUE({
        ...req.body.data.exercice
    });

    newAbaque.save()
        .then(() => res.status(201).json({ message: 'Abaque ajouté' }))
        .catch(error => res.status(400).json({ error }));
}

// GET
exports.getAbaqueExercice = (req, res) => {
    ABAQUE.find().then((donnees) => {
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
    if (typeExercice === "LDN") {
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



// ===================== TAT =====================

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



// ===================== MB =====================

// POST 

exports.postMB = (req, res, next) => {

    const token = req.header('Authorization');
    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test";

        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: "Token JWT invalide" });
            } else {
                const mb = new MB({
                    ...req.body.data
                })
                mb.save()
            }
        })

    }
}

// GET 
exports.getMB = (req, res) => {

    const token = req.header('Authorization');
    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test";

        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: "Token JWT invalide" });
            } else {
                console.log(decoded.id)
                MB.find().then((donnees) => {
                    res.send(donnees)
                });
            }
        })
    } else {
        MB.find().then((donnees) => {
            res.send(donnees)
        });
    }
}



// ===================== STT =====================

// POST
exports.postSTT = (req, res) => {
    const token = req.header('Authorization');
    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test";

        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: "Token JWT invalide" });
            } else {
                console.log(req.body)
                const stt = new STT({
                    ...req.body
                })
                stt.save()
            }
        })
    }
}


// GET 
exports.getSTT = (req, res) => {
    const token = req.header('Authorization');
    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test";

        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: "Token JWT invalide" });
            } else {
                console.log(decoded.id)
                STT.find().then((donnees) => {
                    res.send(donnees)
                });
            }
        })
    } else {
        STT.find().then((donnees) => {
            res.send(donnees)
        });
    }
}

// GET BY ID

exports.getSTTById = (req, res) => {

    let idExo = req.params.id;
    console.log(idExo)
    const token = req.header('Authorization');
    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test"
        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                console.error('Erreur lors de la vérification du JWT :', err);
            } else {
                const client = new Client({
                    host: 'localhost',
                    port: 5432,
                    database: 'test',
                    user: 'postgres',
                    password: 'LoganTFE2023',
                });

                client.connect((err) => {
                    if (err) {
                        console.error('Erreur de connexion à la base de données :', err);
                        res.status(500).send('Erreur de connexion à la base de données');
                    } else {
                        console.log('Connexion à la base de données établie avec succès');
                        client.query('SELECT * FROM sons WHERE id = $1', [req.params.id], (err, result) => {
                            if (err) {
                                console.error("Erreur lors de la suppression de l'image:", err);
                                res.status(500).send('Erreur lors de la suppression de l image');
                            } else {
                                res.status(200).json(result.rows);
                            }
                            client.end();
                        });
                    }
                });
                console.log(req.params.id)
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

    client.query('SELECT * FROM exercices WHERE utilisateur_id = $1', [req.body.data.id], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            res.status(500).send('Erreur lors de la récupération des exercices.');
        } else {
            res.status(200).json(result.rows);
        }
        client.end();
    });
};



// ===================== Divers =====================

// Récupere le 1er élément de chaque collection 
exports.getExosFromAllTablesId1 = (req, res, next) => {
    let array = [];

    const mdnPromise = MDN.find().then((donnees) => {
        array.push(donnees[0]);
    });

    const mbPromise = MB.find().then((donnees) => {
        array.push(donnees[0]);
    });

    const tatPromise = TAT.find().then((donnees) => {
        array.push(donnees[0]);
    });

    const sttPromise = STT.find().then((donnees) => {
        array.push(donnees[0]);
    });

    const ldnPromise = LDN.find().then((donnees) => {
        array.push(donnees[0]);
    });

    const ttiPromise = TTI.find().then((donnees) => {
        array.push(donnees[0]);
    });

    const abaquePromise = ABAQUE.find().then((donnees) => {
        array.push(donnees[0]);
    });

    // Attendre que toutes les promesses soient résolues
    Promise.all([mdnPromise, mbPromise, tatPromise, sttPromise, ldnPromise, ttiPromise, abaquePromise])
        .then(() => {
            console.log(array);
            // Vous pouvez faire d'autres choses avec le tableau ici
            res.json(array); // Envoyer les données en réponse
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Erreur lors de la récupération des données.');
        });
};






exports.countElementByCollection = async (req, res, next) => {
    try {
        // Utilisez le modèle Mongoose correspondant à votre collection
        const count = await ABAQUE.countDocuments({});
        console.log('Nombre total d\'éléments dans la collection :', count);
        // Vous n'avez pas besoin de fermer la connexion ici car vous l'avez déjà établie au démarrage
        res.status(200).json({ count: count });
    } catch (err) {
        console.error('Erreur lors du comptage des documents :', err);
        res.status(500).json({ error: 'Erreur lors du comptage des documents' });
    }
};



exports.getNameCollection = async (req, res, next) => {
    try {
        // Vérifiez si la connexion à la base de données est établie
        if (mongoose.connection.readyState !== 1) {
            throw new Error('La connexion à la base de données n\'est pas établie.');
        }

        const db = mongoose.connection.db;

        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(collection => collection.name);

        console.log('Collections présentes dans la base de données :', collectionNames);

        // Vous pouvez également faire quelque chose avec les noms des collections ici si nécessaire

        res.status(200).json({ collections: collectionNames });
    } catch (err) {
        console.error('Erreur lors de la récupération des collections :', err);
        res.status(500).json({ error: 'Erreur lors de la récupération des collections' });
    }
};



exports.getTotalCounts = async (req, res, next) => {
    let totalElement = 0;
    let dictOfCollections = {}

    try {
        const db = mongoose.connection.db;

        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(collection => collection.name);

        console.log('Collections présentes dans la base de données :', collectionNames);


        for (let i = 0; i < collectionNames.length; i++) {
            if (collectionNames[i] == "abaques") {
                const count = await ABAQUE.countDocuments({});
                totalElement += count;
                console.log('Nombre total d\'éléments dans la collection abaques:', count);
                dictOfCollections.abaques = count
            }
            if (collectionNames[i] == "mdns") {
                const count = await MDN.countDocuments({});
                totalElement += count;
                console.log('Nombre total d\'éléments dans la collection mdns:', count);
                dictOfCollections.mdns = count
            }
            if (collectionNames[i] == "mbs") {
                const count = await MB.countDocuments({});
                totalElement += count;
                console.log('Nombre total d\'éléments dans la collection mbs:', count);
                dictOfCollections.mbs = count
            }
            if (collectionNames[i] == "stts") {
                const count = await STT.countDocuments({});
                totalElement += count;
                console.log('Nombre total d\'éléments dans la collection stts:', count);
                dictOfCollections.stts = count
            }
            if (collectionNames[i] == "tats") {
                const count = await TAT.countDocuments({});
                totalElement += count;
                console.log('Nombre total d\'éléments dans la collection tats:', count);
                dictOfCollections.tats = count
            }
            if (collectionNames[i] == "ttis") {
                const count = await TTI.countDocuments({});
                totalElement += count;
                console.log('Nombre total d\'éléments dans la collection ttis:', count);
                dictOfCollections.ttis = count
            }
            if (collectionNames[i] == "ldns") {
                const count = await LDN.countDocuments({});
                totalElement += count;
                console.log('Nombre total d\'éléments dans la collection ldns:', count);
                dictOfCollections.ldns = count
            }
        }
        console.log("Total d'élements dans la base de données:", totalElement)
        res.status(200).json({ collections: collectionNames, nbrExercices: totalElement, moreInformations: dictOfCollections });

    } catch (err) {
        console.error('Erreur lors de la récupération des collections :', err);
        res.status(500).json({ error: 'Erreur lors de la récupération des collections' });

    }
};


exports.getDetailsExos = (req, res, next) => {

    const token = req.header('Authorization');
    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test"
        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                console.error('Erreur lors de la vérification du JWT :', err);
            } else {
                const idExo = req.query.idExo;
                const typeExo = req.query.typeExo;

                if (typeExo == "abaque") {

                    ABAQUE.findById(idExo)
                    .then(exercice => {
                        if (exercice) {
                            res.status(200).json({ exerciceInfos: exercice });
                            // Faire quelque chose avec l'exercice récupéré, par exemple, envoyer en réponse à une requête HTTP
                        } else {
                            console.log('Aucun exercice trouvé avec l\'ID spécifié.');
                            // Gérer le cas où aucun exercice n'est trouvé avec l'ID spécifié (envoyer une réponse HTTP 404, etc.)
                        }
                    })
                    .catch(err => {
                        console.error('Erreur lors de la recherche de l\'exercice par ID :', err);
                        // Gérer l'erreur de manière appropriée (envoyer une réponse HTTP 500, etc.)
                    });

                }
                if (typeExo == "MDN") {

                    MDN.findById(idExo)
                    .then(exercice => {
                        if (exercice) {
                            res.status(200).json({ exerciceInfos: exercice });
                            // Faire quelque chose avec l'exercice récupéré, par exemple, envoyer en réponse à une requête HTTP
                        } else {
                            console.log('Aucun exercice trouvé avec l\'ID spécifié.');
                            // Gérer le cas où aucun exercice n'est trouvé avec l'ID spécifié (envoyer une réponse HTTP 404, etc.)
                        }
                    })
                    .catch(err => {
                        console.error('Erreur lors de la recherche de l\'exercice par ID :', err);
                        // Gérer l'erreur de manière appropriée (envoyer une réponse HTTP 500, etc.)
                    });

                }
                if (typeExo == "LDN") {

                    LDN.findById(idExo)
                    .then(exercice => {
                        if (exercice) {
                            res.status(200).json({ exerciceInfos: exercice });
                            // Faire quelque chose avec l'exercice récupéré, par exemple, envoyer en réponse à une requête HTTP
                        } else {
                            console.log('Aucun exercice trouvé avec l\'ID spécifié.');
                            // Gérer le cas où aucun exercice n'est trouvé avec l'ID spécifié (envoyer une réponse HTTP 404, etc.)
                        }
                    })
                    .catch(err => {
                        console.error('Erreur lors de la recherche de l\'exercice par ID :', err);
                        // Gérer l'erreur de manière appropriée (envoyer une réponse HTTP 500, etc.)
                    });

                }
                if (typeExo == "MB") {

                    MB.findById(idExo)
                    .then(exercice => {
                        if (exercice) {
                            res.status(200).json({ exerciceInfos: exercice });
                        } else {
                            console.log('Aucun exercice trouvé avec l\'ID spécifié.');
                            // Gérer le cas où aucun exercice n'est trouvé avec l'ID spécifié (envoyer une réponse HTTP 404, etc.)
                        }
                    })
                    .catch(err => {
                        console.error('Erreur lors de la recherche de l\'exercice par ID :', err);
                        // Gérer l'erreur de manière appropriée (envoyer une réponse HTTP 500, etc.)
                    });

                }
                if (typeExo == "STT") {
                    STT.findById(idExo)
                    .then(exercice => {
                        if (exercice) {
                            res.status(200).json({ exerciceInfos: exercice });
                            // Faire quelque chose avec l'exercice récupéré, par exemple, envoyer en réponse à une requête HTTP
                        } else {
                            console.log('Aucun exercice trouvé avec l\'ID spécifié.');
                            // Gérer le cas où aucun exercice n'est trouvé avec l'ID spécifié (envoyer une réponse HTTP 404, etc.)
                        }
                    })
                    .catch(err => {
                        console.error('Erreur lors de la recherche de l\'exercice par ID :', err);
                        // Gérer l'erreur de manière appropriée (envoyer une réponse HTTP 500, etc.)
                    });
                }
                if (typeExo == "TTI") {
                    TTI.findById(idExo)
                    .then(exercice => {
                        if (exercice) {
                            res.status(200).json({ exerciceInfos: exercice });
                        } else {
                            console.log('Aucun exercice trouvé avec l\'ID spécifié.');
                            // Gérer le cas où aucun exercice n'est trouvé avec l'ID spécifié (envoyer une réponse HTTP 404, etc.)
                        }
                    })
                    .catch(err => {
                        console.error('Erreur lors de la recherche de l\'exercice par ID :', err);
                        // Gérer l'erreur de manière appropriée (envoyer une réponse HTTP 500, etc.)
                    });
                }
                if (typeExo == "TAT") {
                    TAT.findById(idExo)
                    .then(exercice => {
                        if (exercice) {
                            res.status(200).json({ exerciceInfos: exercice });
                        } else {
                            console.log('Aucun exercice trouvé avec l\'ID spécifié.');
                            // Gérer le cas où aucun exercice n'est trouvé avec l'ID spécifié (envoyer une réponse HTTP 404, etc.)
                        }
                    })
                    .catch(err => {
                        console.error('Erreur lors de la recherche de l\'exercice par ID :', err);
                        // Gérer l'erreur de manière appropriée (envoyer une réponse HTTP 500, etc.)
                    });
                }
            }
        })
    } else {
        //console.log("pas de token")
    }
}