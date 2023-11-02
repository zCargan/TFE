const express = require("express");
const router = express.Router();

const exerciceCtrl = require('../controllers/exercice')

router.post('/', exerciceCtrl.postExercice)
router.post('/send_test_exercice', exerciceCtrl.sendExercice)


router.get('/get_exercices', exerciceCtrl.getExos)
router.post('/post_mdn_exercices', exerciceCtrl.registerMDNexercice)
router.get('/get_mdn_exercice', exerciceCtrl.getMDNexercice)
router.post('/registerAnswers', exerciceCtrl.registerAnswer)
router.post('/getExosFromUser', exerciceCtrl.getExosFromExercice)

module.exports = router;