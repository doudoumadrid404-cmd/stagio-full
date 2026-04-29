const mongoose = require('mongoose');

const offreSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    wilaya: {
        type: String,
        required: true
    },
    internshipType: {
        type: String,
        required: true,
        enum: ['on-site', 'remote', 'hybrid']
    },
    category: {
        type: String,
        required: true,
        enum: ['classic', 'pfe'],
        default: 'classic'
    },
    slots: {
        type: Number,
        default: 1
    },
    isActive: {
        type: Boolean,
        default: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company',
        required: true
    },
    skills: [{
        type: String
    }]
}, {
    timestamps: true
});

const Offre = mongoose.model('Offre', offreSchema);
module.exports = Offre;
