const Student = require('../models/Student');

// Get student profile
exports.getStudentProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.user._id).select('-password');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREATE Profile and CV (Initial setup) - POST /api/students/profile
exports.createStudentProfile = async (req, res) => {
    try {
        const data = req.body.student || req.body;
        const student = await Student.findById(req.user._id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Explicitly update all fields
        if (data.fullname !== undefined) student.fullname = data.fullname;
        if (data.fullName !== undefined) student.fullname = data.fullName;
        if (data.university !== undefined) student.university = data.university;
        if (data.wilaya !== undefined) student.wilaya = data.wilaya;
        if (data.skills !== undefined) student.skills = data.skills;
        if (data.phone !== undefined) student.phone = data.phone;
        if (data.location !== undefined) student.location = data.location;
        if (data.birthDate !== undefined) student.birthDate = data.birthDate;
        
        if (data.digital_cv !== undefined) {
            student.digital_cv = data.digital_cv;
            student.markModified('digital_cv');
        }

        const updatedStudent = await student.save();
        const studentResponse = updatedStudent.toObject();
        delete studentResponse.password;

        res.status(201).json({
            message: 'Profile and CV initialized successfully',
            student: studentResponse
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// UPDATE Profile and CV (Combined) - PUT /api/students/profile
exports.updateStudentProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.user._id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const data = req.body.student || req.body;

        // Explicitly update each field to avoid any tracking issues
        if (data.fullname !== undefined) student.fullname = data.fullname;
        if (data.fullName !== undefined) student.fullname = data.fullName;
        if (data.university !== undefined) student.university = data.university;
        if (data.wilaya !== undefined) student.wilaya = data.wilaya;
        if (data.skills !== undefined) student.skills = data.skills;
        if (data.phone !== undefined) student.phone = data.phone;
        if (data.location !== undefined) student.location = data.location;
        if (data.birthDate !== undefined) student.birthDate = data.birthDate;
        
        if (data.digital_cv !== undefined) {
            // Assign the whole object
            student.digital_cv = data.digital_cv;
            // Explicitly mark as modified so Mongoose saves everything inside it
            student.markModified('digital_cv');
        }

        const updatedStudent = await student.save();
        
        const studentResponse = updatedStudent.toObject();
        delete studentResponse.password;

        res.status(200).json({
            message: 'Profile updated successfully',
            student: studentResponse
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a specific student profile by ID (for companies and admins)
exports.getStudentById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'Please provide student ID in body' });
        }
        const student = await Student.findById(id).select('-password');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
