const express = require("express");
const router = express.Router();
const MDN = require('../models/MDN');
const Abaque = require('../models/abaque');

const exerciceCtrl = require('../controllers/exercice')

router.post('/', exerciceCtrl.postExercice)
router.post('/send_test_exercice', exerciceCtrl.sendExercice)

router.get('/get_exercices', exerciceCtrl.getExos)

// Route MDN
router.post('/registerMDN', exerciceCtrl.registerMDN)
router.get('/getMDN', exerciceCtrl.getMDNexercice)
router.get('/getMDN/:id', exerciceCtrl.getMDNexerciceId)

// Route Abaque
router.post('/registerAbaque', exerciceCtrl.postAbaque)
router.get('/get_abaque_exercice', exerciceCtrl.getAbaqueExercice)

// Route TTI
router.post('/registerTTI', exerciceCtrl.postTTI)
router.get('/getTTI', exerciceCtrl.getTTI)

// Route LDN
router.post('/registerLDN', exerciceCtrl.postLDN);
router.get('/getLDN', exerciceCtrl.getLDN);

// Route TTA
router.post('/registerTAT', exerciceCtrl.postTAT);
router.get('/getTAT', exerciceCtrl.getTAT);

// Route MB
router.post('/registerMB', exerciceCtrl.postMB);
router.get('/getMB', exerciceCtrl.getMB);

// Route STT
router.post('/registerSTT', exerciceCtrl.postSTT);
router.get('/getSTT', exerciceCtrl.getSTT);
router.get('/getSTT/:id', exerciceCtrl.getSTTById)

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

router.post('/registerAnswers', exerciceCtrl.registerAnswer)
router.post('/getExosFromUser', exerciceCtrl.getExosFromExercice)
router.get('/getExosFromAllTablesId1', exerciceCtrl.getExosFromAllTablesId1);
router.get('/countElement', exerciceCtrl.countElement);

module.exports = router;