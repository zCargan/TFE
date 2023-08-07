const express = require("express");
const router = express.Router();
const registerCrtl = require('../controllers/registerCtrl')
const photosCrtl = require('../controllers/photosCtrl')

router.post('/', photosCrtl.testRoute)

module.exports = router;