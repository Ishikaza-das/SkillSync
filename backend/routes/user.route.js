const express = require('express');
const router = express.Router();
const {register, login, logout, updateProfile} = require('../controllers/user.controller');
const isAuthenticated = require('../middleware/authenticated');
const { singleUpload } = require('../middleware/multer');

router.post('/register',singleUpload,register);
router.post('/login',login);
router.put('/profile/update',isAuthenticated,singleUpload,updateProfile);
router.get('/logout',logout);

module.exports = router;