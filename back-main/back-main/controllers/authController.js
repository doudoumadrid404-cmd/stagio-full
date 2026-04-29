const Administration = require('../models/Administration');
const User = require('../models/User');
const Student = require('../models/Student');
const Company = require('../models/Company');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};


const registerUser = async (req, res) => {
    try {
        const { email, password, role, fullname, ...rest } = req.body;

        if (!email || !password || !role || !fullname) {
            return res.status(400).json({ message: 'Missing fields' });
        }

       if (role !== 'student' && role !== 'company' && role !== 'administration') {
            return res.status(400).json({ message: 'Only students and companies can register' });
        }

        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Bad email' });
        }

        if (role === 'student') {
            const isUniEmail = email.endsWith('.edu') || email.includes('.ac.') || email.endsWith('.dz');
            if (!isUniEmail) {
                return res.status(400).json({ message: 'Need university email' });
            }
        } else if (role === 'company') {
            const isUniEmail = email.endsWith('.edu') || email.includes('.ac.') || email.endsWith('.dz');
            if (isUniEmail) {
                 return res.status(400).json({ message: 'Company cannot use uni email' });
            }
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let user;
        if (role === 'student') {
            if (!rest.university || !rest.wilaya) {
                 return res.status(400).json({ message: 'Need university and wilaya' });
            }
            user = await Student.create({
                email,
                password: hashedPassword,
                role,
                fullname,
                university: rest.university,
                wilaya: rest.wilaya,
                digital_cv: rest.digital_cv || {}
            });
        } else if (role === 'company') { 
             if (!rest.description || !rest.location) {
                 return res.status(400).json({ message: 'Need description and location' });
            }
            user = await Company.create({
                email,
                password: hashedPassword,
                role,
                fullname,
                description: rest.description,
                location: rest.location,
                logo: rest.logo || ''
            });
        } else if (role === 'administration') {
            const existingAdmin = await Administration.findOne();
            if (existingAdmin) {
                 return res.status(403).json({ message: 'An administration account already exists.' });
            }
            user = await Administration.create({
                email,
                password: hashedPassword,
                role,
                fullname
            });
        }

        if (user) {
            res.status(201).json({
                _id: user.id,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role)
            });
        } else {
            res.status(400).json({ message: 'Bad data' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
             return res.status(400).json({ message: 'Need email and password' });
        }

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
             res.json({
                _id: user.id,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role)
            });
        } else {
            res.status(401).json({ message: 'Wrong email or password' });
        }
    } catch (error) {
         console.log(error);
         res.status(500).json({ message: 'Server error' });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getAllUsers
};