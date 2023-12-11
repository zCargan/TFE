const express = require("express");
const router = express.Router();
const MDN = require('../models/MDN');
const Abaque = require('../models/abaque');

const exerciceCtrl = require('../controllers/exerciceCtrl')

router.post('/', exerciceCtrl.postExercice)
router.post('/send_test_exercice', exerciceCtrl.sendExercice)

router.get('/get_exercices', exerciceCtrl.getExos)

// Route MDN
router.post('/registerMDN', exerciceCtrl.registerMDN)
router.get('/getMDN', exerciceCtrl.getMDNexercice)
router.get('/getMDN/:id', exerciceCtrl.getMDNexerciceById)

// Route Abaque
router.post('/registerAbaque', exerciceCtrl.postAbaque)
router.get('/getAbaque', exerciceCtrl.getAbaqueExercice)
router.get('/getAbaque/:id', exerciceCtrl.getAbaqueExerciceById)

// Route TTI
router.post('/registerTTI', exerciceCtrl.postTTI)
router.get('/getTTI', exerciceCtrl.getTTI)
router.get('/getTTI/:id', exerciceCtrl.getTTIById)

// Route LDN
router.post('/registerLDN', exerciceCtrl.postLDN);
router.get('/getLDN', exerciceCtrl.getLDN);
router.get('/getLDN/:id', exerciceCtrl.getLDNById);

// Route TTA
router.post('/registerTAT', exerciceCtrl.postTAT);
router.get('/getTAT', exerciceCtrl.getTAT);
router.get('/getTAT/:id', exerciceCtrl.getTATById);

// Route MB
router.post('/registerMB', exerciceCtrl.postMB);
router.get('/getMB', exerciceCtrl.getMB);
router.get('/getMB/:id', exerciceCtrl.getMBById);

// Route STT
router.post('/registerSTT', exerciceCtrl.postSTT);
router.get('/getSTT', exerciceCtrl.getSTT);
router.get('/getSTTexo/:id', exerciceCtrl.getSTTexo);
router.get('/getSTT/:id', exerciceCtrl.getSTTById);

// Route worksheet
router.post('/saveWorksheet', exerciceCtrl.saveWorksheet);
router.get('/getWorksheet', exerciceCtrl.getWorksheet);



// DIVERS
router.post('/registerAnswers', exerciceCtrl.registerAnswer)
router.post('/getExosFromUser', exerciceCtrl.getExosFromExercice)
router.get('/getExosFromAllTablesId1', exerciceCtrl.getExosFromAllTablesId1);
router.get('/countElementByCollection', exerciceCtrl.countElementByCollection);
router.get('/getNameCollection', exerciceCtrl.getNameCollection);
router.get('/getTotalCounts', exerciceCtrl.getTotalCounts);
router.get('/getTotalCountsWS', exerciceCtrl.getTotalCountsWS);
router.get('/getARandomWorksheets', exerciceCtrl.getARandomWorksheets);
router.get('/getDetailsExos', exerciceCtrl.getDetailsExos);
router.get('/getARandomExo', exerciceCtrl.getARandomExo)
router.get('/getAPreciseExo', exerciceCtrl.getAPreciseExo);
router.post('/getExosFromRequest', exerciceCtrl.getExosFromRequest);
router.delete('/deleteExoById', exerciceCtrl.deleteExoById);
router.post('/saveWorksheet', exerciceCtrl.saveWorksheet);
router.get('/getWS/:id', exerciceCtrl.getWS);

module.exports = router;