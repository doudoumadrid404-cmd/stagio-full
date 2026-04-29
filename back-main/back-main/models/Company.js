const User = require('./User');
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    logo: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

const Company = User.discriminator('company', companySchema);
module.exports = Company;
