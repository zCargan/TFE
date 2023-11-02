
const express = require('express');
const path = require('path');
const pgp = require('pg-promise')();
const multer = require('multer');
const { Client } = require('pg');
const fs = require('fs');
const { MongoClient } = require('mongodb');

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
        host: 'localhost',
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

exports.getPhotos = (req, res, next) => {
    const client = new Client({
        host: 'localhost',
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