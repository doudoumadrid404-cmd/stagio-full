const InternshipAgreement = require('../models/InternshipAgreement');
const Application = require('../models/Application');
const Student = require('../models/Student');
const Company = require('../models/Company');
const Offre = require('../models/Offre');
const { generateConventionPDF } = require('../utils/pdfGenerator');

exports.createAgreement = async (req, res) => {
    try {
        const { applicationId, startDate, endDate } = req.body;

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        if (application.status !== 'accepted') {
            return res.status(400).json({ message: 'Application must be accepted before creating an agreement' });
        }

        const newAgreement = new InternshipAgreement({
            application: applicationId,
            startDate,
            endDate,
            validated: false
        });

        const savedAgreement = await newAgreement.save();
        res.status(201).json(savedAgreement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAgreements = async (req, res) => {
    try {
        let query = {};
        
     
        if (req.user.role === 'student') {
            const studentApplications = await Application.find({ student: req.user._id }).select('_id');
            const applicationIds = studentApplications.map(a => a._id);
            query.application = { $in: applicationIds };
        } else if (req.user.role === 'company') {
            const companyOffers = await Offre.find({ company: req.user._id }).select('_id');
            const companyApplications = await Application.find({ offre: { $in: companyOffers.map(o => o._id) } }).select('_id');
            query.application = { $in: companyApplications.map(a => a._id) };
        }

        const agreements = await InternshipAgreement.find(query)
            .populate({
                path: 'application',
                populate: [
                    { path: 'student', select: 'fullname email' },
                    { path: 'offre', populate: { path: 'company', select: 'fullname' } }
                ]
            });

        res.status(200).json(agreements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.downloadAgreementPDF = async (req, res) => {
    try {
        const agreement = await InternshipAgreement.findById(req.params.id)
            .populate({
                path: 'application',
                populate: [
                    { path: 'student', select: 'fullname email' },
                    { path: 'offre', populate: { path: 'company', select: 'fullname' } }
                ]
            });

        if (!agreement) {
            return res.status(404).json({ message: 'Agreement not found' });
        }

        if (!agreement.validated) {
            return res.status(400).json({ message: 'Agreement must be validated by administration before download' });
        }

   
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=convention_${agreement._id}.pdf`);

        generateConventionPDF(agreement, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.validateAgreement = async (req, res) => {
    try {
        const agreement = await InternshipAgreement.findById(req.params.id);
        if (!agreement) {
            return res.status(404).json({ message: 'Agreement not found' });
        }

        agreement.validated = true;
        const updatedAgreement = await agreement.save();

        res.status(200).json(updatedAgreement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
