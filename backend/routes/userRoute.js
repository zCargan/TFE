const express = require("express");
const router = express.Router();

const userCtrl = require('../controllers/userCtrl')


router.get('/getAllInformationsUsers', userCtrl.getAllInformationsUsers);
router.put('/updateUserInformations', userCtrl.updateUserInformations);

module.exports = router;