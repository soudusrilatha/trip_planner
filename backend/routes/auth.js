const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.get('/login', auth.getLogin);
router.get('/register', auth.getRegister);
router.post('/login', auth.postLogin);
router.post('/register', auth.postRegister);
router.get('/logout', auth.logout);

module.exports = router;
