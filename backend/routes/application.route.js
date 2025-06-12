const express = require('express');
const router = express.Router();
const { applyJob, getAppliedJobs, getApplicants, updateStatus } = require('../controllers/application.controller');
const isAuthenticated = require('../middleware/authenticated');

router.get('/apply/:id',isAuthenticated,applyJob);
router.get('/get',isAuthenticated, getAppliedJobs);
router.get('/:id/applicants',isAuthenticated, getApplicants);
router.put('/status/:id',isAuthenticated, updateStatus);

module.exports = router;