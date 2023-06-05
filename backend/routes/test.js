const express = require("express");
const router = express.Router();

const exerciceCtrl = require('../controllers/exercice')
const testCtrl = require('../controllers/testController')

router.post('/', testCtrl.getInfoPQ)

router.post('/sendData', testCtrl.sendData)


module.exports = router;