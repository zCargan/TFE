const multer = require('multer');
const express = require('express');
const router = express.Router();
const soundCtrl = require('../controllers/soundCtrl')

// Middleware pour gérer les fichiers multipart/form-data
const upload = multer({
  storage: multer.memoryStorage(), // Stocke le fichier en mémoire au lieu du disque
});

router.post('/postSound', upload.single('audio'), soundCtrl.postSound);
router.get('/getSound/:id', soundCtrl.getSound);
router.get('/getSoundById/:id', soundCtrl.getSoundById)

router.post('/changeName/:id', soundCtrl.updateSonName);
router.delete('/deleteSound/:id', soundCtrl.deleteSound);

module.exports = router;
