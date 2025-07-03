const express = require('express');
const router = express.Router();
const { registerCompany, getCompany, getCompanyById, updateCompany } = require('../controllers/company.controller');
const isAuthenticated = require('../middleware/authenticated');
const { singleUpload } = require('../middleware/multer');

router.post('/register',isAuthenticated,registerCompany);
router.get('/get',isAuthenticated, getCompany);
router.get('/get/:id',isAuthenticated, getCompanyById);
router.put('/update/:id',isAuthenticated, singleUpload, updateCompany);

module.exports = router;