const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { protect, isStudent } = require('../middleware/authMiddleware')

router.get('/profile', protect, isStudent, studentController.getStudentProfile);


router.post('/profile', protect, isStudent, studentController.createStudentProfile);


router.put('/profile', protect, isStudent, studentController.updateStudentProfile);


router.post('/view', protect, studentController.getStudentById);

module.exports = router;
