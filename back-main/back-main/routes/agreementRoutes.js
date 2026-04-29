const express = require('express');
const router = express.Router();
const agreementController = require('../controllers/internshipAgreementController');
const { protect, isAdmin } = require('../middleware/authMiddleware');


router.post('/', protect, isAdmin, agreementController.createAgreement);

router.get('/', protect, agreementController.getAgreements);


router.get('/:id/download', protect, agreementController.downloadAgreementPDF);



router.put('/:id/validate', protect, isAdmin, agreementController.validateAgreement);

module.exports = router;
