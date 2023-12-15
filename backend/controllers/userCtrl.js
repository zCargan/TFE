const { Client } = require('pg');
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");

const MDN = require('../models/MDN');
const TTI = require('../models/TTI')
const LDN = require('../models/LDN')
const TAT = require('../models/TAT')
const MB = require('../models/MB')
const STT = require('../models/STT')
const ABAQUE = require('../models/abaque');
const Worksheet = require('../models/worksheet')

exports.getAllInformationsUsers = (req, res, next) => {

    const token = req.header('Authorization');

    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test"
        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                console.error('Erreur lors de la vérification du JWT :', err);
            } else {
                console.log(decoded)
            }
        })
    } else {
        console.log("Pas de token")
    }

    const query = 'SELECT * FROM utilisateurs;';
    const dictionnaireUser = {};
    const client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'test',
        user: 'postgres',
        password: 'LoganTFE2023',
    });

    client.connect();

    client.query(query, (error, result) => {
        if (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
        } else {
            if (result.rows.length === 0) {
                res.status(404).json({ error: 'Aucun utilisateur trouvé' });
            } else {
                result.rows.forEach(row => {
                    dictionnaireUser[row.nom] = row.role;
                    console.log(row);
                });
                res.status(200).json(dictionnaireUser);
            }
        }
    });
};

exports.updateUserInformations = (req, res, next) => {

    const [cle, valeur] = Object.entries(req.body)[0];

    const token = req.header('Authorization');

    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test"
        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                console.log('Erreur lors de la vérification du JWT :', err);
            } else {
                console.log(decoded)
            }
        })
    } else {
        console.log("Pas de token")
    }


    const client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'test',
        user: 'postgres',
        password: 'LoganTFE2023',
    });

    client.connect()
    const query = 'UPDATE utilisateurs SET role = $1 WHERE nom = $2';
    const values = [valeur, cle];
    console.log(query)
    client.query(query, values, (err, result) => {
        if (err) {
            console.log('Erreur lors de l\'ajout des données:', err);
        } else {
            console.log('Données mise à jour pour la table utilisateurs');
            res.status(201).json({ message: 'utilisateur modifié' })
        }
    });
}

exports.sendRequest = (req, res, next) => {
    console.log(req.body)

    let emailUser = req.body.email;
    let motifUser = req.body.motif;
    let detailsUser=  req.body.details

    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: 'lgc.carlier@gmail.com', 
            pass: 'qfcb hcah xpgg oxpt',  
        },
    });
    
    let texte = "Détail de la requete : " +  detailsUser;

    texte += "\n"

    texte += "Email user : " + emailUser

    const mailOptions = {
        from: emailUser,
        to: "lgc.carlier@gmail.com",
        subject: motifUser,
        text: texte
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail', error);
            return res.status(500).json({ message: 'Erreur lors de l\'envoi de la requete.' });
        }
        console.log('E-mail envoyé: ' + info.response);
        // Réponse réussie ici
        res.status(200).json({ message: 'Demande bien reçue! Merci!' });
    });
}

exports.getAllExercicesFromProfesseur = async (req, res, next) => {
    const token = req.header('Authorization');

    console.log("getAllExercicesFromProfesseur");

    if (token) {
        try {
            const jwtToken = token.replace('Bearer ', '');
            const secretKey = "test";
            const decoded = jwt.verify(jwtToken, secretKey);

            const client = new Client({
                host: 'localhost',
                port: 5432,
                database: 'test',
                user: 'postgres',
                password: 'LoganTFE2023',
            });

            client.connect();

            try {
                const result = await client.query('SELECT * FROM exercicereference WHERE utilisateur_id = $1', [decoded.id]);

                let arrayExos = [];

                // Utilisation de Promise.all pour attendre la résolution de toutes les promesses
                await Promise.all(result.rows.map(async (row) => {
                    if (row.type === "TTI") {
                        // Utilisation de await pour attendre la résolution de la promesse
                        const donnees = await TTI.findById(row.exercice_id);
                        console.log(donnees);
                        arrayExos.push(donnees);
                    }
                }));

                console.log(arrayExos);
                res.send(arrayExos);
            } catch (error) {
                console.error('Erreur lors de l\'exécution de la requête :', error);
                res.status(500).send('Erreur lors de la récupération des exercices.');
            } finally {
                client.end();
            }
        } catch (error) {
            console.log('Erreur lors de la vérification du JWT :', error);
            res.status(500).send('Erreur lors de la vérification du JWT.');
        }
    } else {
        console.log("Pas de token");
        res.status(401).send('Pas de token fourni');
    }
};