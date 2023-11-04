const express = require("express");
const router = express.Router();
const MDN = require('../models/MDN');
const Abaque = require('../models/abaque');

const exerciceCtrl = require('../controllers/exercice')

router.post('/', exerciceCtrl.postExercice)
router.post('/send_test_exercice', exerciceCtrl.sendExercice)


router.get('/get_exercices', exerciceCtrl.getExos)
router.post('/post_mdn_exercices', exerciceCtrl.registerMDNexercice)
router.get('/get_mdn_exercice', exerciceCtrl.getMDNexercice)
router.get('/get_abaque_exercice', exerciceCtrl.getAbaqueExercice)
router.post('/registerAnswers', exerciceCtrl.registerAnswer)
router.post('/getExosFromUser', exerciceCtrl.getExosFromExercice)
router.post('/registerAbaque', exerciceCtrl.postAbaque)
router.get('/MDN/:id', (req, res) => {
    const exerciceId = req.params.id;
    MDN.findById(exerciceId)
    .then(exercice => {
      if (exercice) {
        console.log(exercice);
        res.status(200).json(exercice); // Envoyer les données trouvées en réponse
      } else {
        console.log('Aucun exercice trouvé avec cet ID');
        res.status(404).send("Aucun exercice trouvé avec cet ID");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Erreur lors de la récupération des données");
    });
});


router.get('/abaque/:id', (req, res) => {
    //const exerciceId = req.params.id;
    const exerciceId = req.params.id;
    Abaque.findById(exerciceId)
    .then(exercice => {
      if (exercice) {
        console.log(exercice);
        res.status(200).json(exercice); // Envoyer les données trouvées en réponse
      } else {
        console.log('Aucun exercice trouvé avec cet ID');
        res.status(404).send("Aucun exercice trouvé avec cet ID");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Erreur lors de la récupération des données");
    });
});

module.exports = router;