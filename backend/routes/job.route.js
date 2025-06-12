const express = require('express');
const router = express.Router();
const {postJob, getAllJobs, getJobById, getAdminJobs} = require('../controllers/job.controller');
const isAuthenticated = require('../middleware/authenticated');

router.post('/post',isAuthenticated,postJob);
router.get('/get',isAuthenticated, getAllJobs);
router.get('/getadminjobs',isAuthenticated, getAdminJobs);
router.get('/get/:id',isAuthenticated, getJobById);

module.exports = router;