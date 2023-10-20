const express = require("express");
const router = express.Router();

const exerciceCtrl = require('../controllers/exercice')

router.post('/', exerciceCtrl.postExercice)
router.post('/send_test_exercice', exerciceCtrl.sendExercice)

module.exports = router;