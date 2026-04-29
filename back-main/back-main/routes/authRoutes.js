const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers } = require('../controllers/authController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

console.log('authRoutes.js file dowwnlod succefull');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', protect, isAdmin, getAllUsers);

module.exports = router;