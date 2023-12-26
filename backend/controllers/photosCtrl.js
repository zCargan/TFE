
const express = require('express');
const path = require('path');
const pgp = require('pg-promise')();
const multer = require('multer');
const { Client } = require('pg');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const jwt = require("jsonwebtoken");

const storage = multer.memoryStorage(); 
const upload = multer({ storage });


/*
exports.testRoute (req, res, next) => {
    try {
        // Vérifier si des fichiers ont été téléversés
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No images uploaded" });
        }

        // Accéder aux informations sur les fichiers
        const fileNames = req.files.map(file => file.originalname);
        const fileSizes = req.files.map(file => file.size);
        const fileData = req.files.map(file => file.buffer);
        // ... d'autres propriétés disponibles dans chaque fichier
        console.log(fileNames, fileSizes, fileData)

        // Traitez les fichiers ou renvoyez des informations à l'utilisateur
        res.status(200).json({
            message: "Images uploaded successfully",
            fileNames: fileNames,
            fileSizes: fileSizes,
            // ... d'autres informations que vous souhaitez renvoyer
        });
    } catch (error) {
        console.error('Error uploading images:', error);
        return res.status(500).json({ error: 'An error occurred while uploading the images' });
    }
    const client = new Client({
        host: 'dbContainer',
        port: 5432,
        database: 'test',
        user: 'postgres',
        password: 'LoganTFE2023',
    });
    
    client.connect()
        .then(()=> console.log('Connexion à PostgresSQL réussie 2!'))
        .catch(() => console.log('Connexion à PostgresSQL échouée !'))
        // Libère la pool de connexions
}
*/


exports.getPhotoDetail = (req, res) => {
    const photoId = req.params.id;

    const client = new Client({
        host: 'dbContainer',
        port: 5432,
        database: 'test',
        user: 'postgres',
        password: 'LoganTFE2023',
    });

    client.connect()
        .then(() => {
            const query = 'SELECT * FROM images WHERE id = $1'; // Utilisation de $1 comme placeholder

            return client.query(query, [photoId]) // Utilisation de paramètres pour éviter les injections SQL
                .then(result => {
                    console.log('Résultats de la requête :', result.rows); // Afficher les résultats dans la console
                    client.end(); // Fermer la connexion après l'exécution de la requête
                    res.status(200).json(result.rows); // Envoyer les résultats en tant que réponse JSON
                })
                .catch(err => {
                    client.end(); // En cas d'erreur, fermer la connexion
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    res.status(500).json({ error: 'Erreur lors de la récupération des détails de la photo' });
                });
        })
        .catch(err => {
            console.error('Erreur lors de la connexion à la base de données :', err);
            res.status(500).json({ error: 'Erreur de connexion à la base de données' });
        });
};

exports.getPhotos = (req, res, next) => {
    const client = new Client({
        host: 'dbContainer',
        port: 5432,
        database: 'test',
        user: 'postgres',
        password: 'LoganTFE2023',
    });
    
    // Initialisation des variables pour stocker les données des images
    let fileNames = [];
    let fileSizes = [];
    let fileData = [];

    // Connexion à la base de données
    client.connect()
        .then(() => {
            console.log('Connexion à PostgreSQL réussie dans photoCtrl.js!');

            // Requête SELECT pour récupérer les données des images
            const selectQuery = 'SELECT file_name, file_size, file_data FROM images';
            return client.query(selectQuery);
        })
        .then(result => {
            // Récupération des résultats de la requête SELECT
            for (const row of result.rows) {
                fileNames.push(row.file_name);
                fileSizes.push(row.file_size);
                fileData.push(row.file_data);
            }

            // Fermeture de la connexion à la base de données
            return client.end();
        })
        .then(() => {
            console.log('Données des images récupérées avec succès:', fileNames, fileSizes, fileData);
            // Réponse JSON avec les données récupérées
            res.status(200).json({
                fileNames: fileNames,
                fileSizes: fileSizes,
                fileData: fileData
                // Vous pouvez ajouter d'autres données si nécessaire
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des images:', error);
            res.status(500).json({ error: 'An error occurred while fetching images' });
        });
};



exports.register = (req, res, next) => {
    const token = req.header('Authorization');
    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test"
        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                console.error('Erreur lors de la vérification du JWT :', err);
            } else {

                const client = new Client({
                    host: 'dbContainer',
                    port: 5432,
                    database: 'test',
                    user: 'postgres',
                    password: 'LoganTFE2023',
                });
                //console.log(decoded.id)
                let nameTmp = req.body.name
                req.file.fieldname = nameTmp;

                //Partie à sauver sur postGreSql
                const newName = req.body.name;
                const imageBytea = req.file.buffer;
                const type = req.file.mimetype;
                const idUtilisateur = decoded.id;
                
                const query = {
                    text: 'INSERT INTO images (utilisateur_id, image_data, type_mime, nom_d_origine) VALUES ($1, $2, $3, $4)',
                    values: [idUtilisateur, imageBytea, type, newName],
                };
                
                client.connect(); // Établir une connexion
                
                client.query(query, (error, result) => {
                    if (error) {
                        console.error('Erreur lors de l\'ajout des données :', error);
                    } else {
                        res.status(200).json({ message: "Image ajoutée" });
                    }
                    // Ne fermez pas la connexion ici. La connexion devrait être fermée une fois que vous avez terminé toutes les requêtes.
                });
            }
        })
    }
}


exports.updateImageName = (req, res, next) => {

    const photoId = req.params.id
    const newName = req.body.newNameValue;

    const token = req.header('Authorization');
    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test"
        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                console.error('Erreur lors de la vérification du JWT :', err);
            } else {
                
                const client = new Client({
                    host: 'dbContainer',
                    port: 5432,
                    database: 'test',
                    user: 'postgres',
                    password: 'LoganTFE2023',
                });

                const query = {
                    text: 'UPDATE images SET nom_d_origine = $1 WHERE id = $2',
                    values: [newName, photoId],
                };

                client.connect(); 
                
                client.query(query, (error, result) => {
                    if (error) {
                        res.status(200).json({ message: "Le renommage a réussi." });
                    } else {
                        res.status(500).json({ error: "Le renommage a échoué en raison d'une erreur inattendue." });
                    }
                    // Ne fermez pas la connexion ici. La connexion devrait être fermée une fois que vous avez terminé toutes les requêtes.
                });

                
            }
        })
    }

}

exports.deleteImage = (req, res, next) => {
    const photoId = req.params.id

    const client = new Client({
        host: 'dbContainer',
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
          client.query('DELETE FROM images WHERE id = $1', [photoId], (err, result) => {
            if (err) {
              console.error("Erreur lors de la suppression de l image:", err);
              res.status(500).send('Erreur lors de la suppression de l image');
            } else {
                res.status(200).json({ message: "Suppression réussie" });
            }
            client.end(); // Fermer la connexion après utilisation
          });
        }
      });
}


exports.getImage = (req, res) => {
    const token = req.header('Authorization');
    if (token) {
        const jwtToken = token.replace('Bearer ', ''); 
        const secretKey = "test"
        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                console.error('Erreur lors de la vérification du JWT :', err);
            } else {
                const client = new Client({
                    host: 'dbContainer',
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
                        client.query('SELECT * FROM images WHERE id = $1', [req.params.id], (err, result) => {
                        if (err) {
                            console.error("Erreur lors de la récupération de l image:", err);
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