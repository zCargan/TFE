const express = require("express");
const router = express.Router();

const exerciceCtrl = require('../controllers/exercice')

router.post('/', exerciceCtrl.postExercice)

module.exports = router;