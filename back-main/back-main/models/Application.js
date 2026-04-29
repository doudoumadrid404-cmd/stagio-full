const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    applicationDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'company_accepted', 'accepted', 'rejected'],
        default: 'pending'
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required: true
    },
    offre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offre',
        required: true
    }
}, {
    timestamps: true
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
