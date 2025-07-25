const Job = require("../models/job.model");

const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobtype,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobtype ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Somthing is missing",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: Array.isArray(requirements)
        ? requirements
        : requirements.split(","),
      salary: Number(salary),
      location,
      jobtype,
      experienceLevel: experience,
      position,
      company: companyId,
      createdBy: userId,
    });
    return res.status(201).json({
      message: "New Job created successfully",
      job,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const { keyword = "", location, jobtype, salary } = req.query;

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    if (location) query.location = location;

    if (jobtype) query.jobtype = jobtype;

    if (salary) {
      if (salary === "1-4 LPA") {
        query.salary = { $gte: 1, $lte: 4 };
      } else if (salary === "6-12 LPA") {
        query.salary = { $gte: 6, $lte: 12 };
      } else if (salary === "Above 12 LPA") {
        query.salary = { $gt: 12 };
      }
    }

    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

const getAllLocations = async (req, res) => {
  try {
    const locations = await Job.distinct("location");
    return res.status(200).json({ locations, success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId)
      .populate({
        path: "applications",
      })
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const updateFields = req.body;

    if (updateFields.requirements) {
      updateFields.requirements = Array.isArray(updateFields.requirements)
        ? updateFields.requirements
        : updateFields.requirements.split(',');
    }

    if (updateFields.salary) {
      updateFields.salary = Number(updateFields.salary);
    }

    if (updateFields.experience) {
      updateFields.experienceLevel = updateFields.experience;
      delete updateFields.experience;
    }

    if (updateFields.position) {
      updateFields.position = Number(updateFields.position);
    }

    if (updateFields.companyId) {
      updateFields.company = updateFields.companyId;
      delete updateFields.companyId;
    }

    const updatedJob = await Job.findByIdAndUpdate(jobId, updateFields, {
      new: true,
    });

    if (!updatedJob) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ createdBy: adminId }).populate({
      path: "company",
      createdAt: -1,
    });
    if (!jobs) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

module.exports = {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
  getAllLocations,
  updateJob,
};
