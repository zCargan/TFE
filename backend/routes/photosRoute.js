const express = require("express");
const router = express.Router();
const registerCrtl = require('../controllers/registerCtrl')
const photosCrtl = require('../controllers/photosCtrl')
const multer = require('multer');
const path = require('path');
const pgp = require('pg-promise')();


const storage = multer.memoryStorage(); 
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
    const imageBuffer = req;
    console.log(imageBuffer)
}

);

module.exports = router;