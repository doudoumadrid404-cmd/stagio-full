const mongoose = require('mongoose');

const internshipAgreementSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    validated: {
        type: Boolean,
        default: false
    },
    application: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    }
}, {
    timestamps: true
});

const InternshipAgreement = mongoose.model('InternshipAgreement', internshipAgreementSchema);
module.exports = InternshipAgreement;
