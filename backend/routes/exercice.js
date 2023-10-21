const express = require("express");
const router = express.Router();

const exerciceCtrl = require('../controllers/exercice')

router.post('/', exerciceCtrl.postExercice)
router.post('/send_test_exercice', exerciceCtrl.sendExercice)
router.get('/get_exos', (req, res) => {
    res.send('ceci fonctionne');
  });

router.get('/get_exercices', exerciceCtrl.getExos)

module.exports = router;