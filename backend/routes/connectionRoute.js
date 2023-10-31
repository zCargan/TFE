const express = require("express");
const router = express.Router();
const connectionCrtl = require('../controllers/connexionCtrl')

router.post('/', connectionCrtl.connection)
router.post('/test', connectionCrtl.test)

module.exports = router;