const Job = require('../models/job.model');

const postJob = async (req,res) => {
    try {
        const {title, description, requirements, salary, location, jobtype, experience, position, companyId} = req.body;
        const userId = req.id;

        if(!title || !description || !requirements || !salary || !location || !jobtype || !experience || !position || !companyId){
            return res.status(400).json({
                message:'Somthing is missing',
                success:false
            });
        };
        const job = await Job.create({
            title, 
            description, 
            requirements: requirements.split(','), 
            salary: Number(salary), 
            location, 
            jobtype, 
            experienceLevel: experience, 
            position, 
            company: companyId,
            createdBy: userId
        });
        return res.status(201).json({
            message:'New Job created successfully',
            job,
            success:true
        });
    } catch (error) {
        res.status(400).json({ message: error.message, success: false });
    }
};

const getAllJobs = async (req,res) => {
    try {
        const keyword = req.query.keyword || '';
        const query = {
            $or:[
                {title:{$regex:keyword, $options:'i'}},
                {description:{$regex:keyword, $options:'i'}},
            ]
        };
        const jobs = await Job.find(query).populate({
            path:'company'
        }).sort({createdAt: -1});
        if(!jobs){
            return res.status(404).json({
                message:'Job not found',
                success: false
            });
        };
        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        res.status(400).json({ message: error.message, success: false });
    }
};

const getJobById = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications'
        });
        if(!job){
            return res.status(404).json({
                message:'Job not found',
                success: false
            });
        };
        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        res.status(400).json({ message: error.message, success: false });
    };
;}

const getAdminJobs = async (req,res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({createdBy:adminId});
        if(!jobs){
            return res.status(404).json({
                message:'Job not found',
                success: false
            });
        };
        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        res.status(400).json({ message: error.message, success: false });
    }
}

module.exports = {postJob, getAllJobs, getJobById, getAdminJobs};