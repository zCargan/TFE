const express = require("express");
const router = express.Router();
const registerCrtl = require('../controllers/registerCtrl')


router.post('/', registerCrtl.registerData)

module.exports = router;