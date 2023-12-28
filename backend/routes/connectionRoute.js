const express = require("express");
const router = express.Router();
const connectionCrtl = require('../controllers/connexionCtrl')

router.post('/', connectionCrtl.connection)
router.post('/checkToken', connectionCrtl.checkToken)
router.post('/infoUser', connectionCrtl.connectionInformations)
router.post('/reset-password', connectionCrtl.resetPassword)
router.post('/newPassword', connectionCrtl.newPassword2);
router.post('/register', connectionCrtl.registerData);
router.get('/existEmail/:id', connectionCrtl.existEmail);

module.exports = router;