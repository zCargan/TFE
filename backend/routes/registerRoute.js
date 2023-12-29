const express = require("express");
const router = express.Router();
const registerCrtl = require('../controllers/registerCtrl')


router.post('/register', registerCrtl.registerData)

module.exports = router;