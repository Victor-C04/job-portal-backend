// models/Job.js
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  jobType: { 
    type: String, 
    enum: ['Onsite', 'Remote', 'Hybrid', 'Internship'],
    required: true 
  },
  salaryMin: { type: Number },
  salaryMax: { type: Number },
  jobDescription: { type: String },
  requirements: { type: String },
  responsibilities: { type: String },
  applicationDeadline: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);