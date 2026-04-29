const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Trying to connect to MongoDB Atlas...');
    console.log('MONGO_URI:', process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection failed');
    console.error('Reason:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;