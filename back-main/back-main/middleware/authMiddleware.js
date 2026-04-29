const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Optional: specific role check (e.g., only companies can post an offer)
const isCompany = (req, res, next) => {
    if (req.user && req.user.role === 'company') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as a company' });
    }
};

// Only students can access
const isStudent = (req, res, next) => {
    if (req.user && req.user.role === 'student') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as a student' });
    }
};

// Only admins can access
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'administration') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an administrator' });
    }
};

module.exports = { protect, isCompany, isStudent, isAdmin };
