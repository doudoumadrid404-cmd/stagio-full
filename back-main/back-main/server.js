require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./controllers/config/db');
const authRoutes = require('./routes/authRoutes');
const offreRoutes = require('./routes/offreRoutes');
const studentRoutes = require('./routes/studentRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const agreementRoutes = require('./routes/agreementRoutes');

const app = express();


connectDB();

app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});


app.use('/api/auth', authRoutes);
app.use('/api/offres', offreRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/agreements', agreementRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});