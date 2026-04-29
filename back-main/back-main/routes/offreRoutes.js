const express = require('express');
const router = express.Router();
const offreController = require('../controllers/offreController');
const { protect, isCompany } = require('../middleware/authMiddleware');

// CRUD endpoints for Internship Offers
router.post('/', protect, isCompany, offreController.createOffre);
router.get('/', offreController.getAllOffres);
router.get('/:id', offreController.getOffreById);
router.put('/:id', protect, isCompany, offreController.updateOffre);
router.delete('/:id', protect, isCompany, offreController.deleteOffre);

module.exports = router;
