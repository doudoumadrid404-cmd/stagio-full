const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const { protect, isStudent, isAdmin, isCompany } = require('../middleware/authMiddleware');


router.post('/', protect, isStudent, applicationController.applyToOffre);


router.get('/', protect, applicationController.getApplications);


router.get('/my', protect, isStudent, applicationController.getMyApplications);



router.get('/:id', protect, applicationController.getApplicationById);


router.put('/:id/status', protect, applicationController.updateApplicationStatus);

module.exports = router;
