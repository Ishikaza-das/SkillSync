const express = require('express');
const router = express.Router();
const {register, login, logout, updateProfile} = require('../controllers/user.controller');
const isAuthenticated = require('../middleware/authenticated');

router.post('/register',register);
router.post('/login',login);
router.put('/profile/update',isAuthenticated,updateProfile);
router.get('/logout',logout);

module.exports = router;