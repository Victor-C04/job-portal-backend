// routes/jobs.js
const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Get all jobs with filtering
router.get('/', async (req, res) => {
  try {
    const { jobTitle, location, jobType, salaryMin, salaryMax } = req.query;
    let query = {};
    
    if (jobTitle) query.jobTitle = { $regex: jobTitle, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };
    if (jobType) query.jobType = jobType;
    
    if (salaryMin || salaryMax) {
      query.salaryMin = {};
      query.salaryMax = {};
      if (salaryMin) query.salaryMax = { $gte: parseInt(salaryMin) };
      if (salaryMax) query.salaryMin = { $lte: parseInt(salaryMax) };
    }
    
    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a job
router.post('/', async (req, res) => {
    try {
      // Log the received data for debugging
      console.log('Received job data:', req.body);
      
      // Check if required fields are present
      const { jobTitle, companyName, location, jobType } = req.body;
      
      if (!jobTitle || !companyName || !location || !jobType) {
        return res.status(400).json({ 
          message: 'Missing required fields', 
          requiredFields: ['jobTitle', 'companyName', 'location', 'jobType'],
          receivedData: req.body
        });
      }
      
      // Create job object
      const job = new Job(req.body);
      
      // Save to database
      const newJob = await job.save();
      
      // Return the created job
      res.status(201).json(newJob);
    } catch (err) {
      console.error('Error creating job:', err);
      
      // Check for validation errors
      if (err.name === 'ValidationError') {
        const validationErrors = Object.values(err.errors).map(error => error.message);
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: validationErrors 
        });
      }
      
      res.status(500).json({ message: err.message });
    }
  });

// Other CRUD operations as needed...

module.exports = router;