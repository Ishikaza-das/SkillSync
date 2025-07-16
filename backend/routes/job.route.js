const express = require('express');
const router = express.Router();
const {postJob, getAllJobs, getJobById, getAdminJobs, getAllLocations, updateJob} = require('../controllers/job.controller');
const isAuthenticated = require('../middleware/authenticated');

router.post('/post',isAuthenticated,postJob);
router.get('/get',isAuthenticated, getAllJobs);
router.get('/locations',isAuthenticated, getAllLocations);
router.get('/getadminjobs',isAuthenticated, getAdminJobs);
router.get('/get/:id',isAuthenticated, getJobById);
router.put('/update/:id', isAuthenticated, updateJob);

module.exports = router;