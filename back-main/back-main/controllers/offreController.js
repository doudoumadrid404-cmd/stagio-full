const Offre = require('../models/Offre');
require('../models/Company'); 


exports.createOffre = async (req, res) => {
    try {
        const newOffre = new Offre(req.body);
        const savedOffre = await newOffre.save();
        res.status(201).json(savedOffre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getAllOffres = async (req, res) => {
    try {
        const { wilaya, internshipType, category } = req.query;
        let query = {};

   
        if (wilaya) {
            query.wilaya = { $regex: new RegExp(wilaya, 'i') };
        }

   
        if (internshipType) {
            query.internshipType = internshipType;
        }
        
        if (category) {
            query.category = category;
        }

        const offres = await Offre.find(query).populate('company');
        res.status(200).json(offres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getOffreById = async (req, res) => {
    try {
        const offre = await Offre.findById(req.params.id).populate('company');
        if (!offre) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.status(200).json(offre);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateOffre = async (req, res) => {
    try {
        const updatedOffre = await Offre.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('company');
        
        if (!updatedOffre) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.status(200).json(updatedOffre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.deleteOffre = async (req, res) => {
    try {
        const deletedOffre = await Offre.findByIdAndDelete(req.params.id);
        if (!deletedOffre) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.status(200).json({ message: 'Offer successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
