const Application = require('../models/Application');
const Offre = require('../models/Offre');

exports.applyToOffre = async (req, res) => {
    try {
        const { offreId } = req.body;

        const offre = await Offre.findById(offreId);
        if (!offre) {
            return res.status(404).json({ message: 'Offer not found' });
        }


        const alreadyApplied = await Application.findOne({
            student: req.user._id,
            offre: offreId
        });

        if (alreadyApplied) {
            return res.status(400).json({ message: 'You have already applied to this offer' });
        }

        const application = new Application({
            student: req.user._id,
            offre: offreId,
            status: 'pending'
        });

        const savedApplication = await application.save();
        res.status(201).json(savedApplication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getApplications = async (req, res) => {
    try {
        let query = {};

        if (req.user.role === 'student') {
            query.student = req.user._id;
        } else if (req.user.role === 'company') {
           
            const companyOffers = await Offre.find({ company: req.user._id }).select('_id');
            const offerIds = companyOffers.map(o => o._id);
            query.offre = { $in: offerIds };
        }


        const applications = await Application.find(query)
            .populate('student', 'fullname email')
            .populate({
                path: 'offre',
                populate: { path: 'company', select: 'companyName' }
            });

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ student: req.user._id })
            .populate({
                path: 'offre',
                populate: { path: 'company', select: 'companyName' }
            });

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate('student', 'fullname email')
            .populate({
                path: 'offre',
                populate: { path: 'company', select: 'companyName' }
            });

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const allowedStatuses = ['pending', 'company_accepted', 'accepted', 'rejected'];
        
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        if (req.user.role === 'company') {
            if (application.status !== 'pending') {
                return res.status(400).json({ message: 'Company can only update pending applications' });
            }
            if (!['company_accepted', 'rejected'].includes(status)) {
                return res.status(400).json({ message: 'Company can only set status to company_accepted or rejected' });
            }
        } 
        else if (req.user.role === 'administration') {
            if (status === 'accepted' && application.status !== 'company_accepted') {
                return res.status(400).json({ message: 'Application must be accepted by the company before final administration approval' });
            }

        } else {
            return res.status(403).json({ message: 'Not authorized to update status' });
        }

        application.status = status;
        const updatedApplication = await application.save();

        res.status(200).json(updatedApplication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
