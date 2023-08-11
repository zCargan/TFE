const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

router.post('/', upload.array('photo', 3), async (req, res) => {
    try {
        // Vérifier si des fichiers ont été téléversés
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No images uploaded" });
        }

        // Accéder aux informations sur les fichiers
        const fileNames = req.files.map(file => file.originalname);
        const fileSizes = req.files.map(file => file.size);
        // ... d'autres propriétés disponibles dans chaque fichier
        console.log(fileNames, fileSizes)

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

module.exports = router;