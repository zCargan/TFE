const express = require("express");
const router = express.Router();

const userCtrl = require('../controllers/userCtrl')


router.get('/getAllInformationsUsers', userCtrl.getAllInformationsUsers);
router.put('/updateUserInformations', userCtrl.updateUserInformations);
router.post('/sendRequest', userCtrl.sendRequest);
router.get('/getAllExercicesFromProfesseur', userCtrl.getAllExercicesFromProfesseur)

module.exports = router;