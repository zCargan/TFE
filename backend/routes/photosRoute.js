const express = require("express");
const router = express.Router();
const multer = require('multer');
const { Client } = require('pg');
const storage = multer.memoryStorage(); 
const upload = multer({ storage });
const photoCtrl = require('../controllers/photosCtrl')
const jwt = require("jsonwebtoken");

router.post('/', upload.array('photo', 3), async (req, res) => {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'test',
        user: 'postgres',
        password: 'LoganTFE2023',
    });
    
    client.connect()
        .then(()=> console.log('Connexion à PostgresSQL réussie dans photosRoute.js!'))
        .catch(() => console.log('Connexion à PostgresSQL échouée !'))
        // Libère la pool de connexions
    try {
        // Vérifier si des fichiers ont été téléversés
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No images uploaded" });
        }

        // Accéder aux informations sur les fichiers
        const fileNames = req.files.map(file => file.originalname);
        const fileSizes = Number(req.files.map(file => file.size));
        
        const fileData = req.files.map(file => file.buffer);
        // ... d'autres propriétés disponibles dans chaque fichier
        console.log(fileNames, fileSizes, fileData)
        const insertQuery = {
            text: 'INSERT INTO images (file_name, file_size, file_data) VALUES ($1, $2, $3)',
            values: [fileNames, fileSizes, fileData],
        };
        const result = client.query(insertQuery);
        console.log('Image insérée avec succès:', result);
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
});


//photoCtrl.getPhotos
router.get('/getImg', photoCtrl.getPhotos);

router.get('/getDetail/:id', photoCtrl.getPhotoDetail);

router.post('/register/img', upload.single('file'), photoCtrl.register);

router.get('/testNewRoute', (req, res) => {
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
                client.query('SELECT * FROM images WHERE utilisateur_id = $1', [decoded.id], (err, result) => {
                  if (err) {
                    console.error('Erreur lors de la récupération des images :', err);
                    res.status(500).send('Erreur lors de la récupération des images');
                  } else {
                    if (result.rows.length > 0) {
                      const images = result.rows;
                      res.json(images); // Renvoyer les images en tant que réponse JSON
                    } else {
                      res.status(404).send('Aucune image trouvée pour cet utilisateur.');
                    }
                  }
                  client.end(); // Fermer la connexion après utilisation
                });
              }
            });
        
            }
        });
    } else {
        console.log("Aucun token trouvé dans l'en-tête Authorization");
    }
});

router.post('/changeName/:id', photoCtrl.updateImageName);

router.delete('/deleteImage/:id', photoCtrl.deleteImage);

module.exports = router;