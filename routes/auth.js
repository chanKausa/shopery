const express = require('express')
const router = express.Router();
const AuthController = require('../controllers/auth');

router.put('/login', AuthController.login);
router.put('/logout', AuthController.logout);
router.post('/create-user', AuthController.createUser);

module.exports = router;