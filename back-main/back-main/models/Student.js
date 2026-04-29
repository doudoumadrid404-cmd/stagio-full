const User = require('./User');
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    university: {
        type: String,
        required: true
    },
    wilaya: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date
    },
    digital_cv: {
        education: [{
            degree: { type: String },
            institution: { type: String },
            startDate: { type: Date },
            endDate: { type: Date },
            gpa: { type: String },
            description: { type: String }
        }],
        experience: [{
            title: { type: String },
            company: { type: String },
            startDate: { type: Date },
            endDate: { type: Date },
            description: { type: String }
        }],
        projects: [{
            name: { type: String },
            description: { type: String },
            skills: [{ type: String }],
            link: { type: String }
        }]
    },
    skills: [{
        type: String
    }],
    phone: {
        type: String
    },
    location: {
        type: String
    }
});

const Student = User.discriminator('student', studentSchema);
module.exports = Student;
