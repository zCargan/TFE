const express = require("express");
const router = express.Router();
const connectionCrtl = require('../controllers/connexionCtrl')

router.post('/', connectionCrtl.connection)
router.post('/checkToken', connectionCrtl.checkToken)
router.post('/infoUser', connectionCrtl.connectionInformations)

module.exports = router;